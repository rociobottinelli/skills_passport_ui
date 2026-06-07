import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { MessageSquare } from 'lucide-react';
import * as messagesApi from '../../../api/messages';
import type { AnonymousThreadResponse } from '../../../types';

const CATEGORY_LABELS: Record<string, string> = {
  SALARY: 'Sueldo',
  CULTURE: 'Cultura',
  STACK: 'Stack',
  BENEFITS: 'Beneficios',
  MODALITY: 'Modalidad',
  OTHER: 'Otro',
};

export default function RecruiterAnonymousInbox() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { offerId?: string } | null;
  const offerId = state?.offerId || '';

  const [threads, setThreads] = useState<AnonymousThreadResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (offerId) {
      messagesApi.getOfferThreads(offerId)
        .then(setThreads)
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [offerId]);

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Consultas Anónimas</h1>
            <p className="text-[var(--sp-gray-medium)]">
              Candidatos potenciales que quieren saber más antes de revelarse
            </p>
          </div>

          {loading ? (
            <p className="text-center text-[var(--sp-gray-medium)] py-12">Cargando consultas...</p>
          ) : threads.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-10 h-10 text-[var(--sp-gray-medium)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">No hay consultas aún</h3>
              <p className="text-[var(--sp-gray-medium)]">
                Los candidatos pueden enviarte preguntas anónimas sobre la oferta
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {threads.map((thread) => (
                <Card
                  key={thread.id}
                  hover
                  onClick={() => navigate(`/recruiter/anonymous/${thread.id}`, { state: { offerId } })}
                >
                  <div className="flex gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                      <MessageSquare className="w-8 h-8 text-white relative z-10" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">Candidato anónimo · {thread.anonymousCode}</h3>
                        <Badge variant="primary" size="sm">
                          {CATEGORY_LABELS[thread.category] || thread.category}
                        </Badge>
                        {thread.status === 'RESPONDED' && (
                          <Badge variant="match" size="sm">Respondida</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-[var(--sp-gray-medium)]">
                          {new Date(thread.createdAt).toLocaleDateString('es-AR')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
