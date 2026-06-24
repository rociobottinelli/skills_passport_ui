import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Badge from '../shared/Badge';
import MatchScore from '../shared/MatchScore';
import SkillLevelRow from '../shared/SkillLevelRow';
import ValidatorModal, { ValidatorData } from '../shared/ValidatorModal';
import { Briefcase, Shield, Mail, ChevronRight } from 'lucide-react';
import * as matchesApi from '../../../api/matches';
import type { RecruiterCandidateMatchResponse } from '../../../types';

const techSkills = [
  {
    name: 'Java',
    level: 'Referente' as const,
    type: 'tech' as const,
    quote: 'Define la arquitectura Java del equipo y mentorea a los devs nuevos.',
    quotedBy: 'Martín R., Mercado Libre',
  },
  {
    name: 'Spring Boot',
    level: 'Líder' as const,
    type: 'tech' as const,
    quote: 'Lideró la migración de servicios críticos a Spring Boot.',
    quotedBy: 'Valentina C., Despegar',
  },
  {
    name: 'PostgreSQL',
    level: 'Ejecutor autónomo' as const,
    type: 'tech' as const,
    quote: 'Diseñó y optimizó esquemas de datos sin supervisión.',
    quotedBy: 'Diego G., Globant',
  },
];

const softSkills = [
  {
    name: 'Liderazgo técnico',
    level: 'Líder' as const,
    type: 'soft' as const,
    quote: 'Lideró un equipo de 4 devs en el rediseño del módulo de pagos.',
    quotedBy: 'Diego G., Globant',
  },
  {
    name: 'Comunicación',
    level: 'Referente' as const,
    type: 'soft' as const,
    quote: 'Explica temas complejos con claridad; da charlas internas al equipo.',
    quotedBy: 'Martín R., Mercado Libre',
  },
];

const validators: (ValidatorData & { validatedSkill: string; validatedLevel: string })[] = [
  {
    name: 'Martín Ramírez',
    initials: 'MR',
    role: 'Tech Lead',
    company: 'Mercado Libre',
    reputation: 'Oro',
    years: 2,
    validations: 52,
    successRate: 87,
    seniority: 'Tech Lead',
    companyPartner: true,
    identityVerified: true,
    gradientFrom: '#185FA5',
    gradientTo: '#0C447C',
    validatedSkill: 'Java',
    validatedLevel: 'Referente',
  },
  {
    name: 'Valentina Cruz',
    initials: 'VC',
    role: 'Senior Developer',
    company: 'Despegar',
    reputation: 'Plata',
    years: 1,
    validations: 28,
    successRate: 74,
    seniority: 'Senior Developer',
    companyPartner: true,
    identityVerified: true,
    gradientFrom: '#0d9488',
    gradientTo: '#0f766e',
    validatedSkill: 'Spring Boot',
    validatedLevel: 'Líder',
  },
  {
    name: 'Diego Giménez',
    initials: 'DG',
    role: 'Engineering Manager',
    company: 'Globant',
    reputation: 'Platino',
    years: 3,
    validations: 89,
    successRate: 91,
    seniority: 'Engineering Manager',
    companyPartner: true,
    identityVerified: true,
    gradientFrom: '#db2777',
    gradientTo: '#9d174d',
    validatedSkill: 'PostgreSQL',
    validatedLevel: 'Ejecutor autónomo',
  },
];

const experience = [
  {
    title: 'Senior Backend Engineer',
    company: 'Mercado Libre',
    period: '2021 - Presente',
    description: 'Desarrollo de microservicios de pagos y gestión de transacciones.',
  },
  {
    title: 'Backend Engineer',
    company: 'Globant',
    period: '2019 - 2021',
    description: 'Desarrollo de APIs REST para clientes corporativos.',
  },
];

export default function RecruiterTalentDetail() {
  const navigate = useNavigate();
  const { id: candidateId } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as { offerId?: string } | null;
  const offerId = state?.offerId || '';

  const [candidate, setCandidate] = useState<RecruiterCandidateMatchResponse | null>(null);
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
  const initials = displayName.split(' ').map((n) => n[0]).join('').slice(0, 2);

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

          {/* Skills - mock data for now, backend needs to return full skill details */}
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

            <p className="text-xs font-medium text-[var(--sp-gray-medium)] uppercase tracking-wide mb-1">
              Técnicas
            </p>
            <div className="divide-y divide-gray-100">
              {techSkills.map((s) => (
                <SkillLevelRow key={s.name} {...s} />
              ))}
            </div>

            <div className="my-4 border-t border-gray-100" />

            <p className="text-xs font-medium text-[var(--sp-gray-medium)] uppercase tracking-wide mb-1">
              Habilidades blandas
            </p>
            <div className="divide-y divide-gray-100">
              {softSkills.map((s) => (
                <SkillLevelRow key={s.name} {...s} />
              ))}
            </div>
          </div>

          {/* Validators */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <h3 className="font-semibold mb-4">Validado por su red</h3>
            <div className="divide-y divide-gray-100">
              {validators.map((v) => (
                <button
                  key={v.name}
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

          {/* Experience */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold mb-4">Experiencia</h3>
            <div className="divide-y divide-gray-100">
              {experience.map((exp, i) => (
                <div key={exp.title} className={`flex gap-4 ${i > 0 ? 'pt-4' : ''} ${i < experience.length - 1 ? 'pb-4' : ''}`}>
                  <div className="w-9 h-9 bg-[var(--sp-gray-light)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-4 h-4 text-[var(--sp-gray-medium)]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-0.5">{exp.title}</h4>
                    <p className="text-xs text-[var(--sp-gray-medium)]">
                      {exp.company} · {exp.period}
                    </p>
                    <p className="text-sm text-[var(--sp-gray-medium)] mt-1">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
