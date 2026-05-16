import { useState } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import MatchScore from '../shared/MatchScore';
import { MessageSquare, Award, TrendingUp, EyeOff } from 'lucide-react';

export default function RecruiterAnonymousDetail() {
  const navigate = useNavigate();
  const [response, setResponse] = useState('El rango se mantiene para Argentina y pagamos en USD vía contractor. Sumamos bono anual de hasta 2 sueldos por OKRs.');

  const handleSend = () => {
    navigate('/recruiter/anonymous-inbox');
  };

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/recruiter/anonymous-inbox')}
            className="text-[var(--sp-violet)] hover:underline mb-6"
          >
            ← Volver a consultas
          </button>

          <div className="bg-[var(--sp-violet-light)] border border-[var(--sp-violet)] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-[var(--sp-violet)]" />
              <p className="text-sm text-[var(--sp-violet-dark)]">
                La identidad de este candidato está oculta hasta que decida revelarse.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <Card>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                    <MessageSquare className="w-8 h-8 text-white relative z-10" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">Candidato anónimo · #A-3847</h2>
                    <p className="text-sm text-[var(--sp-gray-medium)] mb-2">Postuló a: Senior Backend Engineer</p>
                    <div className="flex gap-2">
                      <Badge variant="match" size="sm">
                        🎯 95% match
                      </Badge>
                      <Badge variant="primary" size="sm">
                        🛡 Validado por 2 perfiles senior
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--sp-amber-bg)] border border-[var(--sp-amber)] rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="primary" size="sm" className="bg-[var(--sp-amber)] text-white">
                      💰 Sueldo
                    </Badge>
                  </div>
                  <p className="text-[var(--sp-gray-dark)]">
                    "Hola, me interesa mucho la posición. Antes de avanzar, ¿podrían confirmarme si el rango publicado en USD se mantiene para Argentina y si incluye bonos por performance? Gracias."
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tu respuesta</label>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Respondé la consulta del candidato para atraer su interés..."
                    rows={6}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] resize-none"
                  />
                </div>

                <Button onClick={handleSend} fullWidth className="mt-4">
                  Enviar respuesta
                </Button>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-bold mb-4">Indicadores de potencial</h3>

                <div className="space-y-4">
                  <div className="p-4 bg-[var(--sp-gray-light)] rounded-xl">
                    <p className="text-sm text-[var(--sp-gray-medium)] mb-1">Match score</p>
                    <p className="text-3xl font-bold text-[var(--sp-match-green)]">95%</p>
                  </div>

                  <div className="p-4 bg-[var(--sp-gray-light)] rounded-xl">
                    <p className="text-sm text-[var(--sp-gray-medium)] mb-1">Habilidades validadas</p>
                    <p className="text-3xl font-bold">8</p>
                  </div>

                  <div className="p-4 bg-[var(--sp-gray-light)] rounded-xl">
                    <p className="text-sm text-[var(--sp-gray-medium)] mb-1">Confianza promedio</p>
                    <p className="text-3xl font-bold">8.7</p>
                  </div>
                </div>
              </Card>

              <div className="bg-gradient-to-br from-[var(--sp-violet)] to-indigo-600 rounded-2xl p-6 text-white">
                <h4 className="font-bold mb-2">💡 Consejo</h4>
                <p className="text-sm text-white/90 mb-3">
                  Sé transparente y detallado en tu respuesta. Una buena respuesta puede motivar al
                  candidato a marcar "Me interesa".
                </p>
                <div className="bg-white/10 rounded-xl p-3 mt-3">
                  <p className="text-xs text-white/80">
                    <strong>Recordá:</strong> Solo verás los datos de contacto si el candidato marca "Me interesa" en la oferta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
