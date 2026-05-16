import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { Award, CheckCircle, Clock, AlertCircle, Briefcase } from 'lucide-react';

export default function CandidateProfile() {
  const navigate = useNavigate();

  const skills = [
    { name: 'Java', status: 'validated', validations: 4 },
    { name: 'Spring Boot', status: 'validated', validations: 3 },
    { name: 'PostgreSQL', status: 'validated', validations: 2 },
    { name: 'Docker', status: 'pending', validations: 0 },
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'validated') return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (status === 'pending') return <Clock className="w-4 h-4 text-yellow-600" />;
    return <AlertCircle className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="candidate" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Mi Perfil</h1>
            <p className="text-[var(--sp-gray-medium)]">Gestioná tu información profesional</p>
          </div>

          <Card className="mb-6">
            <div className="flex gap-6 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[var(--sp-violet)] to-[var(--sp-violet-dark)] rounded-2xl flex items-center justify-center text-white font-bold text-4xl">
                SM
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">Sofía Martínez</h2>
                <p className="text-xl text-[var(--sp-gray-medium)] mb-4">
                  Senior Backend Engineer
                </p>
                <div>
                  <p className="text-sm text-[var(--sp-gray-medium)] mb-2">Completitud del perfil</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--sp-violet)] w-[75%]"></div>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-[var(--sp-violet)]" />
                <h3 className="text-2xl font-bold">Mis habilidades</h3>
              </div>
              <Button onClick={() => navigate('/candidate/request-validation')}>
                Solicitar validación
              </Button>
            </div>

            <div className="space-y-3">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between p-4 bg-[var(--sp-gray-light)] rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(skill.status)}
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {skill.status === 'validated' ? (
                      <Badge variant="validated">
                        {skill.validations} validaciones
                      </Badge>
                    ) : skill.status === 'pending' ? (
                      <Badge variant="pending">Pendiente</Badge>
                    ) : (
                      <button
                        onClick={() => navigate('/candidate/request-validation')}
                        className="text-[var(--sp-violet)] hover:underline text-sm"
                      >
                        Solicitar validación
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="mb-6">
            <h3 className="text-2xl font-bold mb-4">Experiencia</h3>
            <div className="space-y-6">
              {[
                {
                  title: 'Senior Backend Engineer',
                  company: 'Mercado Libre',
                  period: '2021 - Presente',
                  description: 'Desarrollo de microservicios de pagos y gestión de transacciones.',
                },
                {
                  title: 'Backend Engineer',
                  company: 'Globant',
                  period: '2019 - 2021',
                  description: 'Desarrollo de APIs REST para clientes corporativos.',
                },
                {
                  title: 'Junior Backend Developer',
                  company: 'Despegar',
                  period: '2017 - 2019',
                  description: 'Desarrollo y mantenimiento de servicios backend.',
                },
              ].map((exp) => (
                <div key={exp.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-[var(--sp-gray-light)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-[var(--sp-gray-medium)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-1">{exp.title}</h4>
                    <p className="text-[var(--sp-gray-medium)] mb-1">{exp.company}</p>
                    <p className="text-sm text-[var(--sp-gray-medium)] mb-2">{exp.period}</p>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-2xl font-bold mb-4">Validaciones que diste</h3>
            <div className="space-y-3">
              {[
                { name: 'María García', skill: 'Java', date: 'Hace 2 días', initials: 'MG' },
                { name: 'Diego Fernández', skill: 'Spring Boot', date: 'Hace 1 semana', initials: 'DF' },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-4 bg-[var(--sp-gray-light)] rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-[var(--sp-gray-medium)]">
                        Validaste {item.skill}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-[var(--sp-gray-medium)]">{item.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
