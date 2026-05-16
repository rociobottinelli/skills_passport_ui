import { useState } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Badge from '../shared/Badge';
import Card from '../shared/Card';
import { X } from 'lucide-react';

export default function RecruiterCreateOffer() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    modality: '',
    seniority: '',
    description: '',
    salaryMin: '',
    salaryMax: '',
    benefits: '',
  });

  const suggestedSkills = ['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'Product Management', 'Figma', 'SQL'];

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else navigate('/recruiter/offer-published');
  };

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Crear nueva búsqueda</h1>
            <p className="text-[var(--sp-gray-medium)]">Paso {step} de 4</p>
          </div>

          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-[var(--sp-violet)]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Card>
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Información del puesto</h2>
                <Input
                  label="Título del puesto"
                  placeholder="Ej: Senior Frontend Developer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Modalidad</label>
                    <select
                      value={formData.modality}
                      onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                      className="px-4 py-3 bg-[var(--sp-gray-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)]"
                    >
                      <option value="">Seleccioná</option>
                      <option value="remote">Remoto</option>
                      <option value="hybrid">Híbrido</option>
                      <option value="onsite">Presencial</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Seniority</label>
                    <select
                      value={formData.seniority}
                      onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
                      className="px-4 py-3 bg-[var(--sp-gray-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)]"
                    >
                      <option value="">Seleccioná</option>
                      <option value="junior">Junior</option>
                      <option value="semi-senior">Semi-Senior</option>
                      <option value="senior">Senior</option>
                      <option value="lead">Lead</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Habilidades requeridas</h2>
                <div>
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Escribí una habilidad..."
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill(skillInput);
                        }
                      }}
                    />
                    <Button onClick={() => addSkill(skillInput)}>Agregar</Button>
                  </div>

                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="primary">
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 hover:opacity-70"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-[var(--sp-gray-medium)] mb-2">Skills sugeridas:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills
                        .filter((s) => !skills.includes(s))
                        .map((skill) => (
                          <button
                            key={skill}
                            onClick={() => addSkill(skill)}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:border-[var(--sp-violet)] hover:bg-[#E8E7FE] transition-all"
                          >
                            + {skill}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Descripción y beneficios</h2>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Descripción del puesto</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describí las responsabilidades y expectativas..."
                    rows={6}
                    className="px-4 py-3 bg-[var(--sp-gray-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Rango salarial mínimo (USD)"
                    type="number"
                    placeholder="80000"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                  />
                  <Input
                    label="Rango salarial máximo (USD)"
                    type="number"
                    placeholder="120000"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Beneficios</label>
                  <textarea
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    placeholder="Ej: Trabajo remoto, vacaciones flexibles, budget de capacitación..."
                    rows={4}
                    className="px-4 py-3 bg-[var(--sp-gray-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] resize-none"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Preview de la búsqueda</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{formData.title || 'Título del puesto'}</h3>
                    <div className="flex gap-2 mt-2">
                      {formData.modality && <Badge variant="neutral">{formData.modality}</Badge>}
                      {formData.seniority && <Badge variant="neutral">{formData.seniority}</Badge>}
                    </div>
                  </div>

                  {skills.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Habilidades requeridas</h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge key={skill} variant="primary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.description && (
                    <div>
                      <h4 className="font-medium mb-2">Descripción</h4>
                      <p className="text-[var(--sp-gray-medium)]">{formData.description}</p>
                    </div>
                  )}

                  {(formData.salaryMin || formData.salaryMax) && (
                    <div>
                      <h4 className="font-medium mb-2">Rango salarial</h4>
                      <p className="text-[var(--sp-gray-medium)]">
                        USD {formData.salaryMin} - {formData.salaryMax}
                      </p>
                    </div>
                  )}
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
                {step === 4 ? 'Publicar búsqueda' : 'Siguiente'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
