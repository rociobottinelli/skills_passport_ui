import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { Clock } from 'lucide-react';
import * as validationsApi from '../../../api/validations';
import type { ValidationRequestResponse } from '@/types';

export default function CandidateValidationsPending() {
  const navigate = useNavigate();
  const [incomingRequests, setIncomingRequests] = useState<ValidationRequestResponse[]>([]);
  const [sentRequests, setSentRequests] = useState<ValidationRequestResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      validationsApi.getIncomingRequests('PENDING'),
      validationsApi.getSentRequests('PENDING'),
    ])
      .then(([incoming, sent]) => {
        setIncomingRequests(incoming);
        setSentRequests(sent);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
              {incomingRequests.length > 0 && (
                <Badge variant="alert" size="sm">
                  {incomingRequests.length} nueva{incomingRequests.length > 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              {incomingRequests.length === 0 && !loading && (
                <p className="text-sm text-[var(--sp-gray-medium)]">No hay solicitudes entrantes.</p>
              )}
              {incomingRequests.map((request) => (
                <Card key={request.id} hover onClick={() => navigate('/candidate/validate-other', { state: { requestId: request.id, skillName: request.skillName, requesterName: request.requesterName } })}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {request.requesterName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{request.requesterName} te pidió validación</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="primary" size="sm">
                            {request.skillName}
                          </Badge>
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
              {sentRequests.length === 0 && !loading && (
                <p className="text-sm text-[var(--sp-gray-medium)]">No hay validaciones pendientes.</p>
              )}
              {sentRequests.map((item) => (
                <Card key={item.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="pending" size="sm">
                            {item.skillName}
                          </Badge>
                          <span className="text-sm text-[var(--sp-gray-medium)]">pendiente</span>
                        </div>
                        <p className="text-sm text-[var(--sp-gray-medium)]">
                          Esperando respuesta de {item.requesterName}
                        </p>
                      </div>
                    </div>
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
