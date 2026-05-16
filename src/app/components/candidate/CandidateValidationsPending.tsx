import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { Clock, CheckCircle } from 'lucide-react';

export default function CandidateValidationsPending() {
  const navigate = useNavigate();

  const pendingValidations = [
    { skill: 'Docker', validator: 'María García', timeAgo: 'Hace 2 días' },
    { skill: 'REST APIs', validator: 'Diego Fernández', timeAgo: 'Hace 5 días' },
  ];

  const incomingRequests = [
    { from: 'Julián López', skill: 'Java', timeAgo: 'Hace 1 día' },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="candidate" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Validaciones</h1>
            <p className="text-[var(--sp-gray-medium)]">
              Gestioná tus solicitudes pendientes y entrantes
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Solicitudes entrantes</h2>
              <Badge variant="alert" size="sm">
                {incomingRequests.length} nueva
              </Badge>
            </div>

            <div className="space-y-4">
              {incomingRequests.map((request, idx) => (
                <Card key={idx} hover onClick={() => navigate('/candidate/validate-other')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        JL
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{request.from} te pidió validación</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="primary" size="sm">
                            {request.skill}
                          </Badge>
                          <span className="text-sm text-[var(--sp-gray-medium)]">{request.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    <Button>Responder</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Validaciones pendientes</h2>
            <div className="space-y-4">
              {pendingValidations.map((item, idx) => (
                <Card key={idx}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="pending" size="sm">
                            {item.skill}
                          </Badge>
                          <span className="text-sm text-[var(--sp-gray-medium)]">pendiente</span>
                        </div>
                        <p className="text-sm text-[var(--sp-gray-medium)]">
                          Esperando respuesta de {item.validator}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-[var(--sp-gray-medium)]">{item.timeAgo}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
