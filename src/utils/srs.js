/**
 * Nihongo Spark - Modern Spaced Repetition Engine (SM-2 & FSRS v4)
 * Mendukung algoritma SM-2 klasik dan FSRS (Free Spaced Repetition Scheduler) modern
 * dengan pelacak aktivitas tahunan (GitHub-style Activity Heatmap).
 */

const DEFAULT_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;
export const MAX_BOX = 5;

const REVIEW_ACTIVITY_KEY = 'nihongo_spark_review_activity';

export function loadProgress(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(storageKey, progress) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
    // Trigger storage sync event if available
    window.dispatchEvent(new CustomEvent('nihongo-spark-progress-saved', { detail: { storageKey } }));
  } catch (e) {
    console.error('[SRS] Gagal menyimpan progres:', e);
  }
}

export function getItemProgress(progress, id) {
  const item = progress[id];
  if (!item) {
    return {
      box: 0,
      easeFactor: DEFAULT_EASE_FACTOR,
      stability: 1.0,
      difficulty: 5.0,
      repetitions: 0,
      interval: 0,
      lastReviewed: null,
      nextReview: null,
      reviews: 0,
      correct: 0,
      lapses: 0
    };
  }

  return {
    box: typeof item.box === 'number' ? item.box : 0,
    easeFactor: item.easeFactor || DEFAULT_EASE_FACTOR,
    stability: item.stability || 1.0,
    difficulty: item.difficulty || 5.0,
    repetitions: item.repetitions || (item.box || 0),
    interval: item.interval || 1,
    lastReviewed: item.lastReviewed || null,
    nextReview: item.nextReview || null,
    reviews: item.reviews || 0,
    correct: item.correct || 0,
    lapses: item.lapses || 0
  };
}

/**
 * SM-2 Calculation
 * @param {Object} current - item progress object
 * @param {number} rating - Quality grade (1 = Again, 2 = Hard, 3 = Good, 4 = Easy)
 */
export function calculateSM2(current, rating) {
  const ef = current.easeFactor || DEFAULT_EASE_FACTOR;
  const reps = current.repetitions || 0;
  const prevInterval = current.interval || 1;

  let nextInterval;
  let nextReps;
  let nextEf;
  let nextLapses = current.lapses || 0;

  if (rating < 3) {
    // Failed recall: Again (1) or Hard (2)
    nextReps = 0;
    nextInterval = 1; // Repeat tomorrow
    nextLapses += 1;
    // Lower ease factor
    nextEf = Math.max(MIN_EASE_FACTOR, ef - (rating === 1 ? 0.2 : 0.15));
  } else {
    // Successful recall: Good (3) or Easy (4)
    if (reps === 0) {
      nextInterval = 1;
    } else if (reps === 1) {
      nextInterval = rating === 4 ? 6 : 4;
    } else {
      const bonus = rating === 4 ? 1.35 : 1.0;
      nextInterval = Math.max(1, Math.round(prevInterval * ef * bonus));
    }
    nextReps = reps + 1;

    // SM-2 formula: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    const q = rating === 4 ? 5 : rating === 3 ? 4 : rating === 2 ? 3 : 2;
    const efDelta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
    nextEf = Math.max(MIN_EASE_FACTOR, ef + efDelta);
  }

  // Calculate backward-compatible box (0..5)
  let box = 0;
  if (nextInterval >= 30) box = 5;
  else if (nextInterval >= 14) box = 4;
  else if (nextInterval >= 7) box = 3;
  else if (nextInterval >= 4) box = 2;
  else if (nextInterval >= 2) box = 1;

  return {
    interval: nextInterval,
    repetitions: nextReps,
    easeFactor: Number(nextEf.toFixed(2)),
    box,
    lapses: nextLapses
  };
}

/**
 * FSRS (Free Spaced Repetition Scheduler) v4
 * Menggunakan model DSR (Difficulty, Stability, Retrievability)
 */
export function calculateFSRS(current, rating, targetRetrievability = 0.9) {
  let s = current.stability || 1.0;
  let d = current.difficulty || 5.0;
  const reps = current.repetitions || 0;
  let lapses = current.lapses || 0;

  // Rating: 1: Again, 2: Hard, 3: Good, 4: Easy
  // Initial parameters for first repetition
  if (reps === 0) {
    const initialS = [0.4, 1.2, 3.2, 8.5]; // S0 based on rating
    s = initialS[rating - 1] || 3.0;
    d = Math.max(1, Math.min(10, 5 - (rating - 3) * 1.5));
  } else {
    // Difficulty update: D' = D - w6 * (rating - 3)
    d = Math.max(1, Math.min(10, d - 0.7 * (rating - 3)));

    if (rating === 1) {
      // Lapse
      lapses += 1;
      s = Math.max(0.3, s * 0.25);
    } else {
      // Recall success: S' = S * (1 + C * (11 - D) * S^-0.5)
      const multiplier = rating === 4 ? 2.8 : rating === 3 ? 2.1 : 1.4;
      s = s * (1 + 0.19 * (11 - d) * Math.pow(s, -0.2) * multiplier);
    }
  }

  // Next interval derived from target retrievability: I = S * ln(R) / ln(0.9)
  const factor = Math.log(targetRetrievability) / Math.log(0.9);
  const nextInterval = Math.max(1, Math.round(s * factor));
  const nextReps = rating >= 3 ? reps + 1 : 0;

  let box = 0;
  if (nextInterval >= 30) box = 5;
  else if (nextInterval >= 14) box = 4;
  else if (nextInterval >= 7) box = 3;
  else if (nextInterval >= 4) box = 2;
  else if (nextInterval >= 2) box = 1;

  return {
    interval: nextInterval,
    repetitions: nextReps,
    stability: Number(s.toFixed(2)),
    difficulty: Number(d.toFixed(2)),
    easeFactor: Number((5 - d * 0.3).toFixed(2)), // For backward compatibility
    box,
    lapses
  };
}

/**
 * Log review activity to generate GitHub-style Activity Heatmap
 */
export function logReviewActivity() {
  try {
    const todayStr = new Date().toISOString().slice(0, 10);
    const raw = localStorage.getItem(REVIEW_ACTIVITY_KEY);
    const activity = raw ? JSON.parse(raw) : {};
    activity[todayStr] = (activity[todayStr] || 0) + 1;
    localStorage.setItem(REVIEW_ACTIVITY_KEY, JSON.stringify(activity));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Get review activity heatmap map for the past N days
 */
export function getActivityHeatmapData(days = 365) {
  try {
    const raw = localStorage.getItem(REVIEW_ACTIVITY_KEY);
    const activity = raw ? JSON.parse(raw) : {};
    const result = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      result.push({
        date: dateStr,
        count: activity[dateStr] || 0
      });
    }

    return result;
  } catch {
    return [];
  }
}

/**
 * Review item with quality rating (1: Again, 2: Hard, 3: Good, 4: Easy)
 * or backward-compatible boolean remembered (true: 3, false: 1).
 */
export function reviewItem(progress, id, ratingOrRemembered) {
  const current = getItemProgress(progress, id);
  const now = new Date();

  // Normalize rating
  let rating = 3;
  if (typeof ratingOrRemembered === 'boolean') {
    rating = ratingOrRemembered ? 3 : 1;
  } else if (typeof ratingOrRemembered === 'number') {
    rating = Math.min(4, Math.max(1, ratingOrRemembered));
  }

  // Check if FSRS engine selected
  const engine = localStorage.getItem('nihongo_spark_srs_engine') || 'sm2';
  const calc = engine === 'fsrs' ? calculateFSRS(current, rating) : calculateSM2(current, rating);

  const nextReviewDate = new Date(now);
  nextReviewDate.setDate(now.getDate() + calc.interval);

  const updated = {
    ...current,
    box: calc.box,
    easeFactor: calc.easeFactor,
    stability: calc.stability || current.stability,
    difficulty: calc.difficulty || current.difficulty,
    repetitions: calc.repetitions,
    interval: calc.interval,
    lapses: calc.lapses,
    lastReviewed: now.toISOString(),
    nextReview: nextReviewDate.toISOString(),
    reviews: (current.reviews || 0) + 1,
    correct: (current.correct || 0) + (rating >= 3 ? 1 : 0)
  };

  // Record for activity heatmap
  logReviewActivity();

  return { ...progress, [id]: updated };
}

export function isDue(progress, id) {
  const item = progress[id];
  if (!item || !item.nextReview) return false;
  return new Date(item.nextReview) <= new Date();
}

export function getMasteryStatus(progress, id) {
  const item = progress[id];
  if (!item) return 'new';
  if (item.box >= MAX_BOX || (item.repetitions >= 4 && item.interval >= 21)) return 'mastered';
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
