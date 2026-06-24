import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { MessageSquare, EyeOff } from 'lucide-react';
import * as messagesApi from '../../../api/messages';
import type { AnonymousThreadDetailResponse } from '@/types';

const CATEGORY_LABELS: Record<string, string> = {
  SALARY: 'Sueldo',
  CULTURE: 'Cultura',
  STACK: 'Stack',
  BENEFITS: 'Beneficios',
  MODALITY: 'Modalidad',
  OTHER: 'Otro',
};

export default function RecruiterAnonymousDetail() {
  const navigate = useNavigate();
  const { id: threadId } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as { offerId?: string } | null;
  const offerId = state?.offerId || '';

  const [thread, setThread] = useState<AnonymousThreadDetailResponse | null>(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (offerId && threadId) {
      messagesApi.getOfferThread(offerId, threadId)
        .then((data) => {
          setThread(data);
          const existingResponse = data.messages.find((m) => m.senderType === 'RECRUITER');
          if (existingResponse) setResponse(existingResponse.content);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [offerId, threadId]);

  const candidateMessage = thread?.messages.find((m) => m.senderType === 'CANDIDATE');
  const recruiterMessage = thread?.messages.find((m) => m.senderType === 'RECRUITER');
  const category = CATEGORY_LABELS[thread?.category || ''] || thread?.category || '';

  const handleSend = async () => {
    if (!threadId || !response.trim()) return;
    setSending(true);
    try {
      await messagesApi.sendMessage(threadId, { content: response });
      navigate('/recruiter/anonymous-inbox', { state: { offerId } });
    } catch {
      // stay on page
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="theme-recruiter flex min-h-screen bg-[var(--sp-gray-light)]">
        <Sidebar type="recruiter" />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <p className="text-[var(--sp-gray-medium)]">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-recruiter flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/recruiter/anonymous-inbox', { state: { offerId } })}
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
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                    <MessageSquare className="w-8 h-8 text-white relative z-10" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-1">
                      Candidato anónimo · {thread?.anonymousCode || ''}
                    </h2>
                    <div className="flex gap-2">
                      {category && (
                        <Badge variant="primary" size="sm">
                          {category}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {candidateMessage && (
                  <div className="bg-[var(--sp-amber-bg)] border border-[var(--sp-amber)] rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      {category && (
                        <Badge variant="primary" size="sm" className="bg-[var(--sp-amber)] text-white">
                          {category}
                        </Badge>
                      )}
                    </div>
                    <p className="text-[var(--sp-gray-dark)]">
                      "{candidateMessage.content}"
                    </p>
                  </div>
                )}

                {!recruiterMessage && (
                  <>
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

                    <Button onClick={handleSend} fullWidth className="mt-4" disabled={!response.trim() || sending}>
                      {sending ? 'Enviando...' : 'Enviar respuesta'}
                    </Button>
                  </>
                )}

                {recruiterMessage && (
                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-xl p-6">
                    <p className="text-sm font-medium mb-2">Tu respuesta:</p>
                    <p className="text-[var(--sp-gray-dark)]">{recruiterMessage.content}</p>
                  </div>
                )}
              </Card>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[var(--sp-violet)] to-cyan-800 rounded-2xl p-6 text-white">
                <h4 className="font-bold mb-2">Consejo</h4>
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
