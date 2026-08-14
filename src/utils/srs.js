// Sistem repetisi berjeda ringan bergaya Leitner box.
// Box 0 = baru dipelajari / masih sulit, box terakhir = paling dikuasai.
// Setiap kali item "diingat" (benar), box naik dan interval review makin panjang.
// Setiap kali "belum hafal", box turun ke 0 lagi.

const BOX_INTERVAL_DAYS = [1, 2, 4, 7, 14, 30];
export const MAX_BOX = BOX_INTERVAL_DAYS.length - 1;

export function loadProgress(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(storageKey, progress) {
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

export function getItemProgress(progress, id) {
  return progress[id] || { box: 0, lastReviewed: null, nextReview: null, reviews: 0, correct: 0 };
}

// Tandai sebuah item sebagai "sudah hafal" (remembered = true) atau "belum hafal" (false).
// Mengembalikan objek progress baru (tidak memodifikasi input).
export function reviewItem(progress, id, remembered) {
  const current = getItemProgress(progress, id);
  const now = new Date();

  const box = remembered ? Math.min(current.box + 1, MAX_BOX) : 0;
  const intervalDays = BOX_INTERVAL_DAYS[box];
  const nextReview = new Date(now);
  nextReview.setDate(now.getDate() + intervalDays);

  const updated = {
    box,
    lastReviewed: now.toISOString(),
    nextReview: nextReview.toISOString(),
    reviews: (current.reviews || 0) + 1,
    correct: (current.correct || 0) + (remembered ? 1 : 0)
  };

  return { ...progress, [id]: updated };
}

// Item dianggap "perlu diulang" hanya jika sudah pernah direview sebelumnya
// dan tanggal review berikutnya sudah lewat. Item yang belum pernah dipelajari
// bukan termasuk "due" (itu masih "baru").
export function isDue(progress, id) {
  const item = progress[id];
  if (!item || !item.nextReview) return false;
  return new Date(item.nextReview) <= new Date();
}

export function getMasteryStatus(progress, id) {
  const item = progress[id];
  if (!item) return 'new';
  if (item.box >= MAX_BOX) return 'mastered';
  if (isDue(progress, id)) return 'due';
  return 'learning';
}

export const MASTERY_LABELS = {
  new: 'Baru',
  learning: 'Belajar',
  due: 'Perlu Diulang',
  mastered: 'Hafal'
};

export function countDue(progress, ids) {
  return ids.reduce((count, id) => count + (isDue(progress, id) ? 1 : 0), 0);
}
