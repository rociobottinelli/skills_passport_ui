import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import * as validationsApi from '../../../api/validations';
import type { RelationType } from '@/types';

const relations = [
  { id: 'none', label: 'Sin relación', description: 'No trabajamos juntos' },
  { id: 'classmate', label: 'Compañero de estudio', description: 'Estudiamos juntos' },
  { id: 'coworker', label: 'Compañero de trabajo', description: 'Trabajamos en la misma empresa' },
  { id: 'teammate', label: 'Miembro del mismo proyecto', description: 'Colaboramos en proyectos' },
  { id: 'techlead', label: 'Líder técnico', description: 'Fue mi líder técnico' },
  { id: 'manager', label: 'Gerente directo', description: 'Fue mi manager' },
];

const RELATION_MAP: Record<string, RelationType> = {
  none: 'NONE',
  classmate: 'CLASSMATE',
  coworker: 'COWORKER',
  teammate: 'TEAMMATE',
  techlead: 'TECHLEAD',
  manager: 'MANAGER',
};

export default function CandidateSpecifyRelation() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { skillId?: string; skillName?: string; validatorId?: string; validatorName?: string } | null;
  const skillId = state?.skillId || '';
  const skillName = state?.skillName || 'Java';
  const validatorId = state?.validatorId || '';
  const validatorName = state?.validatorName || 'María García';

  const [selectedRelation, setSelectedRelation] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!selectedRelation || !skillId || !validatorId) {
      navigate('/candidate/validations-pending');
      return;
    }
    setSaving(true);
    try {
      await validationsApi.createValidationRequest({
        skillId,
        validatorId,
        relationType: RELATION_MAP[selectedRelation] || 'NONE',
        message: message || undefined,
      });
      navigate('/candidate/validations-pending');
    } catch {
      navigate('/candidate/validations-pending');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="candidate" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/candidate/request-validation', { state: { skillId, skillName } })}
            className="text-[var(--sp-violet)] hover:underline mb-6"
          >
            ← Volver
          </button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Especificá la relación profesional</h1>
            <div className="flex items-center gap-3">
              <span className="text-[var(--sp-gray-medium)]">Solicitando validación de</span>
              <Badge variant="primary">{skillName}</Badge>
              <span className="text-[var(--sp-gray-medium)]">a</span>
              <span className="font-medium">{validatorName}</span>
            </div>
          </div>

          <Card className="mb-6">
            <h3 className="font-medium mb-4">Seleccioná tu relación profesional con {validatorName.split(' ')[0]}</h3>
            <div className="grid gap-3">
              {relations.map((relation) => (
                <button
                  key={relation.id}
                  onClick={() => setSelectedRelation(relation.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedRelation === relation.id
                      ? 'border-[var(--sp-violet)] bg-[#E8E7FE]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium mb-1">{relation.label}</p>
                  <p className="text-sm text-[var(--sp-gray-medium)]">{relation.description}</p>
                </button>
              ))}
            </div>
          </Card>

          <Card className="mb-6">
            <label className="text-sm font-medium mb-2 block">Mensaje opcional</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Agregá un mensaje personal para ${validatorName.split(' ')[0]}...`}
              rows={4}
              className="w-full px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] resize-none"
            />
          </Card>

          <Button onClick={handleSubmit} fullWidth disabled={!selectedRelation || saving}>
            {saving ? 'Enviando...' : 'Enviar solicitud'}
          </Button>
        </div>
      </div>
    </div>
  );
}
