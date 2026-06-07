import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { AlertCircle, Eye, EyeOff, Heart } from 'lucide-react';
import * as messagesApi from '../../../api/messages';
import * as matchesApi from '../../../api/matches';
import type { AnonymousThreadDetailResponse } from '../../../types';

const CATEGORY_LABELS: Record<string, string> = {
  SALARY: 'Sueldo',
  CULTURE: 'Cultura',
  STACK: 'Stack',
  BENEFITS: 'Beneficios',
  MODALITY: 'Modalidad',
  OTHER: 'Otro',
};

export default function CandidateAnonymousResponse() {
  const navigate = useNavigate();
  const { id: threadId } = useParams<{ id: string }>();
  const [thread, setThread] = useState<AnonymousThreadDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [revealing, setRevealing] = useState(false);

  useEffect(() => {
    if (threadId) {
      messagesApi.getCandidateThread(threadId)
        .then(setThread)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [threadId]);

  const candidateMessage = thread?.messages.find((m) => m.senderType === 'CANDIDATE');
  const recruiterMessage = thread?.messages.find((m) => m.senderType === 'RECRUITER');
  const category = CATEGORY_LABELS[thread?.category || ''] || thread?.category || '';

  const handleRevealProfile = async () => {
    if (!thread?.offerId) {
      navigate('/candidate/profile-revealed');
      return;
    }
    setRevealing(true);
    try {
      await matchesApi.markInterest(thread.offerId);
      navigate('/candidate/profile-revealed');
    } catch {
      navigate('/candidate/profile-revealed');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
        <Sidebar type="candidate" />
        <div className="flex-1 ml-64 p-8 flex items-center justify-center">
          <p className="text-[var(--sp-gray-medium)]">Cargando...</p>
        </div>
      </div>
    );
  }

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
              <h1 className="text-4xl font-bold">{thread?.offerTitle || 'Oferta'}</h1>
              <Badge variant="neutral">Anónimo</Badge>
            </div>
            <p className="text-[var(--sp-gray-medium)]">{thread?.companyName || 'Empresa'}</p>
          </div>

          <Card className="mb-6">
            {candidateMessage && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  {category && (
                    <Badge variant="primary" size="sm" className="bg-[var(--sp-amber)] text-white">
                      {category}
                    </Badge>
                  )}
                  <span className="text-sm text-[var(--sp-gray-medium)]">Tu pregunta</span>
                </div>
                <div className="bg-[var(--sp-gray-light)] rounded-xl p-4">
                  <p>{candidateMessage.content}</p>
                </div>
              </div>
            )}

            {recruiterMessage && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium">Respuesta del reclutador</span>
                  <span className="text-sm text-[var(--sp-gray-medium)]">
                    {new Date(recruiterMessage.createdAt).toLocaleDateString('es-AR')}
                  </span>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
                  <p className="text-[var(--sp-gray-dark)]">{recruiterMessage.content}</p>
                </div>
              </div>
            )}

            {!recruiterMessage && thread?.status === 'PENDING' && (
              <div className="text-center py-6">
                <p className="text-[var(--sp-gray-medium)]">Esperando respuesta del reclutador...</p>
              </div>
            )}
          </Card>

          {recruiterMessage && (
            <>
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
                <Button onClick={handleRevealProfile} fullWidth disabled={revealing}>
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    <span>{revealing ? 'Revelando...' : 'Me interesa'}</span>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
