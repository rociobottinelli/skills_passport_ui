import { useState } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import MatchScore from '../shared/MatchScore';
import { Filter, MapPin, Heart, Mail, Lock, Unlock } from 'lucide-react';

const candidates = [
  {
    id: 1,
    name: 'Sofía Martínez',
    role: 'Senior Backend',
    location: 'Buenos Aires',
    matchScore: 94,
    skills: ['Java', 'Spring Boot', 'PostgreSQL'],
    interested: true, // "Me interesa" = perfil desbloqueado
    initials: 'SM',
    color: 'from-[var(--sp-violet)] to-[var(--sp-violet-dark)]',
  },
  {
    id: 2,
    name: 'Julián López',
    role: 'Tech Lead',
    location: 'Córdoba',
    matchScore: 87,
    skills: ['Java', 'AWS'],
    missing: ['Kafka'],
    interested: true, // Julián también puso "Me interesa" = desbloqueado
    initials: 'JL',
    color: 'from-[var(--sp-amber)] to-amber-600',
  },
  {
    id: 3,
    name: 'Camila Rodríguez',
    role: 'Backend semi-senior',
    location: 'Rosario',
    matchScore: 76,
    skills: ['Java', 'PostgreSQL'],
    missing: ['AWS'],
    interested: false, // No puso "Me interesa" = perfil bloqueado
    initials: 'CR',
    color: 'from-[var(--sp-alert-coral)] to-red-700',
  },
];

export default function RecruiterTalentList() {
  const navigate = useNavigate();
  const [showInterestedOnly, setShowInterestedOnly] = useState(false);

  const filteredCandidates = showInterestedOnly
    ? candidates.filter((c) => c.interested)
    : candidates;

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Talento Compatible</h1>
            <p className="text-[var(--sp-gray-medium)]">Senior Backend Engineer</p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl hover:bg-gray-50 transition-all">
                <Filter className="w-4 h-4" />
                Filtros
              </button>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInterestedOnly}
                  onChange={(e) => setShowInterestedOnly(e.target.checked)}
                  className="w-4 h-4 accent-[var(--sp-violet)]"
                />
                <span className="text-sm">Solo candidatos que marcaron "Me interesa"</span>
              </label>
            </div>
            <p className="text-sm text-[var(--sp-gray-medium)]">
              {filteredCandidates.length} candidatos
            </p>
          </div>

          <div className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <Card
                key={candidate.id}
                hover
                onClick={() => navigate(`/recruiter/talent/${candidate.id}`)}
                className={candidate.interested ? 'border-2 border-green-300 bg-gradient-to-r from-green-50/50 to-white' : ''}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${candidate.color} rounded-xl flex items-center justify-center text-white font-bold text-xl relative`}>
                    {candidate.initials}
                    {candidate.interested && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Unlock className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">{candidate.name}</h3>
                      {candidate.interested && (
                        <>
                          <Badge variant="match" size="sm" className="flex items-center gap-1">
                            <Heart className="w-3 h-3 fill-current" />
                            Me interesa
                          </Badge>
                          <Badge variant="match" size="sm" className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            Perfil desbloqueado
                          </Badge>
                        </>
                      )}
                      {!candidate.interested && (
                        <Badge variant="neutral" size="sm" className="flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Perfil bloqueado
                        </Badge>
                      )}
                    </div>
                    <p className="text-[var(--sp-gray-medium)]">{candidate.role} · {candidate.location}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex gap-2 flex-wrap max-w-xs">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="validated" size="sm">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.missing && candidate.missing.map((skill) => (
                        <Badge key={skill} variant="alert" size="sm">
                          Falta: {skill}
                        </Badge>
                      ))}
                    </div>

                    <MatchScore score={candidate.matchScore} size="md" />
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
