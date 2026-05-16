import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { CheckCircle, Mail, Phone, User, FileText } from 'lucide-react';

export default function CandidateProfileRevealed() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="candidate" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-2">¡Marcaste "Me interesa"!</h1>
            <p className="text-[var(--sp-gray-medium)] text-lg">
              El reclutador ya tiene acceso a tu perfil completo y datos de contacto
            </p>
          </div>

          <Card className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-slate-700 font-bold text-2xl">
                LX
              </div>
              <div>
                <h2 className="text-2xl font-bold">Senior Backend Engineer</h2>
                <p className="text-[var(--sp-gray-medium)]">Lexus</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
              <h3 className="font-bold mb-4">Información compartida</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-[var(--sp-violet)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--sp-gray-medium)]">Nombre completo</p>
                    <p className="font-medium">Sofía Martínez</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[var(--sp-violet)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--sp-gray-medium)]">Email</p>
                    <p className="font-medium">sofia.martinez@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[var(--sp-violet)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--sp-gray-medium)]">Teléfono</p>
                    <p className="font-medium">+54 11 5555-0123</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[var(--sp-violet)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--sp-gray-medium)]">CV completo</p>
                    <p className="font-medium">Perfil y experiencia laboral</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <h3 className="font-bold mb-4">Próximos pasos</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[var(--sp-violet)] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">El reclutador te contactará</p>
                  <p className="text-sm text-[var(--sp-gray-medium)]">
                    Recibirás un email o llamada del equipo de Lexus
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[var(--sp-violet)] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Coordiná entrevistas</p>
                  <p className="text-sm text-[var(--sp-gray-medium)]">
                    Acordarás fechas y horarios para las próximas etapas del proceso
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[var(--sp-violet)] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Seguí explorando ofertas</p>
                  <p className="text-sm text-[var(--sp-gray-medium)]">
                    Podés seguir aplicando a otras oportunidades mientras tanto
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button onClick={() => navigate('/candidate/matches')} fullWidth>
              Ver más ofertas
            </Button>
            <Button variant="secondary" onClick={() => navigate('/candidate/anonymous-inbox')}>
              Volver a mensajes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
