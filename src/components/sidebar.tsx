
import React from 'react';
import { 
  FileText, 
  Calendar, 
  Wrench, 
  FileText as Blog, 
  Settings, 
  Coffee,
  Book,
  Github,
  Linkedin
} from 'lucide-react';
// import { useAuth } from '../contexts/auth-context';
// import DigitalClock from './digital-clock';
// import LoginModal from './login-modal';
import { Button } from './ui/button';
import Link from 'next/link';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { DigitalClock } from './digital-clock';
import { Avatar } from '@/components/ui/avatar';

interface SidebarProps {
  activePage: string;
}

export function Sidebar({ activePage }: SidebarProps) {
  // const { user } = useAuth();
  const user = false;
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

  const menuItems = [
    { name: 'Noticias', icon: <FileText size={20} />, path: '/' },
    { name: 'Finanças', icon: <Calendar size={20} />, path: '/finance' },
    { name: 'Tarefas', icon: <Calendar size={20} />, path: '/tasks' },
    { name: 'Ferramentas', icon: <Wrench size={20} />, path: '/tools' },
    { name: 'Blog', icon: <Blog size={20} />, path: '/blog' },
    { name: 'Configurações', icon: <Settings size={20} />, path: '/settings' },
    { name: 'Pague-me um Café', icon: <Coffee size={20} />, path: '/donate' },
  ];


  const Logged = () => {
    const user: { fullname: string, username: string } = 
      { fullname: "convidado", username: 'convidado' };
    return (
      <div className="text-center mt-2">
        <Avatar className="w-10 h-10">
          <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
            {user.fullname.charAt(0)}
          </div>
        </Avatar>
        <h2 className="font-bold text-lg">{user.fullname}</h2>
        <p className="text-sm opacity-75 mb-1">@{user.username}</p>
      </div>
    );
  };

  const Guest = () => {
    return (
      <div className="flex items-center justify-around w-full mt-2">
          <Avatar className="w-10 h-10">
            <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
              C
            </div>
          </Avatar>
          <h2 className="font-bold text-lg">Convidado</h2>
          <Button 
            onClick={() => setIsLoginModalOpen(true)}
            className="mt-2"
            >
            Entrar
          </Button>
      </div>
    );
  };

  const DigitalClockConponent = () => {
    return (
      <div className="flex flex-col items-center mb-3">
        <DigitalClock size={100} />
        {user ? <Logged /> : <Guest />}
      </div>
    )
  };

  const MenuItem = () => {
    return (
      <div className="flex-grow overflow-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = activePage === item.path;
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors hover:bg-white/10 ${
                    isActive 
                      ? 'bg-primary text-white font-medium' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    )
  };

  interface FooterProps {
    link: string;
    name: string;
    children: React.ReactElement;
  };

  const FooterIcon = ({ link, name, children }: FooterProps) => {
    return (
      <Link 
        href={link} 
        target='_blank'
        rel="noopener noreferrer"
        className="p-2 hover:bg-primary hover:text-white rounded-full transition-colors"
      >
        {children}
      </Link>
    )
  };

  const FooterIcons = () => {
    return (
      <div className="mt-auto px-2">
        <div className="flex justify-around pt-2 border-t border-gray-700">
          <FooterIcon link='https://github.com/your-repo' name='Dailyhb Github'>
            <Book size={20} />
          </FooterIcon>
          <FooterIcon link='https://github.com/Mathteus' name='Github'>
            <FaGithub size={20} />
          </FooterIcon>
          <FooterIcon link='https://www.linkedin.com/in/matheus-henrique-63698b189/' name='linkedin'>
            <FaLinkedinIn size={20} />
          </FooterIcon>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="size-full flex flex-col justify-between py-4">
        {/* Digital Clock Section - Replaces User Profile */}
        <DigitalClockConponent />

        {/* Menu Items - Reduced spacing */}
        <MenuItem />

        {/* Footer Icons - With improved hover effect */}
        <FooterIcons />
      </div>

      {/* Login Modal */}
      {/* <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      /> */}
    </>
  );
};