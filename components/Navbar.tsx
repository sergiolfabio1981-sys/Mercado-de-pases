
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isAdmin, setIsAdmin }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setView('HOME')}
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <span className="text-white font-black text-xl">M</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-800">
              MERCADO DE PASES
            </span>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <button 
              onClick={() => setView('HOME')}
              className={`font-medium transition ${currentView === 'HOME' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
            >
              Mercado
            </button>
            <button 
              onClick={() => setView('REGISTER')}
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-emerald-700 transition shadow-md"
            >
              Crear Perfil
            </button>
            
            {!isAdmin ? (
              <button 
                onClick={() => setView('ADMIN_LOGIN')}
                className="text-gray-400 hover:text-gray-600 text-sm font-medium"
              >
                Acceso Admin
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setView('ADMIN_DASHBOARD')}
                  className={`text-sm font-bold uppercase tracking-wider ${currentView === 'ADMIN_DASHBOARD' ? 'text-emerald-600' : 'text-gray-600'}`}
                >
                  Panel de Control
                </button>
                <button 
                  onClick={() => {
                    setIsAdmin(false);
                    setView('HOME');
                  }}
                  className="text-red-500 text-sm font-bold"
                >
                  Salir
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button - simplified */}
          <div className="md:hidden">
             <button onClick={() => setView('REGISTER')} className="text-emerald-600 font-bold px-2">Unirse</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
