import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { MessageSquare, CheckCircle } from 'lucide-react';

const threads = [
  {
    id: 1,
    company: 'Lexus',
    position: 'Senior Backend Engineer',
    category: 'Sueldo',
    hasResponse: true,
    date: 'Hace 1 día',
    logo: 'LX',
    logoColor: 'from-slate-100 to-slate-200',
    logoText: 'text-slate-700',
  },
  {
    id: 2,
    company: 'Globant',
    position: 'Backend Tech Lead',
    category: 'Cultura',
    hasResponse: true,
    date: 'Hace 3 días',
    logo: 'GL',
    logoColor: 'from-[var(--sp-amber-bg)] to-amber-100',
    logoText: 'text-[var(--sp-amber)]',
  },
  {
    id: 3,
    company: 'Despegar',
    position: 'Senior Software Engineer',
    category: 'Stack',
    hasResponse: false,
    date: 'Hace 5 días',
    logo: 'DP',
    logoColor: 'from-pink-100 to-pink-200',
    logoText: 'text-pink-600',
  },
];

export default function CandidateAnonymousInbox() {
  const navigate = useNavigate();

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

          <div className="space-y-4">
            {threads.map((thread) => (
              <Card
                key={thread.id}
                hover
                onClick={() => navigate(`/candidate/anonymous/${thread.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${thread.logoColor} rounded-xl flex items-center justify-center ${thread.logoText} font-bold text-lg`}>
                      {thread.logo}
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{thread.position}</h3>
                      <p className="text-sm text-[var(--sp-gray-medium)] mb-2">{thread.company}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="primary" size="sm">
                          {thread.category}
                        </Badge>
                        {thread.hasResponse && (
                          <div className="flex items-center gap-1 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Respondida</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-[var(--sp-gray-medium)]">{thread.date}</span>
                    <MessageSquare className="w-5 h-5 text-[var(--sp-gray-medium)]" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {threads.length === 0 && (
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
