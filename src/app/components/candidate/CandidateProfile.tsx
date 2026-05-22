import { useState } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import SkillLevelRow from '../shared/SkillLevelRow';
import ValidatorModal, { ValidatorData } from '../shared/ValidatorModal';
import { Award, Shield, Briefcase, ChevronRight } from 'lucide-react';

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
  {
    name: 'Resolución de conflictos',
    level: 'Ejecutor autónomo' as const,
    type: 'soft' as const,
    quote: 'Medió desacuerdos técnicos en el equipo sin escalar al manager.',
    quotedBy: 'Valentina C., Despegar',
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
  {
    title: 'Junior Backend Developer',
    company: 'Despegar',
    period: '2017 - 2019',
    description: 'Desarrollo y mantenimiento de servicios backend.',
  },
];

export default function CandidateProfile() {
  const navigate = useNavigate();
  const [selectedValidator, setSelectedValidator] = useState<ValidatorData | null>(null);

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="candidate" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-1">Mi Perfil</h1>
            <p className="text-sm text-[var(--sp-gray-medium)]">Gestioná tu información profesional</p>
          </div>

          {/* Profile header */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <div className="flex gap-5">
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--sp-violet)] to-[var(--sp-violet-dark)] rounded-2xl flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                SM
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="text-xl font-semibold">Sofía Martínez</h2>
                  <span
                    className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: '#EAF3DE', color: '#27500A' }}
                  >
                    <Shield className="w-3 h-3" />
                    Identidad verificada
                  </span>
                </div>
                <p className="text-sm text-[var(--sp-gray-medium)] mb-3">
                  Senior Backend Engineer · Buenos Aires
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--sp-violet)]" style={{ width: '85%' }} />
                  </div>
                  <span className="text-xs font-medium text-[var(--sp-gray-medium)]">85% completo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills section */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[var(--sp-violet)]" />
                <h3 className="font-semibold">Habilidades validadas</h3>
              </div>
              <Button onClick={() => navigate('/candidate/request-validation')} variant="secondary">
                Solicitar validación
              </Button>
            </div>

            {/* Scale legend */}
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
            <h3 className="font-semibold mb-4">Mis validadores</h3>
            <div className="divide-y divide-gray-100">
              {validators.map((v) => (
                <button
                  key={v.name}
                  onClick={() => setSelectedValidator(v)}
                  className="w-full flex items-center gap-3 py-3.5 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2 text-left"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
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
                      style={{ backgroundColor: '#EEEDFE', color: '#3C3489' }}
                    >
                      {v.validatedSkill} · {v.validatedLevel}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <h3 className="font-semibold mb-4">Experiencia</h3>
            <div className="space-y-5 divide-y divide-gray-100">
              {experience.map((exp, i) => (
                <div key={exp.title} className={`flex gap-4 ${i > 0 ? 'pt-5' : ''}`}>
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

          {/* Given validations */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold mb-4">Validaciones que diste</h3>
            <div className="divide-y divide-gray-100">
              {[
                { name: 'María García', skill: 'Java', date: 'Hace 2 días', initials: 'MG' },
                { name: 'Diego Fernández', skill: 'Spring Boot', date: 'Hace 1 semana', initials: 'DF' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xs">
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-[var(--sp-gray-medium)]">Validaste {item.skill}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[var(--sp-gray-medium)]">{item.date}</span>
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
