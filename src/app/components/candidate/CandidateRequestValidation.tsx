import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { TrendingUp, Award, ChevronRight } from 'lucide-react';
import * as validationsApi from '../../../api/validations';
import * as skillsApi from '../../../api/skills';
import type { SuggestedValidator, CandidateSkillResponse } from '../../../types';

export default function CandidateRequestValidation() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { skillId?: string; skillName?: string } | null;

  const [selectedSkillId, setSelectedSkillId] = useState(state?.skillId || '');
  const [selectedSkillName, setSelectedSkillName] = useState(state?.skillName || '');
  const [mySkills, setMySkills] = useState<CandidateSkillResponse[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(!state?.skillId);
  const [validators, setValidators] = useState<SuggestedValidator[]>([]);
  const [loadingValidators, setLoadingValidators] = useState(false);

  useEffect(() => {
    if (!state?.skillId) {
      skillsApi.getCandidateSkills()
        .then(setMySkills)
        .catch(() => {})
        .finally(() => setLoadingSkills(false));
    }
  }, [state?.skillId]);

  useEffect(() => {
    if (selectedSkillId) {
      setLoadingValidators(true);
      validationsApi.getSuggestedValidators(selectedSkillId)
        .then(setValidators)
        .catch(() => {})
        .finally(() => setLoadingValidators(false));
    }
  }, [selectedSkillId]);

  const handleSelectSkill = (skill: CandidateSkillResponse) => {
    setSelectedSkillId(skill.skillId);
    setSelectedSkillName(skill.skillName);
  };

  const handleBack = () => {
    if (selectedSkillId && !state?.skillId) {
      setSelectedSkillId('');
      setSelectedSkillName('');
      setValidators([]);
    } else {
      navigate('/candidate/profile');
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="candidate" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleBack}
            className="text-[var(--sp-violet)] hover:underline mb-6 text-sm"
          >
            ← {selectedSkillId && !state?.skillId ? 'Elegir otra habilidad' : 'Volver al perfil'}
          </button>

          {!selectedSkillId ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-semibold mb-1">Solicitar validación</h1>
                <p className="text-sm text-[var(--sp-gray-medium)]">
                  Elegí la habilidad que querés que validen
                </p>
              </div>

              {loadingSkills ? (
                <p className="text-center text-[var(--sp-gray-medium)] py-12">Cargando habilidades...</p>
              ) : mySkills.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                  <Award className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-[var(--sp-gray-medium)] mb-4">
                    No tenés habilidades cargadas todavía.
                  </p>
                  <Button onClick={() => navigate('/candidate/profile')}>
                    Ir a mi perfil
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-[var(--sp-violet)]" />
                    <h3 className="font-semibold">Mis habilidades</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {mySkills.map((skill) => (
                      <button
                        key={skill.id}
                        onClick={() => handleSelectSkill(skill)}
                        className="w-full flex items-center justify-between py-3.5 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-[var(--sp-violet-light)] rounded-xl flex items-center justify-center flex-shrink-0">
                            <Award className="w-4 h-4 text-[var(--sp-violet)]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{skill.skillName}</p>
                            <p className="text-xs text-[var(--sp-gray-medium)]">
                              {skill.skillType === 'TECH' ? 'Técnica' : 'Blanda'} · {skill.experienceRange}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-semibold mb-1">Solicitar validación</h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm text-[var(--sp-gray-medium)]">Habilidad seleccionada:</span>
                  <Badge variant="primary">{selectedSkillName}</Badge>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
                <div className="bg-gradient-to-br from-[var(--sp-violet-light)] to-white rounded-xl p-5">
                  <h3 className="font-semibold text-sm mb-1">Consejo</h3>
                  <p className="text-sm text-[var(--sp-gray-medium)]">
                    Pedile validación a personas que trabajaron con vos y pueden dar fe de tus habilidades.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold mb-1">Validadores sugeridos</h3>
                <p className="text-xs text-[var(--sp-gray-medium)] mb-4">
                  Usuarios con {selectedSkillName} validado que podrían conocerte
                </p>

                {loadingValidators ? (
                  <p className="text-center text-[var(--sp-gray-medium)] py-8">Cargando validadores...</p>
                ) : validators.length === 0 ? (
                  <p className="text-center text-[var(--sp-gray-medium)] py-8">
                    No hay validadores sugeridos por el momento.
                  </p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {validators.map((validator) => (
                      <div key={validator.candidateId} className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                            {validator.fullName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{validator.fullName}</p>
                            <p className="text-xs text-[var(--sp-gray-medium)]">{validator.seniority}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-1.5">
                              <TrendingUp className="w-3.5 h-3.5 text-[var(--sp-match-green)]" />
                              <span className="text-sm font-semibold text-[var(--sp-match-green)]">
                                {validator.confidenceScore}
                              </span>
                            </div>
                            <p className="text-xs text-[var(--sp-gray-medium)]">Confianza</p>
                          </div>
                          <Button
                            onClick={() =>
                              navigate('/candidate/specify-relation', {
                                state: {
                                  skillId: selectedSkillId,
                                  skillName: selectedSkillName,
                                  validatorId: validator.candidateId,
                                  validatorName: validator.fullName,
                                },
                              })
                            }
                          >
                            Solicitar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
