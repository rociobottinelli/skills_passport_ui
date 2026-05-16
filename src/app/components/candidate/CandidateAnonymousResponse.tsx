import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { AlertCircle, Eye, EyeOff, Heart } from 'lucide-react';

export default function CandidateAnonymousResponse() {
  const navigate = useNavigate();

  const handleRevealProfile = () => {
    navigate('/candidate/profile-revealed');
  };

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="candidate" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/candidate/anonymous-inbox')}
            className="text-[var(--sp-violet)] hover:underline mb-6"
          >
            ← Volver a mensajes
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">Senior Backend Engineer</h1>
              <Badge variant="neutral">Anónimo</Badge>
            </div>
            <p className="text-[var(--sp-gray-medium)]">Lexus</p>
          </div>

          <Card className="mb-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="primary" size="sm" className="bg-[var(--sp-amber)] text-white">
                  💰 Sueldo
                </Badge>
                <span className="text-sm text-[var(--sp-gray-medium)]">Tu pregunta</span>
              </div>
              <div className="bg-[var(--sp-gray-light)] rounded-xl p-4">
                <p>Hola, me interesa mucho la posición. Antes de avanzar, ¿podrían confirmarme si el rango publicado en USD se mantiene para Argentina y si incluye bonos por performance? Gracias.</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium">Respuesta del reclutador</span>
                <span className="text-sm text-[var(--sp-gray-medium)]">Hace 1 día</span>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
                <p className="text-[var(--sp-gray-dark)]">
                  El rango se mantiene para Argentina y pagamos en USD vía contractor. Sumamos bono anual de hasta 2 sueldos por OKRs.
                </p>
              </div>
            </div>
          </Card>

          <Card className="mb-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
            <div className="flex gap-3">
              <AlertCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">¿Te interesa esta posición?</h3>
                <p className="text-sm text-[var(--sp-gray-medium)]">
                  Si te interesa, el reclutador recibirá tus datos de contacto y CV completo para coordinar entrevistas.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleRevealProfile} fullWidth>
              <div className="flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Me interesa</span>
              </div>
            </Button>
            <Button variant="secondary" fullWidth onClick={() => navigate('/candidate/anonymous-inbox')}>
              <div className="flex items-center justify-center gap-2">
                <EyeOff className="w-5 h-5" />
                <span>No me interesa</span>
              </div>
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-[var(--sp-gray-medium)]">
              Al poner "Me interesa" compartís tu perfil completo con el reclutador.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
