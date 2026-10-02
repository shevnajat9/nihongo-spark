// Helper terpusat untuk menandai item checklist harian selesai, dipakai oleh
// VocabStudy (5 kosakata), GrammarStudy (1 pola tata bahasa), dan Quiz (1 kuis).
// Terpusat di sini supaya logika streak/riwayat konsisten dan tidak duplikat
// di setiap komponen (sebelumnya Dashboard & Quiz masing-masing punya copy sendiri).

const EMPTY_CHECKLIST = { vocab: false, grammar: false, quiz: false };

// Checklist "hari ini" yang valid — kalau lastStudyDate bukan hari ini,
// checklist yang tersimpan sudah basi (milik hari sebelumnya) dan harus dianggap kosong.
export function getTodayChecklist(studyStats) {
  const today = new Date().toDateString();
  if (studyStats.lastStudyDate === today && studyStats.todayChecklist) {
    return studyStats.todayChecklist;
  }
  return { ...EMPTY_CHECKLIST };
}

// Menandai satu item checklist ('vocab' | 'grammar' | 'quiz') sebagai selesai,
// sekaligus memperbarui streak & riwayat kalender jika ini aktivitas pertama hari ini.
// Mengembalikan objek studyStats baru (tidak memodifikasi input).
export function markChecklistDone(studyStats, key) {
  const today = new Date().toDateString();
  const currentChecklist = getTodayChecklist(studyStats);

  if (currentChecklist[key]) {
    // Sudah ditandai selesai hari ini, cukup pastikan tanggal & checklist konsisten.
    return { ...studyStats, todayChecklist: currentChecklist, lastStudyDate: today };
  }

  const updatedChecklist = { ...currentChecklist, [key]: true };
  const updatedStats = { ...studyStats, todayChecklist: updatedChecklist };

  if (studyStats.lastStudyDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isStreakContinued = studyStats.lastStudyDate === yesterday.toDateString();
    updatedStats.streak = isStreakContinued ? (studyStats.streak || 0) + 1 : 1;

    const history = [...(studyStats.history || [])];
    if (!history.includes(today)) history.push(today);
    updatedStats.history = history;
  }

  updatedStats.lastStudyDate = today;
  return updatedStats;
}
