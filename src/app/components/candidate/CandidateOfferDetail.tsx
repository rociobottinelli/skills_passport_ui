import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import MatchScore from '../shared/MatchScore';
import { Heart, MessageSquare, Check, X } from 'lucide-react';
import * as matchesApi from '../../../api/matches';
import * as messagesApi from '../../../api/messages';
import type { MatchDetailResponse, ThreadCategory } from '@/types';

const CATEGORY_MAP: Record<string, ThreadCategory> = {
  Sueldo: 'SALARY',
  Cultura: 'CULTURE',
  Stack: 'STACK',
  Beneficios: 'BENEFITS',
  Modalidad: 'MODALITY',
  Otro: 'OTHER',
};

export default function CandidateOfferDetail() {
  const navigate = useNavigate();
  const { id: offerId } = useParams<{ id: string }>();
  const [showAnonymousModal, setShowAnonymousModal] = useState(false);
  const [questionCategory, setQuestionCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [matchDetail, setMatchDetail] = useState<MatchDetailResponse | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (offerId) {
      matchesApi.getMatchDetail(offerId).then(setMatchDetail).catch(() => {});
    }
  }, [offerId]);

  const matchingSkills = matchDetail?.matchingSkills ?? [];
  const missingSkills = matchDetail?.missingSkills ?? [];

  const formatExperience = (range: string) => {
    const labels: Record<string, string> = {
      '<1 year': '<1 año',
      '1-3 years': '1-3 años',
      '4-6 years': '4-6 años',
      '7-10 years': '7-10 años',
      '10+ years': '+10 años',
    };
    return labels[range] || range;
  };

  const formatRequirement = (requirement: string) =>
    requirement === 'DESIRABLE' ? 'deseable' : 'requerida';

  const handleSendQuestion = async () => {
    if (!offerId || !question || !questionCategory) return;
    setSending(true);
    try {
      await messagesApi.createThread({
        offerId,
        category: CATEGORY_MAP[questionCategory] || 'OTHER',
        message: question,
      });
      setShowAnonymousModal(false);
      navigate('/candidate/anonymous-inbox');
    } catch {
      // stay on modal
    } finally {
      setSending(false);
    }
  };

  const handleInterest = async () => {
    if (!offerId) return;
    const revealState = {
      offerId,
      offerTitle: matchDetail?.offerTitle,
      companyName: matchDetail?.companyName,
    };
    try {
      await matchesApi.markInterest(offerId);
      navigate('/candidate/profile-revealed', { state: revealState });
    } catch {
      navigate('/candidate/profile-revealed', { state: revealState });
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="candidate" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/candidate/matches')}
            className="text-[var(--sp-violet)] hover:underline mb-6"
          >
            ← Volver a matches
          </button>

          <Card className="mb-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-slate-700 font-bold text-3xl">
                  LX
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{matchDetail?.offerTitle || 'Senior Backend Engineer'}</h1>
                  <p className="text-xl text-[var(--sp-gray-medium)] mb-3">{matchDetail?.companyName || 'Empresa'}</p>
                  <div className="flex gap-2">
                    <Badge variant="neutral">USD 4.500 - 6.000</Badge>
                    <Badge variant="neutral">Senior</Badge>
                  </div>
                </div>
              </div>
              <MatchScore score={matchDetail?.matchScore ?? 94} size="lg" />
            </div>

            <div className="flex gap-3">
              <Button fullWidth onClick={handleInterest}>
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span>Me interesa</span>
                </div>
              </Button>
              <Button variant="secondary" fullWidth onClick={() => setShowAnonymousModal(true)}>
                <div className="flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Consultar (Anónimo)</span>
                </div>
              </Button>
            </div>
          </Card>

          <Card className="mb-6 border-2 border-[var(--sp-violet)]">
            <h3 className="text-2xl font-bold mb-6">Por qué es un match</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-4 flex items-center gap-2 text-[var(--sp-match-green-text)]">
                  <Check className="w-5 h-5" />
                  Habilidades que coinciden ({matchingSkills.length})
                </h4>
                <div className="space-y-2">
                  {matchingSkills.length === 0 && (
                    <p className="text-sm text-[var(--sp-gray-medium)]">No hay coincidencias todavía.</p>
                  )}
                  {matchingSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-3 bg-[var(--sp-match-green-bg)] rounded-xl"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[var(--sp-match-green-text)]" />
                        <span className="font-medium text-[var(--sp-match-green-text)]">{skill.name}</span>
                      </div>
                      <span className="text-sm text-[var(--sp-match-green-text)]">
                        {formatExperience(skill.experienceRange)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4 flex items-center gap-2 text-[var(--sp-alert-coral-text)]">
                  <X className="w-5 h-5" />
                  Habilidades que faltan ({missingSkills.length})
                </h4>
                <div className="space-y-2">
                  {missingSkills.length === 0 && (
                    <p className="text-sm text-[var(--sp-gray-medium)]">Tenés todas las habilidades del puesto.</p>
                  )}
                  {missingSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 bg-[var(--sp-alert-coral-bg)] rounded-xl"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <X className="w-4 h-4 text-[var(--sp-alert-coral-text)]" />
                        <span className="font-medium text-[var(--sp-alert-coral-text)]">
                          {skill.name} · {formatRequirement(skill.requirement)}
                        </span>
                      </div>
                      <p className="text-xs italic text-[var(--sp-alert-coral-text)] ml-6">
                        Tip: solicitá una validación a un colega que la maneje.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Sobre la posición</h3>
            <p className="text-[var(--sp-gray-medium)]">
              {matchDetail?.description || 'Sin descripción disponible.'}
            </p>
          </Card>
        </div>
      </div>

      {showAnonymousModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
          <Card className="max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">Solicitar información anónima</h2>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
              <p className="text-sm">
                <strong>Tu identidad permanecerá oculta.</strong> El reclutador solo verá tu Match
                Score y validaciones de la red.
              </p>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Categoría de duda</label>
              <div className="grid grid-cols-3 gap-2">
                {['Sueldo', 'Cultura', 'Stack', 'Beneficios', 'Modalidad', 'Otro'].map(
                  (category) => (
                    <button
                      key={category}
                      onClick={() => setQuestionCategory(category)}
                      className={`py-2 px-4 rounded-xl border-2 transition-all ${
                        questionCategory === category
                          ? 'border-[var(--sp-violet)] bg-[#E8E7FE]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {category}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Tu pregunta</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Escribí tu pregunta..."
                rows={4}
                className="w-full px-4 py-3 bg-[var(--sp-gray-light)] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--sp-violet)] resize-none"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSendQuestion} fullWidth disabled={!question || !questionCategory || sending}>
                Enviar de forma anónima
              </Button>
              <Button variant="secondary" onClick={() => setShowAnonymousModal(false)}>
                Cancelar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
