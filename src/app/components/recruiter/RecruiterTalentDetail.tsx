import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Badge from '../shared/Badge';
import MatchScore from '../shared/MatchScore';
import SkillLevelRow from '../shared/SkillLevelRow';
import ValidatorModal, { ValidatorData } from '../shared/ValidatorModal';
import { Briefcase, Shield, Mail, ChevronRight, Lock } from 'lucide-react';
import * as matchesApi from '../../../api/matches';
import type { RecruiterCandidateDetailResponse } from '@/types';
import {
  skillLevelLabel,
  skillTypeLabel,
  reputationLabel,
  reputationGradient,
  formatPeriod,
  getInitials,
} from '@/utils/mappings.ts';

export default function RecruiterTalentDetail() {
  const navigate = useNavigate();
  const { id: candidateId } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as { offerId?: string } | null;
  const offerId = state?.offerId || '';

  const [candidate, setCandidate] = useState<RecruiterCandidateDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedValidator, setSelectedValidator] = useState<ValidatorData | null>(null);

  useEffect(() => {
    if (offerId && candidateId) {
      matchesApi.getOfferCandidate(offerId, candidateId)
        .then(setCandidate)
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [offerId, candidateId]);

  const displayName = candidate?.candidateName || 'Candidato';
  const initials = getInitials(displayName);

  // Derive skill rows from API data
  const techSkills = useMemo(() =>
    (candidate?.candidateSkills ?? [])
      .filter((s) => s.skillType === 'TECH' && s.consolidatedLevel)
      .map((s) => ({
        name: s.skillName,
        level: skillLevelLabel(s.consolidatedLevel!),
        type: skillTypeLabel(s.skillType),
        quote: s.validationComment || 'Sin comentario',
        quotedBy: s.validatorName
          ? `${s.validatorName}${s.validatorCompany ? `, ${s.validatorCompany}` : ''}`
          : '—',
      })),
    [candidate?.candidateSkills],
  );

  const softSkills = useMemo(() =>
    (candidate?.candidateSkills ?? [])
      .filter((s) => s.skillType === 'SOFT' && s.consolidatedLevel)
      .map((s) => ({
        name: s.skillName,
        level: skillLevelLabel(s.consolidatedLevel!),
        type: skillTypeLabel(s.skillType),
        quote: s.validationComment || 'Sin comentario',
        quotedBy: s.validatorName
          ? `${s.validatorName}${s.validatorCompany ? `, ${s.validatorCompany}` : ''}`
          : '—',
      })),
    [candidate?.candidateSkills],
  );

  // Derive validator modal data from API data
  const validators = useMemo(() =>
    (candidate?.validators ?? []).map((v) => {
      const gradient = reputationGradient(v.reputationLevel) ?? { from: '#9CA3AF', to: '#6B7280' };
      return {
        name: v.name,
        initials: getInitials(v.name),
        role: v.role,
        company: v.company,
        reputation: reputationLabel(v.reputationLevel),
        years: v.platformYears,
        validations: v.totalValidations,
        successRate: v.successRate,
        seniority: v.seniority,
        companyPartner: v.companyPartner,
        identityVerified: v.identityVerified,
        gradientFrom: gradient.from,
        gradientTo: gradient.to,
        validatedSkill: v.validatedSkill,
        validatedLevel: skillLevelLabel(v.validatedLevel),
      };
    }),
    [candidate?.validators],
  );

  // Derive experience from API data
  const experience = useMemo(() =>
    (candidate?.workExperience ?? []).map((exp) => ({
      title: exp.position,
      company: exp.company,
      period: formatPeriod(exp.startDate, exp.endDate, exp.isCurrent),
      description: exp.description || '',
    })),
    [candidate?.workExperience],
  );

  const isRevealed = candidate?.profileRevealed ?? false;
  const hasDetailedSkills = techSkills.length > 0 || softSkills.length > 0;

  if (loading) {
    return (
      <div className="theme-recruiter flex min-h-screen bg-[var(--sp-gray-light)]">
        <Sidebar type="recruiter" />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <p className="text-[var(--sp-gray-medium)]">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-recruiter flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/recruiter/talent', { state: { offerId } })}
            className="text-sm text-[var(--sp-violet)] hover:underline mb-6"
          >
            ← Volver a la lista
          </button>

          {/* Profile header */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <div className="flex justify-between items-start mb-5">
              <div className="flex gap-5">
                <div className="w-20 h-20 bg-gradient-to-br from-[var(--sp-violet)] to-[var(--sp-violet-dark)] rounded-2xl flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                  {initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h1 className="text-2xl font-semibold">{displayName}</h1>
                    {candidate?.identityVerified && (
                      <span
                        className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: '#EAF3DE', color: '#27500A' }}
                      >
                        <Shield className="w-3 h-3" />
                        Identidad verificada
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--sp-gray-medium)] mb-3">
                    {candidate?.currentRole || ''}{candidate?.location ? ` · ${candidate.location}` : ''}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {(candidate?.skills || []).map((skill) => (
                      <Badge key={skill} variant="validated">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <MatchScore score={candidate?.matchScore ?? 0} size="lg" />
            </div>

            <div className="flex gap-3">
              <Button onClick={() => navigate('/recruiter/anonymous-inbox', { state: { offerId } })}>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Contactar</span>
                </div>
              </Button>
              <Button variant="secondary">Ver CV</Button>
            </div>
          </div>

          {/* Contact info - only if profile revealed */}
          {candidate?.profileRevealed && candidate.email && (
            <div
              className="rounded-2xl p-6 mb-4"
              style={{ backgroundColor: '#EAF3DE', border: '1px solid #C5DFA8' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-medium text-sm" style={{ color: '#27500A' }}>
                  Datos de contacto — Perfil revelado
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-[var(--sp-gray-medium)] mb-0.5">Email</p>
                  <p className="text-sm font-medium">{candidate.email}</p>
                </div>
                {candidate.linkedIn && (
                  <div>
                    <p className="text-xs text-[var(--sp-gray-medium)] mb-0.5">LinkedIn</p>
                    <p className="text-sm font-medium text-[var(--sp-violet)]">{candidate.linkedIn}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {isRevealed ? (
            hasDetailedSkills ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
                <h3 className="font-semibold mb-3">Habilidades validadas</h3>

                <p className="text-xs text-[var(--sp-gray-medium)] mb-5 leading-relaxed">
                  <span className="font-medium">Colaborador</span> · trabajó con esto
                  &nbsp;|&nbsp;
                  <span className="font-medium">Ejecutor autónomo</span> · lo resolvió solo
                  &nbsp;|&nbsp;
                  <span className="font-medium">Líder</span> · lideró con esto
                  &nbsp;|&nbsp;
                  <span className="font-medium">Referente</span> · forma a otros
                </p>

                {techSkills.length > 0 && (
                  <>
                    <p className="text-xs font-medium text-[var(--sp-gray-medium)] uppercase tracking-wide mb-1">
                      Técnicas
                    </p>
                    <div className="divide-y divide-gray-100">
                      {techSkills.map((s) => (
                        <SkillLevelRow key={s.name} {...s} />
                      ))}
                    </div>
                  </>
                )}

                {techSkills.length > 0 && softSkills.length > 0 && (
                  <div className="my-4 border-t border-gray-100" />
                )}

                {softSkills.length > 0 && (
                  <>
                    <p className="text-xs font-medium text-[var(--sp-gray-medium)] uppercase tracking-wide mb-1">
                      Habilidades blandas
                    </p>
                    <div className="divide-y divide-gray-100">
                      {softSkills.map((s) => (
                        <SkillLevelRow key={s.name} {...s} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
                <h3 className="font-semibold mb-3">Habilidades validadas</h3>
                <p className="text-sm text-[var(--sp-gray-medium)]">
                  Este candidato aún no tiene habilidades validadas.
                </p>
              </div>
            )
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-[var(--sp-gray-medium)]" />
                <h3 className="font-semibold">Habilidades validadas</h3>
              </div>
              <p className="text-sm text-[var(--sp-gray-medium)]">
                El detalle de habilidades estará disponible cuando el candidato revele su perfil.
              </p>
            </div>
          )}

          {/* Validators */}
          {isRevealed ? (
            validators.length > 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
                <h3 className="font-semibold mb-4">Validado por su red</h3>
                <div className="divide-y divide-gray-100">
                  {validators.map((v, i) => (
                    <button
                      key={`${v.name}-${v.validatedSkill}-${i}`}
                      onClick={() => setSelectedValidator(v)}
                      className="w-full flex items-center gap-4 py-4 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2 text-left"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${v.gradientFrom}, ${v.gradientTo})`,
                        }}
                      >
                        {v.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{v.name}</p>
                        <p className="text-xs text-[var(--sp-gray-medium)]">
                          {v.role} · {v.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: 'var(--sp-violet-light)', color: 'var(--sp-violet-dark)' }}
                        >
                          {v.validatedSkill} · {v.validatedLevel}
                        </span>
                        <span className="text-xs text-[var(--sp-gray-medium)]">{v.reputation}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
                <h3 className="font-semibold mb-3">Validado por su red</h3>
                <p className="text-sm text-[var(--sp-gray-medium)]">
                  Este candidato aún no tiene validadores.
                </p>
              </div>
            )
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-[var(--sp-gray-medium)]" />
                <h3 className="font-semibold">Validado por su red</h3>
              </div>
              <p className="text-sm text-[var(--sp-gray-medium)]">
                Los validadores estarán disponibles cuando el candidato revele su perfil.
              </p>
            </div>
          )}

          {/* Experience */}
          {isRevealed ? (
            experience.length > 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold mb-4">Experiencia</h3>
                <div className="divide-y divide-gray-100">
                  {experience.map((exp, i) => (
                    <div key={`${exp.company}-${exp.title}-${i}`} className={`flex gap-4 ${i > 0 ? 'pt-4' : ''} ${i < experience.length - 1 ? 'pb-4' : ''}`}>
                      <div className="w-9 h-9 bg-[var(--sp-gray-light)] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-4 h-4 text-[var(--sp-gray-medium)]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-0.5">{exp.title}</h4>
                        <p className="text-xs text-[var(--sp-gray-medium)]">
                          {exp.company} · {exp.period}
                        </p>
                        {exp.description && (
                          <p className="text-sm text-[var(--sp-gray-medium)] mt-1">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold mb-3">Experiencia</h3>
                <p className="text-sm text-[var(--sp-gray-medium)]">
                  Este candidato aún no ha cargado experiencia laboral.
                </p>
              </div>
            )
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-[var(--sp-gray-medium)]" />
                <h3 className="font-semibold">Experiencia</h3>
              </div>
              <p className="text-sm text-[var(--sp-gray-medium)]">
                La experiencia laboral estará disponible cuando el candidato revele su perfil.
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedValidator && (
        <ValidatorModal
          validator={selectedValidator}
          onClose={() => setSelectedValidator(null)}
        />
      )}
    </div>
  );
}
