/**
 * Habit Alarm & Web Push Notification Manager
 * Manages daily streak protection reminders and notification permission.
 */

const STORAGE_KEY = 'nihongo_spark_habit_alarm';

export const DEFAULT_ALARM_CONFIG = {
  enabled: false,
  targetTime: '20:00', // 8 PM default
  lastNotifiedDate: null,
};

export function getHabitAlarmConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_ALARM_CONFIG, ...JSON.parse(raw) } : DEFAULT_ALARM_CONFIG;
  } catch {
    return DEFAULT_ALARM_CONFIG;
  }
}

export function saveHabitAlarmConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save habit alarm config:', e);
  }
}

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return 'unsupported';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  const result = await Notification.requestPermission();
  return result;
}

export function triggerImmediateTestNotification() {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return false;
  }

  try {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SCHEDULE_HABIT_ALARM',
        title: '🔥 Alarm Streak Nihongo Spark (Uji Coba)',
        body: 'Hebat! Notifikasi berhasil terpasang. Kamu akan diingatkan sebelum streak belajarmu putus.',
        delayMs: 500,
      });
      return true;
    } else {
      new Notification('🔥 Alarm Streak Nihongo Spark (Uji Coba)', {
        body: 'Hebat! Notifikasi berhasil terpasang. Kamu akan diingatkan sebelum streak belajarmu putus.',
        icon: '/favicon.svg',
      });
      return true;
    }
  } catch {
    return false;
  }
}

export function checkAndNotifyStreakRisk(streakCount) {
  const config = getHabitAlarmConfig();
  if (!config.enabled || !('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  // If already notified today, skip
  if (config.lastNotifiedDate === todayStr) {
    return;
  }

  const [targetHour, targetMinute] = config.targetTime.split(':').map((n) => parseInt(n, 10));
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (currentHour > targetHour || (currentHour === targetHour && currentMinute >= targetMinute)) {
    // Trigger notification
    const title = streakCount > 0
      ? `🔥 Jangan biarkan ${streakCount} Hari Streak-mu Terputus!`
      : '🌸 Waktunya Belajar Bahasa Jepang!';
    const body = 'Hari sudah malam! Buka Nihongo Spark sekarang dan selesaikan 5 ulasan kartu untuk mengamankan streak-mu.';

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SCHEDULE_HABIT_ALARM',
        title,
        body,
        delayMs: 100,
      });
    } else {
      new Notification(title, { body, icon: '/favicon.svg' });
    }

    // Mark as notified today
    saveHabitAlarmConfig({
      ...config,
      lastNotifiedDate: todayStr,
    });
  }
}
