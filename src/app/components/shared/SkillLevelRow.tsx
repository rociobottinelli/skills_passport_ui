import { CheckCircle } from 'lucide-react';

export type SkillLevel = 'Colaborador' | 'Ejecutor autónomo' | 'Líder' | 'Referente';

const LEVEL_INDEX: Record<SkillLevel, number> = {
  'Colaborador': 1,
  'Ejecutor autónomo': 2,
  'Líder': 3,
  'Referente': 4,
};

interface SkillLevelRowProps {
  name: string;
  level: SkillLevel;
  type: 'tech' | 'soft';
  quote: string;
  quotedBy: string;
}

export default function SkillLevelRow({ name, level, type, quote, quotedBy }: SkillLevelRowProps) {
  const levelNum = LEVEL_INDEX[level];
  const isIntermediate = levelNum <= 2;

  const segmentColor = type === 'tech' ? '#639922' : '#7F77DD';
  const pillBg = isIntermediate ? '#FAEEDA' : (type === 'tech' ? '#EAF3DE' : '#EEEDFE');
  const pillText = isIntermediate ? '#633806' : (type === 'tech' ? '#27500A' : '#3C3489');

  return (
    <div className="py-3.5">
      <div className="flex items-center justify-between gap-4 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: segmentColor }} />
          <span className="font-medium text-sm truncate">{name}</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((seg) => (
              <div
                key={seg}
                className="w-6 h-1.5 rounded-full"
                style={{ backgroundColor: seg <= levelNum ? segmentColor : '#E5E7EB' }}
              />
            ))}
          </div>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{ backgroundColor: pillBg, color: pillText }}
          >
            {level}
          </span>
        </div>
      </div>
      <p className="text-xs italic text-[var(--sp-gray-medium)] ml-6 leading-relaxed">
        "{quote}" — {quotedBy}
      </p>
    </div>
  );
}
