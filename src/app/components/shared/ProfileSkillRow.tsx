import { CheckCircle } from 'lucide-react';
import type { SkillLevel } from './SkillLevelRow';

const LEVEL_INDEX: Record<SkillLevel, number> = {
  'Colaborador': 1,
  'Ejecutor autónomo': 2,
  'Líder': 3,
  'Referente': 4,
};

interface ProfileSkillRowProps {
  name: string;
  level: SkillLevel;
  type: 'tech' | 'soft';
  score: number;
  validationCount: number;
  quote: string;
  quotedBy: string;
  onDetail: () => void;
}

export default function ProfileSkillRow({
  name,
  level,
  type,
  score,
  validationCount,
  quote,
  quotedBy,
  onDetail,
}: ProfileSkillRowProps) {
  const levelNum = LEVEL_INDEX[level];
  const isIntermediate = levelNum <= 2;

  const segmentColor = type === 'tech' ? '#639922' : '#7F77DD';
  const pillBg = isIntermediate ? '#FAEEDA' : type === 'tech' ? '#EAF3DE' : '#EEEDFE';
  const pillText = isIntermediate ? '#633806' : type === 'tech' ? '#27500A' : '#3C3489';

  return (
    <div className="py-4">
      <div className="flex items-start gap-2">
        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: segmentColor }} />
        <div className="flex-1 min-w-0">
          {/* Row 1: name + score + bar + level + detail */}
          <div className="flex items-center justify-between gap-3 mb-1.5 flex-wrap">
            <span className="font-medium text-sm">{name}</span>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-sm font-semibold" style={{ color: segmentColor }}>
                {score.toFixed(1)}
                <span className="text-xs font-normal text-[var(--sp-gray-medium)]"> / 10</span>
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((seg) => (
                  <div
                    key={seg}
                    className="w-5 h-1.5 rounded-full"
                    style={{ backgroundColor: seg <= levelNum ? segmentColor : '#E5E7EB' }}
                  />
                ))}
              </div>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                style={{ backgroundColor: pillBg, color: pillText }}
              >
                {level}
              </span>
              <button
                onClick={onDetail}
                className="text-xs font-medium whitespace-nowrap hover:underline"
                style={{ color: 'var(--sp-violet)' }}
              >
                Ver detalle →
              </button>
            </div>
          </div>
          {/* Row 2: quote + count */}
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs italic text-[var(--sp-gray-medium)] leading-relaxed flex-1">
              "{quote}" — {quotedBy}
            </p>
            <span className="text-xs text-[var(--sp-gray-medium)] whitespace-nowrap flex-shrink-0">
              {validationCount} validaciones de tu red
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
