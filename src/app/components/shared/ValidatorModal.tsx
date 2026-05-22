import { X, Shield, CheckCircle, Star } from 'lucide-react';

export type ReputationLevel = 'Bronce' | 'Plata' | 'Oro' | 'Platino';

export interface ValidatorData {
  name: string;
  initials: string;
  role: string;
  company: string;
  reputation: ReputationLevel;
  years: number;
  validations: number;
  successRate: number;
  seniority: string;
  companyPartner: boolean;
  identityVerified: boolean;
  gradientFrom: string;
  gradientTo: string;
  validatedSkill?: string;
  validatedLevel?: string;
}

const REPUTATION_COLORS: Record<ReputationLevel, string> = {
  Bronce: '#A0623A',
  Plata: '#8B95A1',
  Oro: '#C9A227',
  Platino: '#5B5BF5',
};

const REPUTATION_WEIGHTS: Record<ReputationLevel, string> = {
  Bronce: 'Bajo',
  Plata: 'Medio',
  Oro: 'Alto',
  Platino: 'Muy alto',
};

interface ValidatorModalProps {
  validator: ValidatorData;
  onClose: () => void;
}

export default function ValidatorModal({ validator, onClose }: ValidatorModalProps) {
  const repColor = REPUTATION_COLORS[validator.reputation];
  const weight = REPUTATION_WEIGHTS[validator.reputation];

  const factors = [
    { label: `Antigüedad en plataforma: ${validator.years} años`, ok: true },
    { label: `Validaciones realizadas: ${validator.validations}`, ok: true },
    { label: `Tasa de acierto (candidatos contratados): ${validator.successRate}%`, ok: validator.successRate >= 70 },
    { label: `Seniority verificado: ${validator.seniority}`, ok: true },
    { label: `Empresa partner verificada: ${validator.company}`, ok: validator.companyPartner },
    { label: 'Identidad verificada (RENAPER)', ok: validator.identityVerified },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-end z-50"
      onClick={onClose}
    >
      <div
        className="bg-white h-full w-full max-w-sm overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <p className="text-xs font-medium text-[var(--sp-gray-medium)] uppercase tracking-wide">
            Perfil del validador
          </p>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Identity */}
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${validator.gradientFrom}, ${validator.gradientTo})`,
              }}
            >
              {validator.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <h3 className="font-semibold">{validator.name}</h3>
                {validator.identityVerified && (
                  <span
                    className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#EAF3DE', color: '#27500A' }}
                  >
                    <Shield className="w-3 h-3" />
                    Verificado
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--sp-gray-medium)]">
                {validator.role} · {validator.company}
              </p>
              <div
                className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${repColor}18`,
                  border: `1px solid ${repColor}40`,
                }}
              >
                <Star className="w-3.5 h-3.5" style={{ color: repColor, fill: repColor }} />
                <span className="text-sm font-semibold" style={{ color: repColor }}>
                  Validador {validator.reputation}
                </span>
              </div>
            </div>
          </div>

          {/* Reputation breakdown */}
          <div>
            <p className="text-xs font-medium text-[var(--sp-gray-medium)] uppercase tracking-wide mb-3">
              Cómo se calcula su reputación
            </p>
            <div className="space-y-2.5">
              {factors.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: f.ok ? '#EAF3DE' : '#F3F4F6' }}
                  >
                    {f.ok ? (
                      <CheckCircle className="w-3.5 h-3.5" style={{ color: '#639922' }} />
                    ) : (
                      <span className="text-xs text-gray-400 leading-none">—</span>
                    )}
                  </div>
                  <span className="text-sm leading-snug">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weight explanation */}
          <div
            className="rounded-xl p-4"
            style={{
              backgroundColor: `${repColor}10`,
              border: `1px solid ${repColor}30`,
            }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: repColor }}>
              Peso de sus validaciones: {weight}
            </p>
            <p className="text-xs text-[var(--sp-gray-medium)] leading-relaxed">
              Como validador {validator.reputation}, sus validaciones tienen mayor impacto en el score del candidato que las de niveles inferiores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
