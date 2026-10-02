import React, { useState } from 'react';
import { emailTemplates, keigoEmailGlossary } from '../data/businessEmail';
import { playJapaneseSpeech } from '../utils/audioPlayer';

export default function BusinessEmailBuilder() {
  const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'etiquette'
  const [selectedTemplateId, setSelectedTemplateId] = useState(emailTemplates[0].id);

  // Form field state for the current active template
  const [fieldValues, setFieldValues] = useState(() => {
    const initial = {};
    emailTemplates.forEach(tpl => {
      initial[tpl.id] = {};
      tpl.fields.forEach(f => {
        initial[tpl.id][f.key] = f.defaultVal;
      });
    });
    return initial;
  });

  const [copied, setCopied] = useState(false);

  const activeTemplate = emailTemplates.find(t => t.id === selectedTemplateId) || emailTemplates[0];
  const currentValues = fieldValues[activeTemplate.id] || {};

  const handleFieldChange = (key, val) => {
    setFieldValues(prev => ({
      ...prev,
      [activeTemplate.id]: {
        ...prev[activeTemplate.id],
        [key]: val
      }
    }));
  };

  // Generated email subject and body
  const generatedBody = activeTemplate.generateBody(currentValues);

  // Copy to clipboard
  const handleCopy = () => {
    const fullText = `件名：${activeTemplate.defaultSubject}\n\n${generatedBody}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      alert('Gagal menyalin teks. Silakan salin secara manual.');
    });
  };

  // Play Native Audio
  const playNativeAudio = (text, rate = 1.0) => {
    playJapaneseSpeech(text, { rate });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* HEADER SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(59, 130, 246, 0.15))',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '16px',
        padding: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '1.8rem' }}>✉️</span>
            <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc', fontWeight: 800 }}>
              Generator & Praktik Email Bisnis Jepang (ビジネスメール)
            </h1>
            <span style={{
              background: 'rgba(99, 102, 241, 0.25)',
              color: '#818cf8',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              border: '1px solid rgba(99, 102, 241, 0.4)'
            }}>
              Etiket Keigo Profesional
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '650px' }}>
            Kuasai etiket korespondensi formal dunia kerja Jepang. Pilih template izin sakit, jadwal rapat, pengiriman dokumen lampiran, sesuaikan variabel, dan salin langsung ke klien email Anda!
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', padding: '0.25rem', gap: '0.25rem' }}>
          {[
            { id: 'generator', label: '✉️ Generator Email' },
            { id: 'etiquette', label: '👔 5 Aturan Baku Etiket' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'var(--primary, #6366f1)' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: GENERATOR EMAIL */}
      {activeTab === 'generator' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Template Selector Grid */}
          <div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem' }}>
              Pilih Skenario Korespondensi:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem' }}>
              {emailTemplates.map((tpl) => {
                const isSelected = tpl.id === selectedTemplateId;
                return (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplateId(tpl.id)}
                    style={{
                      background: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'var(--card-bg, #1e293b)',
                      border: `1.5px solid ${isSelected ? '#6366f1' : 'rgba(255, 255, 255, 0.08)'}`,
                      borderRadius: '10px',
                      padding: '0.75rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', color: '#818cf8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      {tpl.category === 'internal' ? '🏢 Internal Tim' : '🌐 Klien Luar'}
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: isSelected ? '#a5b4fc' : '#f8fafc' }}>
                      {tpl.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Builder Layout: Input Variables + Live Email Preview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
            {/* Input Variables Form */}
            <div style={{
              background: 'var(--card-bg, #1e293b)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.9rem'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 700, background: 'rgba(99, 102, 241, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  Konteks Situasi:
                </span>
                <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                  {activeTemplate.situation}
                </p>
              </div>

              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.4rem' }}>
                ✏️ Sesuaikan Variabel Email:
              </div>

              {activeTemplate.fields.map((field) => (
                <div key={field.key}>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
                    {field.label}:
                  </label>
                  {field.key === 'dates' || field.key === 'reason' ? (
                    <textarea
                      rows={3}
                      value={currentValues[field.key] || ''}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      style={{
                        width: '100%',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        padding: '0.5rem 0.7rem',
                        color: '#f8fafc',
                        fontSize: '0.85rem',
                        fontFamily: 'monospace'
                      }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={currentValues[field.key] || ''}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      style={{
                        width: '100%',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        padding: '0.5rem 0.7rem',
                        color: '#f8fafc',
                        fontSize: '0.85rem'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Live Mail Client Preview */}
            <div style={{
              background: '#0f172a',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)'
            }}>
              {/* Window Header */}
              <div style={{
                background: '#1e293b',
                padding: '0.6rem 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '0.5rem', fontWeight: 600 }}>
                    Nihongo Mail Preview
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => playNativeAudio(generatedBody, 0.95)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#cbd5e1',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      padding: '0.3rem 0.6rem',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <span>🔊</span>
                    <span>Dengarkan</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    style={{
                      background: copied ? '#10b981' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.3rem 0.8rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <span>{copied ? '✓' : '📋'}</span>
                    <span>{copied ? 'Tersalin!' : 'Salin Email'}</span>
                  </button>
                </div>
              </div>

              {/* Subject Bar */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '0.6rem 1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                fontSize: '0.85rem'
              }}>
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>件名: </span>
                <span style={{ color: '#f8fafc', fontWeight: 700 }}>{activeTemplate.defaultSubject}</span>
              </div>

              {/* Body Text */}
              <div style={{
                padding: '1.2rem',
                flex: 1,
                fontSize: '0.88rem',
                lineHeight: 1.8,
                color: '#e2e8f0',
                whiteSpace: 'pre-wrap',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                maxHeight: '450px',
                overflowY: 'auto'
              }}>
                {generatedBody}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ATURAN BAKU ETIKET & GLOSARIUM KEIGO */}
      {activeTab === 'etiquette' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* 5 Anatomical Rules */}
          <div style={{
            background: 'var(--card-bg, #1e293b)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#f8fafc', fontWeight: 700 }}>
              👔 5 Struktur Anatomi Wajib Email Bisnis Jepang
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.8rem' }}>
              {[
                { step: '1. 件名 (Kenmei / Subjek)', desc: 'Wajib cantumkan tag kurung siku seperti 【連絡】, 【日程調整】, 【ご相談】 diikuti ringkasan topik dan nama perusahaan agar langsung diprioritaskan pembaca.' },
                { step: '2. 宛名 (Atena / Penerima)', desc: 'Urutan: Nama Perusahaan resmi (tanpa singkatan (株)) ➔ Departemen ➔ Jabatan ➔ Nama Lengkap + 様 (Sama). Contoh: 株式会社ABC 営業部 部長 田中様.' },
                { step: '3. 挨拶と名乗り (Pembuka)', desc: 'Untuk klien: いつもお世話になっております。Untuk sesama rekan kantor: お疲れ様です。Setelahnya wajib menyebutkan nama diri (〇〇の山田でございます).' },
                { step: '4. 本文 (Honbun / Isi Inti)', desc: 'Sampaikan kesimpulan di awal (Ketsuron Saisho). Gunakan kata bantal (クッション言葉) seperti 恐れ入りますが sebelum mengajukan permohonan.' },
                { step: '5. 結びと署名 (Penutup & TTD)', desc: 'Tutup dengan 何卒よろしくお願い申し上げます dan lampirkan blok kartu nama digital (Nama, PT, Alamat, Telp, Email).' }
              ].map((rule, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: '10px',
                    padding: '0.9rem'
                  }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#818cf8', marginBottom: '0.3rem' }}>
                    {rule.step}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {rule.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keigo Email Glossary */}
          <div style={{
            background: 'var(--card-bg, #1e293b)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#f8fafc', fontWeight: 700 }}>
              ✨ Glosarium Frasa Sakti Keigo Email:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {keigoEmailGlossary.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#a5b4fc' }}>
                      {item.phrase}
                    </div>
                    <button
                      onClick={() => playNativeAudio(item.phrase)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                      🔊
                    </button>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {item.furigana} ({item.romaji})
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 600 }}>
                    Arti: {item.meaning}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', background: 'rgba(0, 0, 0, 0.2)', padding: '0.5rem', borderRadius: '6px' }}>
                    💡 <strong>Aturan Penggunaan:</strong> {item.rule}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
