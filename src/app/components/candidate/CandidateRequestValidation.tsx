import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { Award, TrendingUp } from 'lucide-react';

const suggestedValidators = [
  { name: 'María García', role: 'Senior Backend Developer', company: 'Mercado Libre', confidence: 9.2 },
  { name: 'Diego Fernández', role: 'Tech Lead', company: 'Globant', confidence: 8.8 },
  { name: 'Laura Gómez', role: 'Backend Engineer', company: 'Despegar', confidence: 8.5 },
];

export default function CandidateRequestValidation() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="candidate" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/candidate/profile')}
            className="text-[var(--sp-violet)] hover:underline mb-6"
          >
            ← Volver al perfil
          </button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Solicitar validación</h1>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-[var(--sp-gray-medium)]">Habilidad seleccionada:</span>
              <Badge variant="primary">React</Badge>
            </div>
          </div>

          <Card className="mb-6">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 mb-6">
              <h3 className="font-bold mb-2">💡 Consejo</h3>
              <p className="text-sm text-[var(--sp-gray-medium)]">
                Pedile validación a personas que trabajaron con vos y pueden dar fe de tus habilidades.
              </p>
            </div>
          </Card>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Validadores sugeridos</h2>
            <p className="text-[var(--sp-gray-medium)] mb-4">
              Usuarios con React validado que podrían conocerte
            </p>
          </div>

          <div className="space-y-4">
            {suggestedValidators.map((validator) => (
              <Card key={validator.name} hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {validator.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{validator.name}</h3>
                      <p className="text-sm text-[var(--sp-gray-medium)] mb-1">{validator.role}</p>
                      <p className="text-sm text-[var(--sp-gray-medium)]">{validator.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-[var(--sp-match-green)]" />
                        <span className="text-lg font-bold text-[var(--sp-match-green)]">
                          {validator.confidence}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--sp-gray-medium)]">Confianza en React</p>
                    </div>
                    <Button onClick={() => navigate('/candidate/specify-relation')}>
                      Solicitar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
