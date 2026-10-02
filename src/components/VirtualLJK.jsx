import React from 'react';

export default function VirtualLJK({
  questions = [],
  answers = [],
  currentQIndex = 0,
  onSelectQuestion,
  onSelectOption,
  isOpen,
  onClose
}) {
  if (!isOpen) return null;

  const totalAnswered = answers.filter(a => a !== null && a !== undefined && (Array.isArray(a) ? a.length > 0 : true)).length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={{
        background: '#0f172a',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '540px',
        maxHeight: '85vh',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* LJK Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.2)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.3rem' }}>📝</span>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#f8fafc', fontWeight: 700 }}>
                Lembar Jawaban Komputer (LJK)
              </h3>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              Progres Terisi: <strong style={{ color: '#10b981' }}>{totalAnswered}</strong> dari {questions.length} soal
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              fontSize: '1.5rem',
              cursor: 'pointer',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>

        {/* LJK Grid of Bubbles */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {questions.map((q, idx) => {
            const isCurrent = idx === currentQIndex;
            const chosenAnswer = answers[idx];

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: isCurrent ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${isCurrent ? '#6366f1' : 'rgba(255, 255, 255, 0.06)'}`,
                  borderRadius: '10px',
                  padding: '0.6rem 1rem',
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Question Number Button */}
                <button
                  onClick={() => { onSelectQuestion(idx); onClose(); }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: isCurrent ? '#818cf8' : '#f8fafc',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    textAlign: 'left'
                  }}
                >
                  <span>No. {idx + 1}</span>
                  {isCurrent && <span style={{ fontSize: '0.7rem', color: '#818cf8' }}>● Aktif</span>}
                </button>

                {/* Bubbles for standard 4-option questions */}
                {q.type !== 'REORDER' && q.options && (
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = chosenAnswer === opt;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => onSelectOption(idx, opt)}
                          title={`Pilih Opsi ${optIdx + 1}`}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: `2px solid ${isSelected ? '#10b981' : 'rgba(255, 255, 255, 0.2)'}`,
                            background: isSelected ? '#10b981' : 'rgba(0, 0, 0, 0.3)',
                            color: isSelected ? '#000' : '#cbd5e1',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {optIdx + 1}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* For Reorder / Sentence arrangement questions */}
                {q.type === 'REORDER' && (
                  <div style={{ fontSize: '0.78rem', color: chosenAnswer && chosenAnswer.length === q.options?.length ? '#10b981' : '#f59e0b' }}>
                    {chosenAnswer && chosenAnswer.length === q.options?.length ? '✓ Tersusun' : '○ Belum lengkap'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.2)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'var(--primary, #6366f1)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1.25rem',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Tutup Lembar LJK
          </button>
        </div>
      </div>
    </div>
  );
}
