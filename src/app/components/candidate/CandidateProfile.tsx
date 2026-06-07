import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import ProfileSkillRow from '../shared/ProfileSkillRow';
import SkillDetailModal, { ValidationDetail } from '../shared/SkillDetailModal';
import ValidatorModal, { ValidatorData } from '../shared/ValidatorModal';
import { Award, Shield, Briefcase, ChevronRight, Plus, X, FolderOpen, ExternalLink } from 'lucide-react';
import type { SkillLevel } from '../shared/SkillLevelRow';
import * as candidateApi from '../../../api/candidate';
import * as skillsApi from '../../../api/skills';
import * as validationsApi from '../../../api/validations';
import type {
  CandidateProfileResponse,
  CandidateSkillResponse,
  ValidationResponse as ApiValidationResponse,
  WorkExperienceResponse,
  ProjectResponse,
  SkillResponse,
  ExperienceRange,
} from '../../../types';

// ── Skill data with full validation breakdowns ──────────────────────────────

interface SkillEntry {
  id?: string;
  skillId?: string;
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
  { name: 'Java', level: 'Referente', type: 'tech', score: 9.1, validationCount: 4, quote: 'Define la arquitectura Java del equipo y mentorea a los devs nuevos.', quotedBy: 'Martín R., Mercado Libre', validations: javaValidations },
  { name: 'Spring Boot', level: 'Líder', type: 'tech', score: 8.6, validationCount: 3, quote: 'Lideró la migración de servicios críticos a Spring Boot.', quotedBy: 'Valentina C., Despegar', validations: springBootValidations },
  { name: 'PostgreSQL', level: 'Ejecutor autónomo', type: 'tech', score: 8.2, validationCount: 2, quote: 'Diseñó y optimizó esquemas de datos sin supervisión.', quotedBy: 'Diego G., Globant', validations: postgresValidations },
];

const softSkills: SkillEntry[] = [
  { name: 'Liderazgo técnico', level: 'Líder', type: 'soft', score: 8.1, validationCount: 1, quote: 'Lideró un equipo de 4 devs en el rediseño del módulo de pagos.', quotedBy: 'Diego G., Globant', validations: [{ name: 'Diego Giménez', initials: 'DG', role: 'Engineering Manager', company: 'Globant', reputation: 'Platino', identityVerified: true, gradientFrom: '#db2777', gradientTo: '#9d174d', assignedLevel: 'Líder', repScore: 8.9, expYears: 10, expPts: 9, histValidations: 41, histPts: 9, relationType: 'Manager directo', relationPts: 9, comment: 'Lideró un equipo de 4 devs en el rediseño del módulo de pagos. Tomó decisiones técnicas de arquitectura que el equipo adoptó como estándar.' }] },
  { name: 'Comunicación', level: 'Referente', type: 'soft', score: 9.0, validationCount: 1, quote: 'Explica temas complejos con claridad; da charlas internas al equipo.', quotedBy: 'Martín R., Mercado Libre', validations: [{ name: 'Martín Ramírez', initials: 'MR', role: 'Tech Lead', company: 'Mercado Libre', reputation: 'Oro', identityVerified: true, gradientFrom: '#185FA5', gradientTo: '#0C447C', assignedLevel: 'Referente', repScore: 8.3, expYears: 8, expPts: 7, histValidations: 52, histPts: 10, relationType: 'Líder de proyecto', relationPts: 9, comment: 'Explica temas complejos con una claridad excepcional. Da charlas técnicas internas que el equipo pide repetir.' }] },
  { name: 'Resolución de conflictos', level: 'Ejecutor autónomo', type: 'soft', score: 7.6, validationCount: 1, quote: 'Medió desacuerdos técnicos en el equipo sin escalar al manager.', quotedBy: 'Valentina C., Despegar', validations: [{ name: 'Valentina Cruz', initials: 'VC', role: 'Senior Developer', company: 'Despegar', reputation: 'Plata', identityVerified: true, gradientFrom: '#0d9488', gradientTo: '#0f766e', assignedLevel: 'Ejecutor autónomo', repScore: 7.4, expYears: 6, expPts: 6, histValidations: 28, histPts: 8, relationType: 'Compañera de equipo', relationPts: 10, comment: 'Medió desacuerdos técnicos de forma autónoma. No escala innecesariamente, busca el consenso antes de involucrar al management.' }] },
];

// ── Validators for the "Mis validadores" section ─────────────────────────────

const validators: (ValidatorData & { validatedSkill: string; validatedLevel: string })[] = [
  { name: 'Martín Ramírez', initials: 'MR', role: 'Tech Lead', company: 'Mercado Libre', reputation: 'Oro', years: 2, validations: 52, successRate: 87, seniority: 'Tech Lead', companyPartner: true, identityVerified: true, gradientFrom: '#185FA5', gradientTo: '#0C447C', validatedSkill: 'Java', validatedLevel: 'Referente' },
  { name: 'Valentina Cruz', initials: 'VC', role: 'Senior Developer', company: 'Despegar', reputation: 'Plata', years: 1, validations: 28, successRate: 74, seniority: 'Senior Developer', companyPartner: true, identityVerified: true, gradientFrom: '#0d9488', gradientTo: '#0f766e', validatedSkill: 'Spring Boot', validatedLevel: 'Líder' },
  { name: 'Diego Giménez', initials: 'DG', role: 'Engineering Manager', company: 'Globant', reputation: 'Platino', years: 3, validations: 89, successRate: 91, seniority: 'Engineering Manager', companyPartner: true, identityVerified: true, gradientFrom: '#db2777', gradientTo: '#9d174d', validatedSkill: 'PostgreSQL', validatedLevel: 'Ejecutor autónomo' },
];

const fallbackExperience = [
  { title: 'Senior Backend Engineer', company: 'Mercado Libre', period: '2021 - Presente', description: 'Desarrollo de microservicios de pagos y gestión de transacciones.' },
  { title: 'Backend Engineer', company: 'Globant', period: '2019 - 2021', description: 'Desarrollo de APIs REST para clientes corporativos.' },
  { title: 'Junior Backend Developer', company: 'Despegar', period: '2017 - 2019', description: 'Desarrollo y mantenimiento de servicios backend.' },
];

const EXPERIENCE_MAP: Record<string, ExperienceRange> = {
  '<1 año': '<1 year',
  '1 a 3 años': '1-3 years',
  '4 a 6 años': '4-6 years',
  '7 a 10 años': '7-10 years',
  '+10 años': '10+ years',
};

const EXPERIENCE_OPTIONS = ['<1 año', '1 a 3 años', '4 a 6 años', '7 a 10 años', '+10 años'];

function formatPeriod(startDate: string, endDate: string | null, isCurrent: boolean): string {
  const fmt = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('es-AR', { month: 'short', year: 'numeric' });
  };
  const start = fmt(startDate);
  if (isCurrent) return `${start} - Presente`;
  if (endDate) return `${start} - ${fmt(endDate)}`;
  return start;
}

// ── Component ────────────────────────────────────────────────────────────────

const LEVEL_LABELS: Record<string, SkillLevel> = {
  COLABORADOR: 'Colaborador',
  EJECUTOR_AUTONOMO: 'Ejecutor autónomo',
  LIDER: 'Líder',
  REFERENTE: 'Referente',
};

function mapApiSkill(skill: CandidateSkillResponse): SkillEntry {
  return {
    id: skill.id,
    skillId: skill.skillId,
    name: skill.skillName,
    level: skill.consolidatedLevel ? LEVEL_LABELS[skill.consolidatedLevel] || 'Colaborador' : 'Colaborador',
    type: skill.skillType === 'SOFT' ? 'soft' : 'tech',
    score: skill.consolidatedScore ?? 0,
    validationCount: skill.consolidatedLevel ? 1 : 0,
    quote: skill.consolidatedLevel
      ? 'Validada por tu red profesional'
      : 'Todavía sin validaciones — solicitá una a un colega',
    quotedBy: skill.consolidatedLevel ? 'Red Skill Passport' : 'Pendiente',
    validations: [],
  };
}

export default function CandidateProfile() {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState<SkillEntry | null>(null);
  const [selectedValidator, setSelectedValidator] = useState<ValidatorData | null>(null);
  const [profile, setProfile] = useState<CandidateProfileResponse | null>(null);
  const [apiSkills, setApiSkills] = useState<CandidateSkillResponse[]>([]);
  const [givenValidations, setGivenValidations] = useState<ApiValidationResponse[]>([]);
  const [apiExperiences, setApiExperiences] = useState<WorkExperienceResponse[]>([]);
  const [apiProjects, setApiProjects] = useState<ProjectResponse[]>([]);

  // Add skill state
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [skillSearch, setSkillSearch] = useState('');
  const [skillSearchResults, setSkillSearchResults] = useState<SkillResponse[]>([]);
  const [pendingSkill, setPendingSkill] = useState<SkillResponse | null>(null);
  const [pendingExp, setPendingExp] = useState('<1 año');
  const [savingSkill, setSavingSkill] = useState(false);

  // Add experience state
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [newExp, setNewExp] = useState({ company: '', position: '', startDate: '', endDate: '', isCurrent: false });
  const [savingExp, setSavingExp] = useState(false);

  // Add project state
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', link: '' });
  const [savingProject, setSavingProject] = useState(false);

  useEffect(() => {
    candidateApi.getProfile().then(setProfile).catch(() => {});
    skillsApi.getCandidateSkills().then(setApiSkills).catch(() => {});
    validationsApi.getValidationsGiven().then(setGivenValidations).catch(() => {});
    candidateApi.getExperiences().then(setApiExperiences).catch(() => {});
    candidateApi.getProjects().then(setApiProjects).catch(() => {});
  }, []);

  useEffect(() => {
    if (!skillSearch) {
      setSkillSearchResults([]);
      return;
    }
    const timeout = setTimeout(() => {
      skillsApi.searchSkills(skillSearch).then(setSkillSearchResults).catch(() => {});
    }, 300);
    return () => clearTimeout(timeout);
  }, [skillSearch]);

  const handleAddSkill = async () => {
    if (!pendingSkill) return;
    setSavingSkill(true);
    try {
      const expRange = EXPERIENCE_MAP[pendingExp] || '1-3 years';
      await skillsApi.addSkill({ skillId: pendingSkill.id, experienceRange: expRange });
      const updated = await skillsApi.getCandidateSkills();
      setApiSkills(updated);
      setPendingSkill(null);
      setSkillSearch('');
      setShowAddSkill(false);
    } catch {}
    setSavingSkill(false);
  };

  const handleRemoveSkill = async (candidateSkillId: string) => {
    try {
      await skillsApi.removeSkill(candidateSkillId);
      setApiSkills((prev) => prev.filter((s) => s.id !== candidateSkillId));
    } catch {}
  };

  const handleAddExperience = async () => {
    if (!newExp.company || !newExp.position) return;
    setSavingExp(true);
    try {
      const startDate = newExp.startDate ? (newExp.startDate.length === 7 ? `${newExp.startDate}-01` : newExp.startDate) : new Date().toISOString().slice(0, 10);
      const endDate = newExp.isCurrent ? undefined : newExp.endDate ? (newExp.endDate.length === 7 ? `${newExp.endDate}-01` : newExp.endDate) : undefined;
      await candidateApi.addExperience({ company: newExp.company, position: newExp.position, startDate, endDate, isCurrent: newExp.isCurrent });
      const updated = await candidateApi.getExperiences();
      setApiExperiences(updated);
      setNewExp({ company: '', position: '', startDate: '', endDate: '', isCurrent: false });
      setShowAddExperience(false);
    } catch {}
    setSavingExp(false);
  };

  const handleDeleteExperience = async (id: string) => {
    try {
      await candidateApi.deleteExperience(id);
      setApiExperiences((prev) => prev.filter((e) => e.id !== id));
    } catch {}
  };

  const handleAddProject = async () => {
    if (!newProject.title) return;
    setSavingProject(true);
    try {
      await candidateApi.addProject({ title: newProject.title, description: newProject.description || undefined, link: newProject.link || undefined });
      const updated = await candidateApi.getProjects();
      setApiProjects(updated);
      setNewProject({ title: '', description: '', link: '' });
      setShowAddProject(false);
    } catch {}
    setSavingProject(false);
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await candidateApi.deleteProject(id);
      setApiProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {}
  };

  const displayName = profile?.fullName || 'Sofía Martínez';
  const displayInitials = displayName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const displayRole = profile?.currentRole || 'Senior Backend Engineer';
  const displayLocation = profile?.location || 'Buenos Aires';
  const displayCompletion = profile?.profileCompletion ?? 85;
  const displayVerified = profile?.identityVerified ?? true;

  const techSkillsFromApi = apiSkills.filter((s) => s.skillType === 'TECH').map(mapApiSkill);
  const softSkillsFromApi = apiSkills.filter((s) => s.skillType === 'SOFT').map(mapApiSkill);
  const displayedTechSkills = techSkillsFromApi.length > 0 ? techSkillsFromApi : techSkills;
  const displayedSoftSkills = softSkillsFromApi.length > 0 ? softSkillsFromApi : softSkills;
  const hasApiSkills = apiSkills.length > 0;

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
                {displayInitials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="text-xl font-semibold">{displayName}</h2>
                  {displayVerified && (
                    <span className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: '#EAF3DE', color: '#27500A' }}>
                      <Shield className="w-3 h-3" />
                      Identidad verificada
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--sp-gray-medium)] mb-3">{displayRole} · {displayLocation}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--sp-violet)]" style={{ width: `${displayCompletion}%` }} />
                  </div>
                  <span className="text-xs font-medium text-[var(--sp-gray-medium)]">{displayCompletion}% completo</span>
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddSkill(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[var(--sp-violet)] bg-[var(--sp-violet-light)] rounded-xl hover:bg-[#DDDCFD] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agregar
                </button>
                <Button onClick={() => navigate('/candidate/request-validation')} variant="secondary">
                  Solicitar validación
                </Button>
              </div>
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

            <p className="text-xs font-medium text-[var(--sp-gray-medium)] uppercase tracking-wide mb-1">Técnicas</p>
            <div className="divide-y divide-gray-100">
              {displayedTechSkills.map((s) => (
                <div key={s.name} className="flex items-center gap-1">
                  <div className="flex-1 min-w-0">
                    <ProfileSkillRow name={s.name} level={s.level} type={s.type} score={s.score} validationCount={s.validationCount} quote={s.quote} quotedBy={s.quotedBy} onDetail={() => setSelectedSkill(s)} />
                  </div>
                  {hasApiSkills && s.id && (
                    <button onClick={() => handleRemoveSkill(s.id!)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0" title="Eliminar habilidad">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="my-4 border-t border-gray-100" />

            <p className="text-xs font-medium text-[var(--sp-gray-medium)] uppercase tracking-wide mb-1">Habilidades blandas</p>
            <div className="divide-y divide-gray-100">
              {displayedSoftSkills.map((s) => (
                <div key={s.name} className="flex items-center gap-1">
                  <div className="flex-1 min-w-0">
                    <ProfileSkillRow name={s.name} level={s.level} type={s.type} score={s.score} validationCount={s.validationCount} quote={s.quote} quotedBy={s.quotedBy} onDetail={() => setSelectedSkill(s)} />
                  </div>
                  {hasApiSkills && s.id && (
                    <button onClick={() => handleRemoveSkill(s.id!)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0" title="Eliminar habilidad">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Validators */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <h3 className="font-semibold mb-4">Mis validadores</h3>
            <div className="divide-y divide-gray-100">
              {validators.map((v) => (
                <button key={v.name} onClick={() => setSelectedValidator(v)} className="w-full flex items-center gap-3 py-3.5 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2 text-left">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{ background: `linear-gradient(135deg, ${v.gradientFrom}, ${v.gradientTo})` }}>
                    {v.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{v.name}</p>
                    <p className="text-xs text-[var(--sp-gray-medium)]">{v.role} · {v.company}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#EEEDFE', color: '#3C3489' }}>
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Experiencia</h3>
              <button
                onClick={() => setShowAddExperience(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[var(--sp-violet)] bg-[var(--sp-violet-light)] rounded-xl hover:bg-[#DDDCFD] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {(apiExperiences.length > 0
                ? apiExperiences.map((exp) => ({
                    id: exp.id,
                    title: exp.position,
                    company: exp.company,
                    period: formatPeriod(exp.startDate, exp.endDate, exp.isCurrent),
                    description: exp.description || '',
                    fromApi: true,
                  }))
                : fallbackExperience.map((exp) => ({ ...exp, id: '', fromApi: false }))
              ).map((exp, i, arr) => (
                <div key={exp.title + exp.company + i} className={`flex gap-4 items-start ${i > 0 ? 'pt-4' : ''} ${i < arr.length - 1 ? 'pb-4' : ''}`}>
                  <div className="w-9 h-9 bg-[var(--sp-gray-light)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-4 h-4 text-[var(--sp-gray-medium)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-0.5">{exp.title}</h4>
                    <p className="text-xs text-[var(--sp-gray-medium)]">{exp.company} · {exp.period}</p>
                    {exp.description && <p className="text-sm text-[var(--sp-gray-medium)] mt-1">{exp.description}</p>}
                  </div>
                  {exp.fromApi && exp.id && (
                    <button onClick={() => handleDeleteExperience(exp.id)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0" title="Eliminar experiencia">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-[var(--sp-violet)]" />
                <h3 className="font-semibold">Proyectos</h3>
              </div>
              <button
                onClick={() => setShowAddProject(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[var(--sp-violet)] bg-[var(--sp-violet-light)] rounded-xl hover:bg-[#DDDCFD] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar
              </button>
            </div>
            {apiProjects.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {apiProjects.map((proj) => (
                  <div key={proj.id} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-[var(--sp-violet-light)] rounded-xl flex items-center justify-center flex-shrink-0">
                        <FolderOpen className="w-4 h-4 text-[var(--sp-violet)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">{proj.title}</h4>
                          {proj.link && (
                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[var(--sp-violet)] hover:text-[var(--sp-violet-dark)]">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                        {proj.description && <p className="text-sm text-[var(--sp-gray-medium)] mt-0.5">{proj.description}</p>}
                      </div>
                      <button onClick={() => handleDeleteProject(proj.id)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0" title="Eliminar proyecto">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--sp-gray-medium)]">No hay proyectos cargados todavía.</p>
            )}
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
        <SkillDetailModal skillName={selectedSkill.name} score={selectedSkill.score} consolidatedLevel={selectedSkill.level} type={selectedSkill.type} validations={selectedSkill.validations} onClose={() => setSelectedSkill(null)} />
      )}

      {/* Validator profile modal */}
      {selectedValidator && (
        <ValidatorModal validator={selectedValidator} onClose={() => setSelectedValidator(null)} />
      )}

      {/* Add skill modal */}
      {showAddSkill && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => { setShowAddSkill(false); setPendingSkill(null); setSkillSearch(''); }}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <h2 className="font-semibold text-lg">Agregar habilidad</h2>
              <button onClick={() => { setShowAddSkill(false); setPendingSkill(null); setSkillSearch(''); }} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {!pendingSkill ? (
                <>
                  <div>
                    <label className="text-sm font-medium text-[var(--sp-gray-dark)] block mb-2">Buscar habilidad</label>
                    <input
                      type="text"
                      placeholder="Ej: React, Java, Product management..."
                      value={skillSearch}
                      onChange={(e) => setSkillSearch(e.target.value)}
                      className="w-full px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] text-sm"
                      autoFocus
                    />
                  </div>
                  {skillSearchResults.length > 0 && (
                    <div className="border border-gray-200 rounded-xl max-h-48 overflow-y-auto">
                      {skillSearchResults
                        .filter((sr) => !apiSkills.some((as) => as.skillId === sr.id))
                        .map((skill) => (
                          <button
                            key={skill.id}
                            onClick={() => setPendingSkill(skill)}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-[var(--sp-violet-light)] transition-all border-b border-gray-100 last:border-b-0"
                          >
                            {skill.name}
                            <span className="text-xs text-gray-400 ml-2">({skill.type === 'TECH' ? 'Técnica' : 'Blanda'})</span>
                          </button>
                        ))}
                    </div>
                  )}
                  {skillSearch && skillSearchResults.length === 0 && (
                    <p className="text-sm text-[var(--sp-gray-medium)] text-center py-4">No se encontraron habilidades</p>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium text-[var(--sp-gray-dark)] block mb-1">Habilidad</label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--sp-violet)]">{pendingSkill.name}</span>
                      <button onClick={() => setPendingSkill(null)} className="text-xs text-[var(--sp-gray-medium)] hover:underline">Cambiar</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[var(--sp-gray-dark)] block mb-2">Experiencia</label>
                    <select
                      value={pendingExp}
                      onChange={(e) => setPendingExp(e.target.value)}
                      className="w-full px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] text-sm"
                    >
                      {EXPERIENCE_OPTIONS.map((exp) => (
                        <option key={exp} value={exp}>{exp}</option>
                      ))}
                    </select>
                  </div>
                  <Button onClick={handleAddSkill} fullWidth disabled={savingSkill}>
                    {savingSkill ? 'Guardando...' : 'Agregar habilidad'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add experience modal */}
      {showAddExperience && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowAddExperience(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <h2 className="font-semibold text-lg">Agregar experiencia</h2>
              <button onClick={() => setShowAddExperience(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-[var(--sp-gray-dark)] block mb-2">Empresa</label>
                <input type="text" placeholder="Ej: Mercado Libre" value={newExp.company} onChange={(e) => setNewExp({ ...newExp, company: e.target.value })} className="w-full px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] text-sm" autoFocus />
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--sp-gray-dark)] block mb-2">Puesto</label>
                <input type="text" placeholder="Ej: Senior Backend Engineer" value={newExp.position} onChange={(e) => setNewExp({ ...newExp, position: e.target.value })} className="w-full px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[var(--sp-gray-dark)] block mb-2">Fecha de inicio</label>
                  <input type="month" value={newExp.startDate} onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })} className="w-full px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--sp-gray-dark)] block mb-2">Fecha de fin</label>
                  <input type="month" value={newExp.endDate} onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })} disabled={newExp.isCurrent} className="w-full px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] text-sm disabled:opacity-50" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 accent-[var(--sp-violet)]" checked={newExp.isCurrent} onChange={(e) => setNewExp({ ...newExp, isCurrent: e.target.checked })} />
                <span className="text-sm">Trabajo aquí actualmente</span>
              </div>
              <Button onClick={handleAddExperience} fullWidth disabled={savingExp || !newExp.company || !newExp.position}>
                {savingExp ? 'Guardando...' : 'Agregar experiencia'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add project modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowAddProject(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <h2 className="font-semibold text-lg">Agregar proyecto</h2>
              <button onClick={() => setShowAddProject(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-[var(--sp-gray-dark)] block mb-2">Título del proyecto</label>
                <input type="text" placeholder="Ej: Sistema de gestión de inventario" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} className="w-full px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] text-sm" autoFocus />
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--sp-gray-dark)] block mb-2">Descripción</label>
                <textarea placeholder="Describí tu rol y responsabilidades en el proyecto..." value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} rows={3} className="w-full px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] resize-none text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--sp-gray-dark)] block mb-2">Link al proyecto</label>
                <input type="text" placeholder="https://..." value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} className="w-full px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] text-sm" />
              </div>
              <Button onClick={handleAddProject} fullWidth disabled={savingProject || !newProject.title}>
                {savingProject ? 'Guardando...' : 'Agregar proyecto'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
