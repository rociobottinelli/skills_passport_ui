import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { CheckCircle, Mail, Phone, Linkedin } from 'lucide-react';

export default function RecruiterProfileRevealed() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-2">¡Un candidato marcó "Me interesa"!</h1>
            <p className="text-[var(--sp-gray-medium)] text-lg">
              Ahora tenés acceso completo a su perfil y datos de contacto
            </p>
          </div>

          <Card className="mb-6">
            <div className="flex gap-6 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[var(--sp-violet)] to-[var(--sp-violet-dark)] rounded-2xl flex items-center justify-center text-white font-bold text-4xl">
                SM
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">Sofía Martínez</h2>
                <p className="text-xl text-[var(--sp-gray-medium)] mb-3">Senior Backend Engineer</p>
                <div className="flex gap-2">
                  <Badge variant="validated">Java</Badge>
                  <Badge variant="validated">Spring Boot</Badge>
                  <Badge variant="validated">PostgreSQL</Badge>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold mb-4">Datos de contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[var(--sp-violet)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--sp-gray-medium)]">Email</p>
                    <p className="font-medium">sofia.martinez@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--sp-gray-medium)]">Teléfono</p>
                    <p className="font-medium">+54 11 5555-0123</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--sp-gray-medium)]">LinkedIn</p>
                    <a href="#" className="font-medium text-[var(--sp-violet)] hover:underline">
                      linkedin.com/in/sofia-martinez
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button onClick={() => navigate('/recruiter/talent/1')} fullWidth>
              Ver perfil completo
            </Button>
            <Button variant="secondary" fullWidth>
              Descargar CV
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
