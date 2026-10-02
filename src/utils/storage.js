/**
 * Nihongo Spark - Resilient Storage Engine (IndexedDB + JSON Backup & Restore)
 * Menjaga progres belajar dari pembersihan cache browser dan memungkinkan
 * transfer data antar perangkat lewat file cadangan (.json).
 */

const DB_NAME = 'NihongoSparkDB';
const DB_VERSION = 1;
const STORE_NAME = 'nihongo_state';

const APP_KEYS = [
  'nihongo_spark_stats',
  'nihongo_spark_level',
  'nihongo_spark_vocab_progress',
  'nihongo_spark_grammar_progress',
  'nihongo_spark_kanji_progress',
  'nihongo_spark_vocab_bookmarks',
  'nihongo_spark_kanji_bookmarks',
  'nihongo_spark_grammar_bookmarks',
  'nihongo_spark_auto_speak',
  'nihongo_spark_furigana_mode'
];

/**
 * Open or upgrade native IndexedDB
 */
function openDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      return reject(new Error('Browser ini tidak mendukung IndexedDB.'));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };

    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Save single key to IndexedDB
 */
export async function saveToIndexedDB(key, value) {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ key, value, updatedAt: Date.now() });
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('[Storage] Gagal menyimpan ke IndexedDB:', err);
    return false;
  }
}

/**
 * Retrieve key from IndexedDB
 */
export async function getFromIndexedDB(key) {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    return new Promise((resolve) => {
      req.onsuccess = () => resolve(req.result ? req.result.value : null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

/**
 * Auto-sync all current localStorage to IndexedDB
 */
export async function syncLocalStorageToIndexedDB() {
  for (const key of APP_KEYS) {
    const val = localStorage.getItem(key);
    if (val !== null) {
      await saveToIndexedDB(key, val);
    }
  }
}

/**
 * Restore data from IndexedDB to localStorage if localStorage is cleared/empty
 */
export async function autoRestoreIfEmpty() {
  try {
    const hasLocal = localStorage.getItem('nihongo_spark_stats');
    if (!hasLocal) {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const records = req.result;
        if (records && records.length > 0) {
          records.forEach(rec => {
            if (APP_KEYS.includes(rec.key) && rec.value) {
              localStorage.setItem(rec.key, rec.value);
            }
          });
          console.info('[Storage] Progres berhasil dipulihkan secara otomatis dari IndexedDB!');
          window.dispatchEvent(new Event('nihongo-spark-data-restored'));
        }
      };
    } else {
      // Sync current to IndexedDB for backup
      syncLocalStorageToIndexedDB();
    }
  } catch (err) {
    console.warn('[Storage] Error during auto-restore check:', err);
  }
}

/**
 * Export all data to downloadable JSON file
 */
export function exportBackupJson() {
  const backupData = {
    app: 'Nihongo Spark (日本語スパーク)',
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    payload: {}
  };

  APP_KEYS.forEach(key => {
    const val = localStorage.getItem(key);
    if (val !== null) {
      try {
        backupData.payload[key] = JSON.parse(val);
      } catch {
        backupData.payload[key] = val;
      }
    }
  });

  const jsonStr = JSON.stringify(backupData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `nihongo-spark-cadangan-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Import backup JSON string / file content
 */
export async function importBackupJson(fileContent) {
  try {
    const data = typeof fileContent === 'string' ? JSON.parse(fileContent) : fileContent;
    if (!data || !data.payload) {
      throw new Error('Format file cadangan tidak valid.');
    }

    let restoredCount = 0;
    for (const key of Object.keys(data.payload)) {
      if (APP_KEYS.includes(key)) {
        const val = typeof data.payload[key] === 'object'
          ? JSON.stringify(data.payload[key])
          : String(data.payload[key]);
        localStorage.setItem(key, val);
        await saveToIndexedDB(key, val);
        restoredCount++;
      }
    }

    window.dispatchEvent(new Event('nihongo-spark-data-restored'));
    return {
      success: true,
      restoredCount,
      exportedAt: data.exportedAt
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Gagal memproses file cadangan.'
    };
  }
}
