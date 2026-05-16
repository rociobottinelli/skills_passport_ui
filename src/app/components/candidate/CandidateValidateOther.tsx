import { useState } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { Award, Info } from 'lucide-react';

export default function CandidateValidateOther() {
  const navigate = useNavigate();
  const [score, setScore] = useState(8);
  const [comment, setComment] = useState('Trabajamos juntos 2 años en el equipo de pagos. Sólido en arquitectura y muy buen referente técnico.');

  const calculateWeight = (score: number) => {
    const experienciaFactor = 7 * 0.5; // 3.5
    const historialFactor = 10 * 0.3; // 3.0
    const relacionFactor = 7 * 0.2; // 1.4
    return (experienciaFactor + historialFactor + relacionFactor).toFixed(1);
  };

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
  };

  const handleValidate = () => {
    navigate('/candidate/validations-pending');
  };

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="candidate" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/candidate/validations-pending')}
            className="text-[var(--sp-violet)] hover:underline mb-6"
          >
            ← Volver a validaciones
          </button>

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-1">Validar habilidad</h1>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <Card>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                    JL
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1">Julián López</h2>
                    <p className="text-sm text-[var(--sp-gray-medium)]">Te pidió validar su habilidad en Java</p>
                    <div className="mt-2">
                      <Badge variant="primary" size="sm">
                        Compañero de proyecto
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="font-medium">¿Qué nivel de confianza le asignás?</label>
                    <span className="text-4xl font-bold text-[var(--sp-violet)]">{score} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={score}
                    onChange={(e) => handleScoreChange(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[var(--sp-violet)]"
                  />
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Comentario (opcional)</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => navigate('/candidate/validations-pending')}>
                    Rechazar
                  </Button>
                  <Button onClick={handleValidate} fullWidth>
                    🛡 Validar
                  </Button>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-[var(--sp-violet-light)]">
                <h3 className="font-bold mb-4">Desglose del peso (fórmula transparente)</h3>

                <div className="space-y-3 mb-4">
                  <div className="bg-white rounded-xl p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Tu experiencia en Java (8 años)</span>
                      <span className="font-bold">7 × 0.5 = 3.5</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Tus validaciones previas (52)</span>
                      <span className="font-bold">10 × 0.3 = 3.0</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Relación profesional (proyecto)</span>
                      <span className="font-bold">7 × 0.2 = 1.4</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--sp-violet)] text-white rounded-xl p-4 text-center">
                  <p className="text-sm mb-1">Peso de tu validación</p>
                  <p className="text-4xl font-bold">{calculateWeight(score)} / 10</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
