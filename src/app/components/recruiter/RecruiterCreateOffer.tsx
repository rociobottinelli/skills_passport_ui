import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Input from '../shared/Input';
import Badge from '../shared/Badge';
import Card from '../shared/Card';
import { X } from 'lucide-react';
import * as recruiterApi from '../../../api/recruiter';
import * as skillsApi from '../../../api/skills';
import type { Modality, Seniority, SkillResponse } from '../../../types';

const MODALITY_MAP: Record<string, Modality> = {
  remote: 'REMOTE',
  hybrid: 'HYBRID',
  onsite: 'ONSITE',
};

const SENIORITY_MAP: Record<string, Seniority> = {
  junior: 'JUNIOR',
  'semi-senior': 'SEMI_SENIOR',
  senior: 'SENIOR',
  lead: 'LEAD',
};

interface OfferSkillEntry {
  skillId: string;
  name: string;
  requirement: 'REQUIRED' | 'DESIRABLE';
}

export default function RecruiterCreateOffer() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<OfferSkillEntry[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [skillSearchResults, setSkillSearchResults] = useState<SkillResponse[]>([]);
  const [suggestedSkills, setSuggestedSkills] = useState<SkillResponse[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    modality: '',
    seniority: '',
    description: '',
    salaryMin: '',
    salaryMax: '',
    benefits: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    skillsApi.getSuggestions().then(setSuggestedSkills).catch(() => {});
  }, []);

  useEffect(() => {
    if (!skillInput) {
      setSkillSearchResults([]);
      return;
    }
    const timeout = setTimeout(() => {
      skillsApi.searchSkills(skillInput).then(setSkillSearchResults).catch(() => {});
    }, 300);
    return () => clearTimeout(timeout);
  }, [skillInput]);

  const addSkillFromCatalog = (skill: SkillResponse, requirement: 'REQUIRED' | 'DESIRABLE' = 'REQUIRED') => {
    if (!skills.find((s) => s.skillId === skill.id)) {
      setSkills([...skills, { skillId: skill.id, name: skill.name, requirement }]);
    }
    setSkillInput('');
    setSkillSearchResults([]);
  };

  const toggleRequirement = (skillId: string) => {
    setSkills(
      skills.map((s) =>
        s.skillId === skillId
          ? { ...s, requirement: s.requirement === 'REQUIRED' ? 'DESIRABLE' : 'REQUIRED' }
          : s
      )
    );
  };

  const removeSkill = (skillId: string) => {
    setSkills(skills.filter((s) => s.skillId !== skillId));
  };

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setSaving(true);
      try {
        const offerId = await recruiterApi.createOffer({
          title: formData.title,
          modality: MODALITY_MAP[formData.modality] || 'REMOTE',
          seniority: SENIORITY_MAP[formData.seniority] || 'SENIOR',
          description: formData.description || undefined,
          salaryMin: formData.salaryMin ? Number(formData.salaryMin) : undefined,
          salaryMax: formData.salaryMax ? Number(formData.salaryMax) : undefined,
          benefits: formData.benefits || undefined,
          skills: skills.map((s) => ({ skillId: s.skillId, requirement: s.requirement })),
        });
        await recruiterApi.publishOffer(offerId);
        navigate('/recruiter/offer-published', { state: { offerTitle: formData.title } });
      } catch {
        navigate('/recruiter/offer-published');
      } finally {
        setSaving(false);
      }
    }
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
                <p className="text-sm text-[var(--sp-gray-medium)]">
                  Seleccioná del catálogo. Click en una skill para alternar entre requerida y deseable.
                </p>

                <div>
                  <Input
                    label="Buscar habilidad"
                    placeholder="Ej: React, Java, PostgreSQL..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e: React.KeyboardEvent) => {
                      if (e.key === 'Enter' && skillSearchResults.length > 0) {
                        e.preventDefault();
                        addSkillFromCatalog(skillSearchResults[0]);
                      }
                    }}
                  />
                  {skillSearchResults.length > 0 && (
                    <div className="border border-gray-200 rounded-lg mt-1 max-h-40 overflow-y-auto bg-white shadow-sm">
                      {skillSearchResults.map((skill) => (
                        <button
                          key={skill.id}
                          onClick={() => addSkillFromCatalog(skill)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--sp-violet-light)] transition-all"
                        >
                          {skill.name} <span className="text-xs text-gray-400">({skill.type})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <button
                        key={skill.skillId}
                        onClick={() => toggleRequirement(skill.skillId)}
                        className="inline-flex items-center gap-2"
                      >
                        <Badge variant={skill.requirement === 'REQUIRED' ? 'primary' : 'neutral'}>
                          {skill.name}
                          <span className="text-xs opacity-70">
                            · {skill.requirement === 'REQUIRED' ? 'requerida' : 'deseable'}
                          </span>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSkill(skill.skillId);
                            }}
                            className="ml-1 hover:opacity-70"
                          >
                            <X className="w-3 h-3" />
                          </span>
                        </Badge>
                      </button>
                    ))}
                  </div>
                )}

                <div>
                  <p className="text-sm text-[var(--sp-gray-medium)] mb-2">Skills sugeridas:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedSkills
                      .filter((s) => !skills.find((sk) => sk.skillId === s.id))
                      .map((skill) => (
                        <button
                          key={skill.id}
                          onClick={() => addSkillFromCatalog(skill)}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:border-[var(--sp-violet)] hover:bg-[#E8E7FE] transition-all"
                        >
                          + {skill.name}
                        </button>
                      ))}
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
                          <Badge key={skill.skillId} variant={skill.requirement === 'REQUIRED' ? 'primary' : 'neutral'}>
                            {skill.name}
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
              <Button onClick={handleNext} fullWidth={step === 1} disabled={saving}>
                {saving ? 'Publicando...' : step === 4 ? 'Publicar búsqueda' : 'Siguiente'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
