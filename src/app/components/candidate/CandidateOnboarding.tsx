import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Badge from '../shared/Badge';
import { Upload, X } from 'lucide-react';

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

  const experienceOptions = ['<1 año', '1 a 3 años', '4 a 6 años', '7 a 10 años', '+10 años'];
  const suggestedSkills = ['TypeScript', 'Node.js', 'PostgreSQL'];

  const addSkill = () => {
    if (skillInput && !skills.find((s) => s.name === skillInput)) {
      setSkills([...skills, { name: skillInput, experience: '1-3 años' }]);
      setSkillInput('');
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else navigate('/candidate/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] to-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-[var(--sp-violet)] rounded-2xl flex items-center justify-center">
                <span className="text-3xl text-white font-bold">SP</span>
              </div>
              <h2 className="text-xl font-medium">Skill Passport</h2>
            </div>
            <div className="px-4 py-2 bg-[var(--sp-violet-light)] text-[var(--sp-violet-dark)] rounded-full font-medium">
              Paso {step} de 4
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            {[
              { num: 1, label: '✓ Datos' },
              { num: 2, label: 'Habilidades' },
              { num: 3, label: 'Proyectos' },
              { num: 4, label: 'Experiencia' },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex-1 text-center py-2 rounded-xl transition-all ${
                  s.num === step
                    ? 'bg-[var(--sp-violet)] text-white font-medium'
                    : s.num < step
                    ? 'bg-[var(--sp-violet-light)] text-[var(--sp-violet-dark)]'
                    : 'bg-gray-100 text-[var(--sp-gray-medium)]'
                }`}
              >
                <span className="text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Foto y headline</h2>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Foto de perfil</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[var(--sp-violet)] cursor-pointer transition-all">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-[var(--sp-gray-medium)]">
                    Hacé click o arrastrá tu foto aquí
                  </p>
                </div>
              </div>
              <Input
                label="Headline profesional"
                placeholder="Ej: Frontend Developer apasionado por crear experiencias increíbles"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Cargá tus habilidades</h2>
              <p className="text-[var(--sp-gray-medium)]">
                Agregá las tecnologías y conocimientos que dominás. Después podrás pedir validaciones.
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

                {suggestedSkills.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => {
                            setSkillInput(skill);
                            addSkill();
                          }}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:border-[var(--sp-violet)] hover:bg-[var(--sp-violet-light)] transition-all"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {skills.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Tus habilidades ({skills.length})</h3>
                  <div className="space-y-2">
                    {skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-3 bg-[var(--sp-gray-light)] rounded-xl"
                      >
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center gap-3">
                          <select
                            value={skill.experience}
                            onChange={(e) => {
                              setSkills(
                                skills.map((s) =>
                                  s.name === skill.name ? { ...s, experience: e.target.value } : s
                                )
                              );
                            }}
                            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg"
                          >
                            {experienceOptions.map((exp) => (
                              <option key={exp} value={exp}>
                                {exp}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Agregá un proyecto</h2>
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
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Describí tu rol y responsabilidades en el proyecto..."
                  rows={6}
                  className="px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] resize-none"
                />
              </div>
              <Input label="Link al proyecto" placeholder="https://..." />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Experiencia laboral</h2>
              <Input label="Empresa" placeholder="Ej: Mercado Libre" />
              <Input label="Puesto" placeholder="Ej: Frontend Developer" />
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

          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            {step > 1 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>
                Volver
              </Button>
            )}
            <Button onClick={handleNext} fullWidth={step === 1}>
              {step === 4 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
