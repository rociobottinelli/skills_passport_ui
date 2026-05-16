import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { MessageSquare, TrendingUp } from 'lucide-react';

const messages = [
  {
    id: 1,
    anonymousId: '#A-3847',
    category: 'Sueldo',
    matchScore: 95,
    validations: 'Validado por 2 perfiles senior',
    date: 'Hace 2h',
    preview: 'Hola, me interesa mucho la posición. Antes de avanzar, ¿podrían confirmarme si el rango publicado en USD se mantiene para Argentina y si incluye bonos por performance?',
  },
  {
    id: 2,
    anonymousId: '#A-3902',
    category: 'Cultura',
    matchScore: 88,
    validations: '3 validaciones en Java',
    date: '3 días atrás',
    preview: '¿Cómo es el balance trabajo-vida personal en el equipo?',
  },
  {
    id: 3,
    anonymousId: '#A-3715',
    category: 'Stack',
    matchScore: 82,
    validations: '1 perfil Senior',
    date: '5 días atrás',
    preview: '¿Qué frameworks usan para microservicios además de Spring Boot?',
  },
];

export default function RecruiterAnonymousInbox() {
  const navigate = useNavigate();

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

          <div className="space-y-4">
            {messages.map((message) => (
              <Card
                key={message.id}
                hover
                onClick={() => navigate(`/recruiter/anonymous/${message.id}`)}
              >
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                    <MessageSquare className="w-8 h-8 text-white relative z-10" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">Candidato anónimo · {message.anonymousId}</h3>
                      <Badge variant="primary" size="sm" className="bg-[var(--sp-amber)] text-white">
                        💰 {message.category}
                      </Badge>
                    </div>
                    <p className="text-[var(--sp-gray-medium)] mb-3">{message.preview}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="match" size="sm">
                          🎯 {message.matchScore}% match
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="primary" size="sm">
                          🛡 {message.validations}
                        </Badge>
                      </div>
                      <span className="text-[var(--sp-gray-medium)]">⏱ {message.date}</span>
                    </div>
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
