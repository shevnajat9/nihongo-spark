// JLPT Official Scaled Scoring & Sectional Pass Thresholds
// Mengikuti standar baku Japan Foundation & JEES (0–180 skala)

export const JLPT_CRITERIA = {
  N5: {
    totalMax: 180,
    totalPass: 80,
    sections: [
      { key: 'knowledge_reading', label: 'Kosakata, Tata Bahasa & Membaca (言語知識・読解)', max: 120, minPass: 38, mappedKeys: ['mojigoi', 'bunpo', 'dokkai'] },
      { key: 'chokai', label: 'Mendengarkan (聴解)', max: 60, minPass: 19, mappedKeys: ['chokai'] }
    ]
  },
  N4: {
    totalMax: 180,
    totalPass: 90,
    sections: [
      { key: 'knowledge_reading', label: 'Kosakata, Tata Bahasa & Membaca (言語知識・読解)', max: 120, minPass: 38, mappedKeys: ['mojigoi', 'bunpo', 'dokkai'] },
      { key: 'chokai', label: 'Mendengarkan (聴解)', max: 60, minPass: 19, mappedKeys: ['chokai'] }
    ]
  },
  N3: {
    totalMax: 180,
    totalPass: 95,
    sections: [
      { key: 'mojigoi_bunpo', label: 'Kosakata & Tata Bahasa (言語知識)', max: 60, minPass: 19, mappedKeys: ['mojigoi', 'bunpo'] },
      { key: 'dokkai', label: 'Membaca (読解)', max: 60, minPass: 19, mappedKeys: ['dokkai'] },
      { key: 'chokai', label: 'Mendengarkan (聴解)', max: 60, minPass: 19, mappedKeys: ['chokai'] }
    ]
  },
  N2: {
    totalMax: 180,
    totalPass: 90,
    sections: [
      { key: 'mojigoi_bunpo', label: 'Kosakata & Tata Bahasa (言語知識)', max: 60, minPass: 19, mappedKeys: ['mojigoi', 'bunpo'] },
      { key: 'dokkai', label: 'Membaca (読解)', max: 60, minPass: 19, mappedKeys: ['dokkai'] },
      { key: 'chokai', label: 'Mendengarkan (聴解)', max: 60, minPass: 19, mappedKeys: ['chokai'] }
    ]
  },
  N1: {
    totalMax: 180,
    totalPass: 100,
    sections: [
      { key: 'mojigoi_bunpo', label: 'Kosakata & Tata Bahasa (言語知識)', max: 60, minPass: 19, mappedKeys: ['mojigoi', 'bunpo'] },
      { key: 'dokkai', label: 'Membaca (読解)', max: 60, minPass: 19, mappedKeys: ['dokkai'] },
      { key: 'chokai', label: 'Mendengarkan (聴解)', max: 60, minPass: 19, mappedKeys: ['chokai'] }
    ]
  }
};

/**
 * Calculate scaled scores and determine Pass/Fail status
 * @param {string} level - N5 | N4 | N3 | N2 | N1
 * @param {Array} rawSectionResults - array of { key, correct, total }
 */
export function calculateJLPTScore(level, rawSectionResults) {
  const criteria = JLPT_CRITERIA[level] || JLPT_CRITERIA.N5;

  const evaluatedSections = criteria.sections.map((secDef) => {
    // Find matching sections
    const matched = rawSectionResults.filter(r => secDef.mappedKeys.includes(r.key));
    const totalCorrect = matched.reduce((sum, m) => sum + m.correct, 0);
    const totalQuestions = matched.reduce((sum, m) => sum + m.total, 0);

    const accuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) : 0;
    const scaledScore = Math.round(accuracy * secDef.max);
    const passedSection = scaledScore >= secDef.minPass;

    return {
      key: secDef.key,
      label: secDef.label,
      scaledScore,
      maxScore: secDef.max,
      minPass: secDef.minPass,
      passed: passedSection,
      totalCorrect,
      totalQuestions,
      accuracyPct: Math.round(accuracy * 100)
    };
  });

  const totalScaledScore = evaluatedSections.reduce((sum, s) => sum + s.scaledScore, 0);
  const totalPassed = totalScaledScore >= criteria.totalPass;
  const allSectionsPassed = evaluatedSections.every(s => s.passed);

  const finalVerdict = totalPassed && allSectionsPassed;

  let reason = '';
  if (finalVerdict) {
    reason = 'Selamat! Anda memenuhi ambang batas nilai total dan seluruh batas minimal per seksi.';
  } else if (!totalPassed && !allSectionsPassed) {
    reason = `Nilai total (${totalScaledScore}/${criteria.totalMax}) belum mencapai ${criteria.totalPass}, dan terdapat seksi yang di bawah nilai ambang batas minimal.`;
  } else if (!totalPassed) {
    reason = `Nilai total (${totalScaledScore}/${criteria.totalMax}) belum mencapai ambang batas kelulusan ${criteria.totalPass}.`;
  } else if (!allSectionsPassed) {
    const failedSecs = evaluatedSections.filter(s => !s.passed).map(s => s.label.split(' ')[0]).join(', ');
    reason = `Skor total Anda (${totalScaledScore}/${criteria.totalMax}) mencukupi batas ${criteria.totalPass}, namun tidak lulus karena nilai seksi ${failedSecs} berada di bawah batas minimal (${evaluatedSections.find(s => !s.passed)?.minPass}/${evaluatedSections.find(s => !s.passed)?.maxScore}).`;
  }

  return {
    level,
    totalScaledScore,
    totalMax: criteria.totalMax,
    totalPass: criteria.totalPass,
    passed: finalVerdict,
    reason,
    sections: evaluatedSections
  };
}
