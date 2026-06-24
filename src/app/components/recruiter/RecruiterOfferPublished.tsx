import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import { CheckCircle } from 'lucide-react';

export default function RecruiterOfferPublished() {
  const navigate = useNavigate();

  return (
    <div className="theme-recruiter flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-2">¡Búsqueda publicada!</h1>
            <p className="text-[var(--sp-gray-medium)] text-lg">
              Empezarás a recibir candidatos compatibles en breve
            </p>
          </div>

          <Card className="mb-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Senior Frontend Developer</h3>
              <div className="flex gap-2">
                <Badge variant="neutral">Remoto</Badge>
                <Badge variant="neutral">Senior</Badge>
              </div>
              <div>
                <h4 className="font-medium mb-2">Habilidades requeridas</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">React</Badge>
                  <Badge variant="primary">TypeScript</Badge>
                  <Badge variant="primary">Node.js</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Rango salarial</h4>
                <p className="text-[var(--sp-gray-medium)]">USD 80,000 - 120,000</p>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button onClick={() => navigate('/recruiter/dashboard')} fullWidth>
              Ir al Dashboard
            </Button>
            <Button variant="secondary" onClick={() => navigate('/recruiter/create-offer')}>
              Crear otra búsqueda
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
