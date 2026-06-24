import { useNavigate, useLocation } from 'react-router';
import { Briefcase, Users, MessageSquare, User, Award, Mail, HelpCircle, LogOut } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  type: 'recruiter' | 'candidate';
}

export default function Sidebar({ type }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const recruiterNav: NavItem[] = [
    { label: 'Mis búsquedas', path: '/recruiter/dashboard', icon: <Briefcase className="w-5 h-5" /> },
    { label: 'Talento', path: '/recruiter/talent', icon: <Users className="w-5 h-5" /> },
    { label: 'Mensajes anónimos', path: '/recruiter/anonymous-inbox', icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'FAQ', path: '/recruiter/faq', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const candidateNav: NavItem[] = [
    { label: 'Matches', path: '/candidate/matches', icon: <Briefcase className="w-5 h-5" /> },
    { label: 'Mis habilidades', path: '/candidate/profile', icon: <Award className="w-5 h-5" /> },
    { label: 'Validaciones', path: '/candidate/validations-pending', icon: <Users className="w-5 h-5" /> },
    { label: 'Mensajes', path: '/candidate/anonymous-inbox', icon: <Mail className="w-5 h-5" /> },
    { label: 'FAQ', path: '/candidate/faq', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const navItems = type === 'recruiter' ? recruiterNav : candidateNav;
  const brandColor = type === 'recruiter' ? 'bg-cyan-100 text-cyan-600' : 'bg-[#E8E7FE] text-[var(--sp-violet)]';
  const userTypeLabel = type === 'recruiter' ? 'Reclutador' : 'Candidato';

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${brandColor} rounded-xl flex items-center justify-center`}>
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Skill Passport</h2>
            <p className="text-xs text-[var(--sp-gray-medium)]">{userTypeLabel}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                isActive
                  ? 'bg-[var(--sp-violet)] text-white'
                  : 'text-[var(--sp-gray-medium)] hover:bg-[var(--sp-gray-light)]'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-6">
        <button
          onClick={() => {
            localStorage.removeItem('sp_token');
            localStorage.removeItem('sp_user_type');
            navigate('/candidate/login');
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--sp-gray-medium)] hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}
