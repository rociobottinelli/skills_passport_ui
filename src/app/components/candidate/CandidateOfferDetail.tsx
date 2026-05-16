import { useState } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import MatchScore from '../shared/MatchScore';
import { MapPin, Briefcase, DollarSign, Heart, MessageSquare, Check, X } from 'lucide-react';

export default function CandidateOfferDetail() {
  const navigate = useNavigate();
  const [showAnonymousModal, setShowAnonymousModal] = useState(false);
  const [questionCategory, setQuestionCategory] = useState('');
  const [question, setQuestion] = useState('');

  const matchingSkills = [
    { name: 'Java', experience: '7 años' },
    { name: 'Spring Boot', experience: '5 años' },
    { name: 'PostgreSQL', experience: '3 años' },
    { name: 'Docker', experience: '2 años' },
    { name: 'REST APIs', experience: '7 años' },
  ];
  const missingSkills = [{ name: 'Apache Kafka', type: 'deseable' }];

  const handleSendQuestion = () => {
    setShowAnonymousModal(false);
    navigate('/candidate/anonymous-inbox');
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
                  <h1 className="text-3xl font-bold mb-2">Senior Backend Engineer</h1>
                  <p className="text-xl text-[var(--sp-gray-medium)] mb-3">Lexus · Remoto · Argentina</p>
                  <div className="flex gap-2">
                    <Badge variant="neutral">USD 4.500 - 6.000</Badge>
                    <Badge variant="neutral">Senior</Badge>
                  </div>
                </div>
              </div>
              <MatchScore score={94} size="lg" />
            </div>

            <div className="flex gap-3">
              <Button fullWidth onClick={() => navigate('/candidate/profile-revealed')}>
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
                  Habilidades que coinciden (5)
                </h4>
                <div className="space-y-2">
                  {matchingSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-3 bg-[var(--sp-match-green-bg)] rounded-xl"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[var(--sp-match-green-text)]" />
                        <span className="font-medium text-[var(--sp-match-green-text)]">{skill.name}</span>
                      </div>
                      <span className="text-sm text-[var(--sp-match-green-text)]">{skill.experience}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4 flex items-center gap-2 text-[var(--sp-alert-coral-text)]">
                  <X className="w-5 h-5" />
                  Habilidades que faltan (1)
                </h4>
                <div className="space-y-2">
                  {missingSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 bg-[var(--sp-alert-coral-bg)] rounded-xl"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <X className="w-4 h-4 text-[var(--sp-alert-coral-text)]" />
                        <span className="font-medium text-[var(--sp-alert-coral-text)]">{skill.name} · {skill.type}</span>
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
              Buscamos un backend senior para liderar el desarrollo de microservicios de pagos. Equipo distribuido, stack moderno, fuerte cultura de mentoría y autonomía técnica.
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
              <Button onClick={handleSendQuestion} fullWidth disabled={!question || !questionCategory}>
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
