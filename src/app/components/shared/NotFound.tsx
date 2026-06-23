import { useNavigate } from 'react-router';
import Button from './Button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FB] to-white flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-[var(--sp-violet)] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl text-white font-bold">404</span>
        </div>
        <h1 className="text-4xl font-bold mb-3">Página no encontrada</h1>
        <p className="text-[var(--sp-gray-medium)] mb-8">
          La página que buscás no existe o fue movida.
        </p>
        <Button onClick={() => navigate('/candidate/login')}>
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}

