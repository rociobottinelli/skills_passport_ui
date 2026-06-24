import type { SkillLevel, SkillType, ReputationLevel, Modality, Seniority } from '@/types';
import type { SkillLevel as SkillLevelDisplay } from '@/app/components/shared/SkillLevelRow';
import type { ReputationLevel as ReputationLevelDisplay } from '@/app/components/shared/ValidatorModal';

const SKILL_LEVEL_LABELS: Record<SkillLevel, SkillLevelDisplay> = {
  COLABORADOR: 'Colaborador',
  EJECUTOR_AUTONOMO: 'Ejecutor autónomo',
  LIDER: 'Líder',
  REFERENTE: 'Referente',
};

const SKILL_TYPE_LABELS: Record<SkillType, 'tech' | 'soft'> = {
  TECH: 'tech',
  SOFT: 'soft',
};

const REPUTATION_LABELS: Record<ReputationLevel, ReputationLevelDisplay> = {
  BRONCE: 'Bronce',
  PLATA: 'Plata',
  ORO: 'Oro',
  PLATINO: 'Platino',
};

const REPUTATION_GRADIENTS: Record<ReputationLevel, { from: string; to: string }> = {
  BRONCE: { from: '#A0623A', to: '#7A4A2B' },
  PLATA: { from: '#8B95A1', to: '#6B7580' },
  ORO: { from: '#C9A227', to: '#9A7B1A' },
  PLATINO: { from: '#5B5BF5', to: '#3C3489' },
};

const MODALITY_LABELS: Record<Modality, string> = {
  REMOTE: 'Remoto',
  HYBRID: 'Híbrido',
  ONSITE: 'Presencial',
};

const SENIORITY_LABELS: Record<Seniority, string> = {
  JUNIOR: 'Junior',
  SEMI_SENIOR: 'Semi-Senior',
  SENIOR: 'Senior',
  LEAD: 'Lead',
};

export function skillLevelLabel(level: SkillLevel): SkillLevelDisplay {
  return SKILL_LEVEL_LABELS[level];
}

export function skillTypeLabel(type: SkillType): 'tech' | 'soft' {
  return SKILL_TYPE_LABELS[type];
}

export function reputationLabel(level: ReputationLevel): ReputationLevelDisplay {
  return REPUTATION_LABELS[level];
}

export function reputationGradient(level: ReputationLevel): { from: string; to: string } {
  return REPUTATION_GRADIENTS[level];
}

export function modalityLabel(modality: string): string {
  return MODALITY_LABELS[modality as Modality] || modality;
}

export function seniorityLabel(seniority: string): string {
  return SENIORITY_LABELS[seniority as Seniority] || seniority;
}

export function formatPeriod(startDate: string, endDate: string | null, isCurrent: boolean): string {
  const startYear = new Date(startDate).getFullYear();
  if (isCurrent || !endDate) {
    return `${startYear} - Presente`;
  }
  const endYear = new Date(endDate).getFullYear();
  return `${startYear} - ${endYear}`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
