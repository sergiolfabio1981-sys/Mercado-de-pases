
import React, { useState, useEffect } from 'react';
import { Player, View, PlayerStatus, PlayerPosition } from './types';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from './constants';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import RegisterForm from './components/RegisterForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import PlayerDetailsView from './components/PlayerDetailsView';

const App: React.FC = () => {
  const [view, setView] = useState<View>('HOME');
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Load from LocalStorage
  useEffect(() => {
    const savedPlayers = localStorage.getItem('mdp_players');
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    } else {
      // Mock data for initial look
      const mockPlayers: Player[] = [
        {
          id: '1',
          fullName: 'Juan Román',
          birthDate: '1995-06-24',
          position: PlayerPosition.MD,
          city: 'Don Torcuato',
          lastClub: 'Libre',
          whatsapp: '+5491112345678',
          bio: 'Mediocampista creativo con gran visión de juego y pegada.',
          imageUrl: 'https://picsum.photos/seed/juan/400/400',
          status: PlayerStatus.APPROVED,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          fullName: 'Diego Armando',
          birthDate: '2000-10-30',
          position: PlayerPosition.FW,
          city: 'Lanús',
          lastClub: 'Argentinos Jrs (Amateur)',
          whatsapp: '+5491187654321',
          bio: 'Delantero rápido, zurdo, con gran drible.',
          imageUrl: 'https://picsum.photos/seed/diego/400/400',
          status: PlayerStatus.APPROVED,
          createdAt: new Date().toISOString()
        }
      ];
      setPlayers(mockPlayers);
      localStorage.setItem('mdp_players', JSON.stringify(mockPlayers));
    }
  }, []);

  const savePlayers = (newPlayers: Player[]) => {
    setPlayers(newPlayers);
    localStorage.setItem('mdp_players', JSON.stringify(newPlayers));
  };

  const handleRegister = (playerData: Omit<Player, 'id' | 'status' | 'createdAt'>) => {
    const newPlayer: Player = {
      ...playerData,
      id: Math.random().toString(36).substr(2, 9),
      status: PlayerStatus.PENDING,
      createdAt: new Date().toISOString()
    };
    savePlayers([...players, newPlayer]);
    setView('HOME');
    alert('Tu perfil ha sido enviado. Nos pondremos en contacto vía WhatsApp para verificar tu cuenta antes de publicarla.');
  };

  const handleAdminLogin = (email: string, pass: string) => {
    if (email === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setView('ADMIN_DASHBOARD');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const updatePlayerStatus = (id: string, status: PlayerStatus) => {
    const updated = players.map(p => p.id === id ? { ...p, status } : p);
    savePlayers(updated);
  };

  const deletePlayer = (id: string) => {
    const updated = players.filter(p => p.id !== id);
    savePlayers(updated);
  };

  const navigateToPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setView('PLAYER_DETAILS');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentView={view} 
        setView={setView} 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {view === 'HOME' && (
          <LandingPage 
            players={players.filter(p => p.status === PlayerStatus.APPROVED)} 
            onViewPlayer={navigateToPlayer}
          />
        )}
        
        {view === 'REGISTER' && (
          <RegisterForm onRegister={handleRegister} />
        )}
        
        {view === 'ADMIN_LOGIN' && (
          <AdminLogin onLogin={handleAdminLogin} />
        )}
        
        {view === 'ADMIN_DASHBOARD' && isAdmin && (
          <AdminDashboard 
            players={players} 
            onUpdateStatus={updatePlayerStatus}
            onDelete={deletePlayer}
          />
        )}
        
        {view === 'PLAYER_DETAILS' && selectedPlayer && (
          <PlayerDetailsView 
            player={selectedPlayer} 
            onBack={() => setView(isAdmin ? 'ADMIN_DASHBOARD' : 'HOME')} 
          />
        )}
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">MERCADO DE PASES</h2>
          <p className="text-slate-400 mb-6">Conectando el talento amateur con el mundo profesional.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-emerald-400 transition">Términos</a>
            <a href="#" className="hover:text-emerald-400 transition">Privacidad</a>
            <a href="#" className="hover:text-emerald-400 transition">Contacto</a>
          </div>
          <p className="mt-8 text-slate-500 text-sm">© 2024 Mercado de Pases. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
