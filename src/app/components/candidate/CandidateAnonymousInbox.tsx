import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { MessageSquare, CheckCircle } from 'lucide-react';
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

const THREAD_COLORS = [
  { color: 'from-slate-100 to-slate-200', text: 'text-slate-700' },
  { color: 'from-amber-100 to-amber-200', text: 'text-amber-700' },
  { color: 'from-pink-100 to-pink-200', text: 'text-pink-600' },
];

export default function CandidateAnonymousInbox() {
  const navigate = useNavigate();
  const [threads, setThreads] = useState<AnonymousThreadResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    messagesApi.getCandidateThreads()
      .then(setThreads)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="candidate" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Mis Mensajes</h1>
            <p className="text-[var(--sp-gray-medium)]">
              Consultas anónimas con reclutadores
            </p>
          </div>

          {loading ? (
            <p className="text-center text-[var(--sp-gray-medium)] py-12">Cargando mensajes...</p>
          ) : (
            <div className="space-y-4">
              {threads.map((thread, i) => {
                const style = THREAD_COLORS[i % THREAD_COLORS.length];
                return (
                  <Card
                    key={thread.id}
                    hover
                    onClick={() => navigate(`/candidate/anonymous/${thread.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${style.color} rounded-xl flex items-center justify-center ${style.text} font-bold text-lg`}>
                          <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{thread.anonymousCode}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="primary" size="sm">
                              {CATEGORY_LABELS[thread.category] || thread.category}
                            </Badge>
                            {thread.status === 'RESPONDED' && (
                              <div className="flex items-center gap-1 text-green-600 text-sm">
                                <CheckCircle className="w-4 h-4" />
                                <span>Respondida</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm text-[var(--sp-gray-medium)]">
                          {new Date(thread.createdAt).toLocaleDateString('es-AR')}
                        </span>
                        <MessageSquare className="w-5 h-5 text-[var(--sp-gray-medium)]" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {!loading && threads.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-10 h-10 text-[var(--sp-gray-medium)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">No tenés mensajes aún</h3>
              <p className="text-[var(--sp-gray-medium)]">
                Empezá consultando ofertas de forma anónima desde tus matches
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
