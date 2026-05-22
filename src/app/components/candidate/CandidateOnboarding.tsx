import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { Upload, X, Shield, CheckCircle, Lock, Camera, ScanFace } from 'lucide-react';

export default function CandidateOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<Array<{ name: string; experience: string }>>([
    { name: 'Java', experience: '7 a 10 años' },
    { name: 'Spring Boot', experience: '4 a 6 años' },
    { name: 'PostgreSQL', experience: '1 a 3 años' },
    { name: 'Docker', experience: '1 a 3 años' },
  ]);
  const [skillInput, setSkillInput] = useState('');
  const [formData, setFormData] = useState({
    headline: '',
    projectTitle: '',
    projectDescription: '',
  });
  const [dni, setDni] = useState('');
  const [tramite, setTramite] = useState('');
  const [renaperSubStep, setRenaperSubStep] = useState<'form' | 'scan' | 'scanning' | 'success'>('form');
  const [scanProgress, setScanProgress] = useState(0);

  const experienceOptions = ['<1 año', '1 a 3 años', '4 a 6 años', '7 a 10 años', '+10 años'];
  const suggestedSkills = ['TypeScript', 'Node.js', 'PostgreSQL'];
  const TOTAL_STEPS = 5;

  const addSkill = () => {
    if (skillInput && !skills.find((s) => s.name === skillInput)) {
      setSkills([...skills, { name: skillInput, experience: '1-3 años' }]);
      setSkillInput('');
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
    else navigate('/candidate/profile');
  };

  const handleDniConfirm = () => {
    setRenaperSubStep('scan');
  };

  const handleStartScan = () => {
    setRenaperSubStep('scanning');
    setScanProgress(0);
  };

  useEffect(() => {
    if (renaperSubStep !== 'scanning') return;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setRenaperSubStep('success'), 300);
          return 100;
        }
        return prev + 4;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [renaperSubStep]);

  const stepLabels = [
    { num: 1, label: 'Datos' },
    { num: 2, label: 'Habilidades' },
    { num: 3, label: 'Proyectos' },
    { num: 4, label: 'Experiencia' },
    { num: 5, label: 'Identidad' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] to-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--sp-violet)] rounded-xl flex items-center justify-center">
                <span className="text-lg text-white font-bold">SP</span>
              </div>
              <h2 className="font-semibold">Skill Passport</h2>
            </div>
            <span className="text-sm text-[var(--sp-gray-medium)]">
              Paso {step} de {TOTAL_STEPS}
            </span>
          </div>

          {/* Step indicators */}
          <div className="flex gap-2 mb-6">
            {stepLabels.map((s) => (
              <div
                key={s.num}
                className="flex-1 text-center py-2 rounded-xl transition-all"
                style={{
                  backgroundColor:
                    s.num === step
                      ? 'var(--sp-violet)'
                      : s.num < step
                      ? 'var(--sp-violet-light)'
                      : '#F3F4F6',
                  color:
                    s.num === step
                      ? '#ffffff'
                      : s.num < step
                      ? 'var(--sp-violet-dark)'
                      : 'var(--sp-gray-medium)',
                }}
              >
                <span className="text-xs font-medium">
                  {s.num < step ? '✓ ' : ''}
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Foto y headline</h2>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Foto de perfil</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[var(--sp-violet)] cursor-pointer transition-all">
                  <Upload className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-[var(--sp-gray-medium)]">
                    Hacé click o arrastrá tu foto aquí
                  </p>
                </div>
              </div>
              <Input
                label="Headline profesional"
                placeholder="Ej: Senior Backend Engineer apasionada por los sistemas distribuidos"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              />
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Cargá tus habilidades</h2>
              <p className="text-sm text-[var(--sp-gray-medium)]">
                Agregá las tecnologías que dominás. Después podrás pedir validaciones.
              </p>

              <div>
                <Input
                  label="Buscar habilidad"
                  placeholder="Ej: React, Java, Product management..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {suggestedSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => {
                        setSkillInput(skill);
                        addSkill();
                      }}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm hover:border-[var(--sp-violet)] hover:bg-[var(--sp-violet-light)] transition-all"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Tus habilidades ({skills.length})</h3>
                  <div className="divide-y divide-gray-100">
                    {skills.map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between py-3">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <div className="flex items-center gap-3">
                          <select
                            value={skill.experience}
                            onChange={(e) =>
                              setSkills(
                                skills.map((s) =>
                                  s.name === skill.name ? { ...s, experience: e.target.value } : s
                                )
                              )
                            }
                            className="px-3 py-1.5 text-sm bg-[var(--sp-gray-light)] border border-transparent rounded-lg"
                          >
                            {experienceOptions.map((exp) => (
                              <option key={exp} value={exp}>
                                {exp}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => setSkills(skills.filter((s) => s.name !== skill.name))}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Agregá un proyecto</h2>
              <Input
                label="Título del proyecto"
                placeholder="Ej: Sistema de gestión de inventario"
                value={formData.projectTitle}
                onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Descripción</label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, projectDescription: e.target.value })
                  }
                  placeholder="Describí tu rol y responsabilidades en el proyecto..."
                  rows={5}
                  className="px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] resize-none text-sm"
                />
              </div>
              <Input label="Link al proyecto" placeholder="https://..." />
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Experiencia laboral</h2>
              <Input label="Empresa" placeholder="Ej: Mercado Libre" />
              <Input label="Puesto" placeholder="Ej: Senior Backend Engineer" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Fecha de inicio" type="month" />
                <Input label="Fecha de fin" type="month" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-[var(--sp-violet)]" />
                <span className="text-sm">Trabajo aquí actualmente</span>
              </div>
            </div>
          )}

          {/* Step 5 — RENAPER */}
          {step === 5 && (
            <div className="space-y-6">

              {/* Sub-step: form (DNI + trámite) */}
              {renaperSubStep === 'form' && (
                <>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#EAF3DE' }}
                    >
                      <Shield className="w-5 h-5" style={{ color: '#27500A' }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Verificá tu identidad</h2>
                      <p className="text-xs text-[var(--sp-gray-medium)]">Opcional · recomendado</p>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--sp-gray-medium)]">
                    Validamos tus datos con RENAPER para que tu perfil tenga el sello de confianza.
                    Los reclutadores priorizan candidatos verificados.
                  </p>

                  {/* Steps indicator for sub-flow */}
                  <div className="flex items-center gap-2">
                    {['1. Datos del DNI', '2. Escaneo facial'].map((label, i) => (
                      <div key={label} className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold"
                            style={{
                              backgroundColor: i === 0 ? 'var(--sp-violet)' : '#E5E7EB',
                              color: i === 0 ? '#fff' : 'var(--sp-gray-medium)',
                            }}
                          >
                            {i + 1}
                          </div>
                          <span className="text-xs" style={{ color: i === 0 ? 'var(--sp-violet-dark)' : 'var(--sp-gray-medium)' }}>
                            {label.replace(/^\d+\. /, '')}
                          </span>
                        </div>
                        {i === 0 && <div className="w-8 h-px bg-gray-200" />}
                      </div>
                    ))}
                  </div>

                  <Input
                    label="Número de DNI"
                    placeholder="Ej: 35.123.456"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                  />
                  <Input
                    label="Número de trámite"
                    placeholder="Número al dorso del DNI"
                    value={tramite}
                    onChange={(e) => setTramite(e.target.value)}
                  />

                  <div
                    className="flex items-start gap-3 rounded-xl p-4"
                    style={{ backgroundColor: '#F8F9FB', border: '1px solid #E5E7EB' }}
                  >
                    <Lock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--sp-gray-medium)]" />
                    <p className="text-xs text-[var(--sp-gray-medium)] leading-relaxed">
                      Tus datos se validan de forma segura contra el Registro Nacional de las Personas.
                      No almacenamos tu información sensible.
                    </p>
                  </div>

                  <button
                    onClick={handleDniConfirm}
                    disabled={!dni || !tramite}
                    className="w-full py-3 rounded-xl font-medium text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ backgroundColor: 'var(--sp-violet)' }}
                  >
                    <Shield className="w-4 h-4" />
                    Continuar al escaneo facial
                  </button>
                </>
              )}

              {/* Sub-step: scan (camera UI) */}
              {(renaperSubStep === 'scan' || renaperSubStep === 'scanning') && (
                <>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#EEEDFE' }}
                    >
                      <ScanFace className="w-5 h-5" style={{ color: 'var(--sp-violet-dark)' }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Escaneo facial</h2>
                      <p className="text-xs text-[var(--sp-gray-medium)]">Paso 2 de 2</p>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--sp-gray-medium)]">
                    Posicioná tu cara dentro del círculo y presioná el botón para iniciar el escaneo.
                  </p>

                  {/* Camera viewport */}
                  <div
                    className="relative rounded-2xl overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: '#0F0F14', height: 280 }}
                  >
                    {/* Corner guides */}
                    {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
                      <div
                        key={i}
                        className={`absolute ${pos} w-6 h-6`}
                        style={{
                          borderTop: i < 2 ? '2px solid rgba(91,91,245,0.6)' : 'none',
                          borderBottom: i >= 2 ? '2px solid rgba(91,91,245,0.6)' : 'none',
                          borderLeft: i % 2 === 0 ? '2px solid rgba(91,91,245,0.6)' : 'none',
                          borderRight: i % 2 === 1 ? '2px solid rgba(91,91,245,0.6)' : 'none',
                        }}
                      />
                    ))}

                    {/* Face oval */}
                    <div className="relative flex items-center justify-center">
                      <div
                        className="absolute rounded-full"
                        style={{
                          width: 160,
                          height: 196,
                          border: renaperSubStep === 'scanning'
                            ? '2px solid #5B5BF5'
                            : '2px dashed rgba(255,255,255,0.3)',
                          transition: 'border-color 0.3s',
                        }}
                      />

                      {/* Scan line animation */}
                      {renaperSubStep === 'scanning' && (
                        <div
                          className="absolute rounded-full overflow-hidden"
                          style={{ width: 160, height: 196 }}
                        >
                          <div
                            className="absolute left-0 right-0 h-0.5"
                            style={{
                              background: 'linear-gradient(90deg, transparent, #5B5BF5, #A5A5FA, #5B5BF5, transparent)',
                              top: `${scanProgress}%`,
                              transition: 'top 60ms linear',
                              boxShadow: '0 0 12px 2px rgba(91,91,245,0.5)',
                            }}
                          />
                        </div>
                      )}

                      {/* Face silhouette */}
                      <svg width="80" height="96" viewBox="0 0 80 96" fill="none" opacity={0.25}>
                        <ellipse cx="40" cy="34" rx="22" ry="26" fill="white" />
                        <path d="M10 90 Q10 64 40 64 Q70 64 70 90" fill="white" />
                      </svg>
                    </div>

                    {/* Progress ring overlay */}
                    {renaperSubStep === 'scanning' && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <p className="text-xs text-white/60">Escaneando… {scanProgress}%</p>
                      </div>
                    )}

                    {renaperSubStep === 'scan' && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <p className="text-xs text-white/40">Cámara lista</p>
                      </div>
                    )}
                  </div>

                  {/* Progress bar */}
                  {renaperSubStep === 'scanning' && (
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${scanProgress}%`,
                          backgroundColor: 'var(--sp-violet)',
                          transition: 'width 60ms linear',
                        }}
                      />
                    </div>
                  )}

                  <div
                    className="flex items-start gap-3 rounded-xl p-4"
                    style={{ backgroundColor: '#F8F9FB', border: '1px solid #E5E7EB' }}
                  >
                    <Lock className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--sp-gray-medium)]" />
                    <p className="text-xs text-[var(--sp-gray-medium)] leading-relaxed">
                      El escaneo facial se procesa en el dispositivo y no se almacena ninguna imagen.
                      Solo se transmite el resultado de la verificación biométrica a RENAPER.
                    </p>
                  </div>

                  {renaperSubStep === 'scan' && (
                    <button
                      onClick={handleStartScan}
                      className="w-full py-3 rounded-xl font-medium text-white transition-all flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'var(--sp-violet)' }}
                    >
                      <Camera className="w-4 h-4" />
                      Iniciar escaneo facial
                    </button>
                  )}

                  {renaperSubStep === 'scanning' && (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 opacity-70 cursor-not-allowed"
                      style={{ backgroundColor: 'var(--sp-violet)' }}
                    >
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Analizando rasgos biométricos…
                    </button>
                  )}
                </>
              )}

              {/* Sub-step: success */}
              {renaperSubStep === 'success' && (
                <div className="text-center py-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: '#EAF3DE' }}
                  >
                    <CheckCircle className="w-10 h-10" style={{ color: '#639922' }} />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Identidad verificada ✓</h2>
                  <p className="text-sm text-[var(--sp-gray-medium)] mb-5">
                    Tu DNI y escaneo facial coinciden con el registro de RENAPER. Tu perfil ahora tiene
                    el sello de confianza — los reclutadores lo verán destacado.
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: '#EAF3DE', color: '#27500A' }}
                  >
                    <Shield className="w-4 h-4" />
                    Identidad verificada
                  </span>
                </div>
              )}

            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
            {step > 1 && renaperSubStep === 'form' && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>
                Volver
              </Button>
            )}
            {step > 1 && renaperSubStep === 'scan' && (
              <Button variant="secondary" onClick={() => setRenaperSubStep('form')}>
                Volver
              </Button>
            )}
            {step < TOTAL_STEPS && (
              <Button onClick={handleNext} fullWidth={step === 1}>
                Siguiente
              </Button>
            )}
            {step === TOTAL_STEPS && renaperSubStep === 'success' && (
              <Button onClick={() => navigate('/candidate/profile')} fullWidth>
                Ir a mi perfil
              </Button>
            )}
            {step === TOTAL_STEPS && renaperSubStep !== 'success' && (
              <button
                onClick={() => navigate('/candidate/profile')}
                className="flex-1 py-3 text-sm text-[var(--sp-gray-medium)] hover:underline"
              >
                Omitir por ahora
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
