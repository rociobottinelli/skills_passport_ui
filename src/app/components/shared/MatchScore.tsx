interface MatchScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function MatchScore({ score, size = 'md', showLabel = true }: MatchScoreProps) {
  const sizeStyles = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-3xl',
  };

  const getColor = () => {
    if (score >= 80) return 'text-[var(--sp-match-green)] border-[var(--sp-match-green)]';
    if (score >= 60) return 'text-[var(--sp-violet)] border-[var(--sp-violet)]';
    return 'text-[var(--sp-gray-medium)] border-[var(--sp-gray-medium)]';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizeStyles[size]} ${getColor()} rounded-full border-4 flex items-center justify-center font-bold`}
      >
        {score}%
      </div>
      {showLabel && <span className="text-xs text-[var(--sp-gray-medium)]">Match</span>}
    </div>
  );
}
