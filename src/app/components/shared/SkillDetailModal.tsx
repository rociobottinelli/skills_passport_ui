import { X, Shield } from 'lucide-react';
import type { SkillLevel } from './SkillLevelRow';
import type { ReputationLevel } from './ValidatorModal';

export interface ValidationDetail {
  name: string;
  initials: string;
  role: string;
  company: string;
  reputation: ReputationLevel;
  identityVerified: boolean;
  gradientFrom: string;
  gradientTo: string;
  assignedLevel: SkillLevel;
  repScore: number;
  expYears: number;
  expPts: number;
  histValidations: number;
  histPts: number;
  relationType: string;
  relationPts: number;
  comment: string;
}

interface SkillDetailModalProps {
  skillName: string;
  score: number;
  consolidatedLevel: SkillLevel;
  type: 'tech' | 'soft';
  validations: ValidationDetail[];
  onClose: () => void;
}

const REPUTATION_COLORS: Record<ReputationLevel, string> = {
  Bronce: '#A0623A',
  Plata: '#8B95A1',
  Oro: '#C9A227',
  Platino: '#5B5BF5',
};

const LEVEL_INDEX: Record<SkillLevel, number> = {
  'Colaborador': 1,
  'Ejecutor autónomo': 2,
  'Líder': 3,
  'Referente': 4,
};

function MiniBar({ pts, max = 10 }: { pts: number; max?: number }) {
  const pct = Math.min((pts / max) * 100, 100);
  return (
    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E5E7EB', minWidth: 60 }}>
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, backgroundColor: '#5B5BF5' }}
      />
    </div>
  );
}

function LevelPill({ level, type }: { level: SkillLevel; type: 'tech' | 'soft' }) {
  const levelNum = LEVEL_INDEX[level];
  const isIntermediate = levelNum <= 2;
  const pillBg = isIntermediate ? '#FAEEDA' : type === 'tech' ? '#EAF3DE' : '#EEEDFE';
  const pillText = isIntermediate ? '#633806' : type === 'tech' ? '#27500A' : '#3C3489';
  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
      style={{ backgroundColor: pillBg, color: pillText }}
    >
      {level}
    </span>
  );
}

export default function SkillDetailModal({
  skillName,
  score,
  consolidatedLevel,
  type,
  validations,
  onClose,
}: SkillDetailModalProps) {
  const segmentColor = type === 'tech' ? '#639922' : '#7F77DD';
  const levelNum = LEVEL_INDEX[consolidatedLevel];

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-xl max-h-[88vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="font-semibold text-lg">{skillName}</h2>
            </div>
            <p className="text-xs text-[var(--sp-gray-medium)]">
              {validations.length} validaciones de tu red
            </p>
          </div>
          <div className="flex items-start gap-4 ml-4 flex-shrink-0">
            <div className="text-right">
              <p className="text-2xl font-bold leading-none" style={{ color: segmentColor }}>
                {score.toFixed(1)}
                <span className="text-sm font-normal text-[var(--sp-gray-medium)]"> / 10</span>
              </p>
              <div className="flex items-center gap-1.5 justify-end mt-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4].map((seg) => (
                    <div
                      key={seg}
                      className="w-4 h-1 rounded-full"
                      style={{ backgroundColor: seg <= levelNum ? segmentColor : '#E5E7EB' }}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium" style={{ color: segmentColor }}>
                  {consolidatedLevel}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Validation list — scrollable */}
        <div className="overflow-y-auto flex-1 px-6 py-2">
          {validations.map((v, i) => {
            const repColor = REPUTATION_COLORS[v.reputation];
            const expResult = (v.expPts * 0.5).toFixed(1);
            const histResult = (v.histPts * 0.3).toFixed(1);
            const relResult = (v.relationPts * 0.2).toFixed(1);

            return (
              <div
                key={v.name}
                className={`py-5 ${i < validations.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                {/* Validator header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${v.gradientFrom}, ${v.gradientTo})`,
                      }}
                    >
                      {v.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-medium text-sm">{v.name}</span>
                        {v.identityVerified && (
                          <span
                            className="flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-full"
                            style={{ backgroundColor: '#EAF3DE', color: '#27500A' }}
                          >
                            <Shield className="w-2.5 h-2.5" />
                            RENAPER
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-[var(--sp-gray-medium)]">
                          {v.role} · {v.company}
                        </span>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${repColor}18`,
                            color: repColor,
                            border: `1px solid ${repColor}30`,
                          }}
                        >
                          Validador {v.reputation}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Assigned level */}
                  <LevelPill level={v.assignedLevel} type={type} />
                </div>

                {/* Reputation score breakdown */}
                <div
                  className="rounded-xl p-4 mb-3"
                  style={{ backgroundColor: '#F8F9FB', border: '1px solid #EBEBEB' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[var(--sp-gray-medium)]">
                      Score de reputación del validador
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--sp-violet-dark)' }}>
                      {v.repScore.toFixed(1)} / 10
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Experiencia */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-20 text-[var(--sp-gray-medium)] flex-shrink-0">Experiencia</span>
                      <span className="text-[var(--sp-gray-dark)] w-24 flex-shrink-0">
                        {v.expYears} años → {v.expPts}pts
                      </span>
                      <MiniBar pts={v.expPts} />
                      <span className="text-[var(--sp-gray-medium)] flex-shrink-0 w-20 text-right">
                        ×50% = {expResult}
                      </span>
                    </div>

                    {/* Historial */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-20 text-[var(--sp-gray-medium)] flex-shrink-0">Historial</span>
                      <span className="text-[var(--sp-gray-dark)] w-24 flex-shrink-0">
                        {v.histValidations} val → {v.histPts}pts
                      </span>
                      <MiniBar pts={v.histPts} />
                      <span className="text-[var(--sp-gray-medium)] flex-shrink-0 w-20 text-right">
                        ×30% = {histResult}
                      </span>
                    </div>

                    {/* Relación */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-20 text-[var(--sp-gray-medium)] flex-shrink-0">Relación</span>
                      <span className="text-[var(--sp-gray-dark)] w-24 flex-shrink-0 truncate">
                        {v.relationType} → {v.relationPts}pts
                      </span>
                      <MiniBar pts={v.relationPts} />
                      <span className="text-[var(--sp-gray-medium)] flex-shrink-0 w-20 text-right">
                        ×20% = {relResult}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Comment with violet left border */}
                <div
                  className="pl-3 py-0.5"
                  style={{ borderLeft: '3px solid var(--sp-violet)' }}
                >
                  <p className="text-sm italic text-[var(--sp-gray-medium)] leading-relaxed">
                    "{v.comment}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
