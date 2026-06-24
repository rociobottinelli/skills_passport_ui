import { useNavigate } from 'react-router';
import Sidebar from '../shared/Sidebar';
import Button from '../shared/Button';
import { Briefcase } from 'lucide-react';

export default function RecruiterDashboardEmpty() {
  const navigate = useNavigate();

  return (
    <div className="theme-recruiter flex min-h-screen bg-[var(--sp-gray-light)]">
      <Sidebar type="recruiter" />

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-[var(--sp-gray-medium)]">Gestioná tus búsquedas de talento</p>
          </div>

          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Briefcase className="w-12 h-12 text-[var(--sp-violet)]" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Empezá a buscar talento</h2>
              <p className="text-[var(--sp-gray-medium)] mb-8 text-lg">
                Publicá tu primera búsqueda y empezá a recibir candidatos compatibles con tus requisitos.
              </p>
              <Button onClick={() => navigate('/recruiter/create-offer')}>
                Publicar primera búsqueda
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
