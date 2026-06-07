import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Badge from '../shared/Badge';
import { Shield, CheckCircle } from 'lucide-react';
import * as validationsApi from '../../../api/validations';
import type { SkillLevel as ApiSkillLevel } from '../../../types';

type SkillLevel = 'Colaborador' | 'Ejecutor autónomo' | 'Líder' | 'Referente';

const LEVELS: { value: SkillLevel; description: string }[] = [
  { value: 'Colaborador', description: 'Trabajó con esto en tareas asignadas' },
  { value: 'Ejecutor autónomo', description: 'Lo resolvió de forma independiente' },
  { value: 'Líder', description: 'Lideró iniciativas con esta habilidad' },
  { value: 'Referente', description: 'Es referente y forma a otros' },
];

const LEVEL_MAP: Record<SkillLevel, ApiSkillLevel> = {
  'Colaborador': 'COLABORADOR',
  'Ejecutor autónomo': 'EJECUTOR_AUTONOMO',
  'Líder': 'LIDER',
  'Referente': 'REFERENTE',
};

const WEIGHT_BY_REPUTATION: Record<string, string> = {
  Platino: 'Muy alto',
  Oro: 'Alto',
  Plata: 'Medio',
  Bronce: 'Bajo',
};

export default function CandidateValidateOther() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { requestId?: string; skillName?: string; requesterName?: string } | null;
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel | null>(null);
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);

  const requestId = state?.requestId;
  const skillName = state?.skillName || 'Java';
  const requesterName = state?.requesterName || 'Julián López';
  const requesterInitials = requesterName.split(' ').map((n) => n[0]).join('').slice(0, 2);

  const handleValidate = async () => {
    if (!selectedLevel || !requestId) {
      navigate('/candidate/validations-pending');
      return;
    }
    setSaving(true);
    try {
      await validationsApi.submitValidation({
        requestId,
        assignedLevel: LEVEL_MAP[selectedLevel],
        comment: comment || undefined,
      });
      navigate('/candidate/validations-pending');
    } catch {
      navigate('/candidate/validations-pending');
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    if (!requestId) {
      navigate('/candidate/validations-pending');
      return;
    }
    try {
      await validationsApi.rejectValidationRequest(requestId);
    } catch {
      // continue
    }
    navigate('/candidate/validations-pending');
  };

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="candidate" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/candidate/validations-pending')}
            className="text-sm text-[var(--sp-violet)] hover:underline mb-6"
          >
            ← Volver a validaciones
          </button>

          <h1 className="text-2xl font-semibold mb-6">Validar habilidad</h1>

          {/* Who is being validated */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                {requesterInitials}
              </div>
              <div>
                <h2 className="font-semibold mb-0.5">{requesterName}</h2>
                <p className="text-sm text-[var(--sp-gray-medium)] mb-1">
                  Te pidió validar su habilidad en <span className="font-medium text-[var(--sp-gray-dark)]">{skillName}</span>
                </p>
                <Badge variant="primary" size="sm">
                  Compañero de proyecto
                </Badge>
              </div>
            </div>
          </div>

          {/* Level selector */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <h3 className="font-medium mb-1">¿Qué nivel describís mejor su desempeño en {skillName}?</h3>
            <p className="text-xs text-[var(--sp-gray-medium)] mb-4">
              Elegí el nivel que mejor representa lo que viste trabajar juntos.
            </p>

            <div className="space-y-2">
              {LEVELS.map((lvl) => {
                const isSelected = selectedLevel === lvl.value;
                return (
                  <button
                    key={lvl.value}
                    onClick={() => setSelectedLevel(lvl.value)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left"
                    style={{
                      borderColor: isSelected ? 'var(--sp-violet)' : '#E5E7EB',
                      backgroundColor: isSelected ? '#EEEDFE' : 'transparent',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                      style={{
                        borderColor: isSelected ? 'var(--sp-violet)' : '#D1D5DB',
                        backgroundColor: isSelected ? 'var(--sp-violet)' : 'transparent',
                      }}
                    >
                      {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p
                        className="font-medium text-sm"
                        style={{ color: isSelected ? 'var(--sp-violet-dark)' : 'var(--sp-gray-dark)' }}
                      >
                        {lvl.value}
                      </p>
                      <p className="text-xs text-[var(--sp-gray-medium)]">{lvl.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
            <label className="text-sm font-medium mb-2 block">
              Contá brevemente por qué asignás este nivel <span className="text-[var(--sp-gray-medium)] font-normal">(opcional)</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] resize-none text-sm"
            />
            <p className="text-xs text-[var(--sp-gray-medium)] mt-2 italic">
              Esta frase aparecerá citada en el perfil del candidato al lado de la skill.
            </p>
          </div>

          {/* Validator reputation context */}
          <div
            className="rounded-xl p-4 mb-6 flex items-start gap-3"
            style={{ backgroundColor: '#EEEDFE', border: '1px solid #C7C4F5' }}
          >
            <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--sp-violet-dark)' }} />
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--sp-violet-dark)' }}>
                Tu reputación como validador: Oro — Peso: {WEIGHT_BY_REPUTATION['Oro']}
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#5C5599' }}>
                Como validador Oro, tu valoración tiene mayor impacto en el score del candidato.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleReject}>
              Rechazar
            </Button>
            <Button
              onClick={handleValidate}
              disabled={!selectedLevel || saving}
              fullWidth
            >
              {saving ? 'Validando...' : 'Validar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
