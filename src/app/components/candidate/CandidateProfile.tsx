import { useState } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import ProfileSkillRow from '../shared/ProfileSkillRow';
import SkillDetailModal, { ValidationDetail } from '../shared/SkillDetailModal';
import ValidatorModal, { ValidatorData } from '../shared/ValidatorModal';
import { Award, Shield, Briefcase, ChevronRight } from 'lucide-react';
import type { SkillLevel } from '../shared/SkillLevelRow';

// ── Skill data with full validation breakdowns ──────────────────────────────

interface SkillEntry {
  name: string;
  level: SkillLevel;
  type: 'tech' | 'soft';
  score: number;
  validationCount: number;
  quote: string;
  quotedBy: string;
  validations: ValidationDetail[];
}

const javaValidations: ValidationDetail[] = [
  {
    name: 'Diego Giménez',
    initials: 'DG',
    role: 'Engineering Manager',
    company: 'Globant',
    reputation: 'Platino',
    identityVerified: true,
    gradientFrom: '#db2777',
    gradientTo: '#9d174d',
    assignedLevel: 'Referente',
    repScore: 8.9,
    expYears: 10,
    expPts: 9,
    histValidations: 41,
    histPts: 9,
    relationType: 'Manager directo',
    relationPts: 9,
    comment:
      'Como su manager, vi a Sofía crecer hasta volverse la referente técnica del equipo. Lidera por conocimiento, no por cargo.',
  },
  {
    name: 'Martín Ramírez',
    initials: 'MR',
    role: 'Tech Lead',
    company: 'Mercado Libre',
    reputation: 'Oro',
    identityVerified: true,
    gradientFrom: '#185FA5',
    gradientTo: '#0C447C',
    assignedLevel: 'Referente',
    repScore: 8.3,
    expYears: 8,
    expPts: 7,
    histValidations: 52,
    histPts: 10,
    relationType: 'Líder de proyecto',
    relationPts: 9,
    comment:
      'Define la arquitectura Java del equipo y mentorea a los devs nuevos. Es la persona a la que todos consultan cuando hay una decisión técnica difícil.',
  },
  {
    name: 'Valentina Cruz',
    initials: 'VC',
    role: 'Senior Developer',
    company: 'Despegar',
    reputation: 'Plata',
    identityVerified: true,
    gradientFrom: '#0d9488',
    gradientTo: '#0f766e',
    assignedLevel: 'Líder',
    repScore: 7.4,
    expYears: 6,
    expPts: 6,
    histValidations: 28,
    histPts: 8,
    relationType: 'Compañera de equipo',
    relationPts: 10,
    comment:
      'Trabajamos juntas dos años. Su código Java es de los más limpios que vi, siempre pensando en mantenibilidad.',
  },
  {
    name: 'Lucas Fernández',
    initials: 'LF',
    role: 'Senior Developer',
    company: 'Mercado Libre',
    reputation: 'Plata',
    identityVerified: true,
    gradientFrom: '#7c3aed',
    gradientTo: '#5b21b6',
    assignedLevel: 'Líder',
    repScore: 7.1,
    expYears: 5,
    expPts: 6,
    histValidations: 19,
    histPts: 7,
    relationType: 'Compañero de equipo',
    relationPts: 10,
    comment:
      'Pair-programeamos un montón. Explica las cosas de Java de una forma que cualquiera entiende.',
  },
];

const springBootValidations: ValidationDetail[] = [
  {
    name: 'Valentina Cruz',
    initials: 'VC',
    role: 'Senior Developer',
    company: 'Despegar',
    reputation: 'Plata',
    identityVerified: true,
    gradientFrom: '#0d9488',
    gradientTo: '#0f766e',
    assignedLevel: 'Líder',
    repScore: 7.4,
    expYears: 6,
    expPts: 6,
    histValidations: 28,
    histPts: 8,
    relationType: 'Compañera de equipo',
    relationPts: 10,
    comment:
      'Lideró la migración de servicios críticos a Spring Boot. Definió los patrones que usa todo el equipo.',
  },
  {
    name: 'Martín Ramírez',
    initials: 'MR',
    role: 'Tech Lead',
    company: 'Mercado Libre',
    reputation: 'Oro',
    identityVerified: true,
    gradientFrom: '#185FA5',
    gradientTo: '#0C447C',
    assignedLevel: 'Líder',
    repScore: 8.3,
    expYears: 8,
    expPts: 7,
    histValidations: 52,
    histPts: 10,
    relationType: 'Líder de proyecto',
    relationPts: 9,
    comment:
      'Coordinó la migración completa del módulo de pagos sin cortes de servicio. Muy sólida en Spring Boot.',
  },
  {
    name: 'Diego Giménez',
    initials: 'DG',
    role: 'Engineering Manager',
    company: 'Globant',
    reputation: 'Platino',
    identityVerified: true,
    gradientFrom: '#db2777',
    gradientTo: '#9d174d',
    assignedLevel: 'Ejecutor autónomo',
    repScore: 8.9,
    expYears: 10,
    expPts: 9,
    histValidations: 41,
    histPts: 9,
    relationType: 'Manager directo',
    relationPts: 9,
    comment:
      'Spring Boot lo maneja sin necesidad de guía. Resuelve problemas complejos de forma independiente.',
  },
];

const postgresValidations: ValidationDetail[] = [
  {
    name: 'Diego Giménez',
    initials: 'DG',
    role: 'Engineering Manager',
    company: 'Globant',
    reputation: 'Platino',
    identityVerified: true,
    gradientFrom: '#db2777',
    gradientTo: '#9d174d',
    assignedLevel: 'Ejecutor autónomo',
    repScore: 8.9,
    expYears: 10,
    expPts: 9,
    histValidations: 41,
    histPts: 9,
    relationType: 'Manager directo',
    relationPts: 9,
    comment:
      'Diseñó y optimizó esquemas de datos sin supervisión. Los índices que propuso redujeron la latencia un 40%.',
  },
  {
    name: 'Valentina Cruz',
    initials: 'VC',
    role: 'Senior Developer',
    company: 'Despegar',
    reputation: 'Plata',
    identityVerified: true,
    gradientFrom: '#0d9488',
    gradientTo: '#0f766e',
    assignedLevel: 'Ejecutor autónomo',
    repScore: 7.4,
    expYears: 6,
    expPts: 6,
    histValidations: 28,
    histPts: 8,
    relationType: 'Compañera de equipo',
    relationPts: 10,
    comment:
      'Sabe modelar datos para escala. Varias veces encontró cuellos de botella que nadie más detectó.',
  },
];

const techSkills: SkillEntry[] = [
  {
    name: 'Java',
    level: 'Referente',
    type: 'tech',
    score: 9.1,
    validationCount: 4,
    quote: 'Define la arquitectura Java del equipo y mentorea a los devs nuevos.',
    quotedBy: 'Martín R., Mercado Libre',
    validations: javaValidations,
  },
  {
    name: 'Spring Boot',
    level: 'Líder',
    type: 'tech',
    score: 8.6,
    validationCount: 3,
    quote: 'Lideró la migración de servicios críticos a Spring Boot.',
    quotedBy: 'Valentina C., Despegar',
    validations: springBootValidations,
  },
  {
    name: 'PostgreSQL',
    level: 'Ejecutor autónomo',
    type: 'tech',
    score: 8.2,
    validationCount: 2,
    quote: 'Diseñó y optimizó esquemas de datos sin supervisión.',
    quotedBy: 'Diego G., Globant',
    validations: postgresValidations,
  },
];

const softSkills: SkillEntry[] = [
  {
    name: 'Liderazgo técnico',
    level: 'Líder',
    type: 'soft',
    score: 8.1,
    validationCount: 1,
    quote: 'Lideró un equipo de 4 devs en el rediseño del módulo de pagos.',
    quotedBy: 'Diego G., Globant',
    validations: [
      {
        name: 'Diego Giménez',
        initials: 'DG',
        role: 'Engineering Manager',
        company: 'Globant',
        reputation: 'Platino',
        identityVerified: true,
        gradientFrom: '#db2777',
        gradientTo: '#9d174d',
        assignedLevel: 'Líder',
        repScore: 8.9,
        expYears: 10,
        expPts: 9,
        histValidations: 41,
        histPts: 9,
        relationType: 'Manager directo',
        relationPts: 9,
        comment:
          'Lideró un equipo de 4 devs en el rediseño del módulo de pagos. Tomó decisiones técnicas de arquitectura que el equipo adoptó como estándar.',
      },
    ],
  },
  {
    name: 'Comunicación',
    level: 'Referente',
    type: 'soft',
    score: 9.0,
    validationCount: 1,
    quote: 'Explica temas complejos con claridad; da charlas internas al equipo.',
    quotedBy: 'Martín R., Mercado Libre',
    validations: [
      {
        name: 'Martín Ramírez',
        initials: 'MR',
        role: 'Tech Lead',
        company: 'Mercado Libre',
        reputation: 'Oro',
        identityVerified: true,
        gradientFrom: '#185FA5',
        gradientTo: '#0C447C',
        assignedLevel: 'Referente',
        repScore: 8.3,
        expYears: 8,
        expPts: 7,
        histValidations: 52,
        histPts: 10,
        relationType: 'Líder de proyecto',
        relationPts: 9,
        comment:
          'Explica temas complejos con una claridad excepcional. Da charlas técnicas internas que el equipo pide repetir.',
      },
    ],
  },
  {
    name: 'Resolución de conflictos',
    level: 'Ejecutor autónomo',
    type: 'soft',
    score: 7.6,
    validationCount: 1,
    quote: 'Medió desacuerdos técnicos en el equipo sin escalar al manager.',
    quotedBy: 'Valentina C., Despegar',
    validations: [
      {
        name: 'Valentina Cruz',
        initials: 'VC',
        role: 'Senior Developer',
        company: 'Despegar',
        reputation: 'Plata',
        identityVerified: true,
        gradientFrom: '#0d9488',
        gradientTo: '#0f766e',
        assignedLevel: 'Ejecutor autónomo',
        repScore: 7.4,
        expYears: 6,
        expPts: 6,
        histValidations: 28,
        histPts: 8,
        relationType: 'Compañera de equipo',
        relationPts: 10,
        comment:
          'Medió desacuerdos técnicos de forma autónoma. No escala innecesariamente, busca el consenso antes de involucrar al management.',
      },
    ],
  },
];

// ── Validators for the "Mis validadores" section ─────────────────────────────

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

// ── Component ────────────────────────────────────────────────────────────────

export default function CandidateProfile() {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState<SkillEntry | null>(null);
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
                <ProfileSkillRow
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  type={s.type}
                  score={s.score}
                  validationCount={s.validationCount}
                  quote={s.quote}
                  quotedBy={s.quotedBy}
                  onDetail={() => setSelectedSkill(s)}
                />
              ))}
            </div>

            <div className="my-4 border-t border-gray-100" />

            <p className="text-xs font-medium text-[var(--sp-gray-medium)] uppercase tracking-wide mb-1">
              Habilidades blandas
            </p>
            <div className="divide-y divide-gray-100">
              {softSkills.map((s) => (
                <ProfileSkillRow
                  key={s.name}
                  name={s.name}
                  level={s.level}
                  type={s.type}
                  score={s.score}
                  validationCount={s.validationCount}
                  quote={s.quote}
                  quotedBy={s.quotedBy}
                  onDetail={() => setSelectedSkill(s)}
                />
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

      {/* Skill detail modal */}
      {selectedSkill && (
        <SkillDetailModal
          skillName={selectedSkill.name}
          score={selectedSkill.score}
          consolidatedLevel={selectedSkill.level}
          type={selectedSkill.type}
          validations={selectedSkill.validations}
          onClose={() => setSelectedSkill(null)}
        />
      )}

      {/* Validator profile modal */}
      {selectedValidator && (
        <ValidatorModal
          validator={selectedValidator}
          onClose={() => setSelectedValidator(null)}
        />
      )}
    </div>
  );
}
