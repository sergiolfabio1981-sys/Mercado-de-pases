
import React, { useState } from 'react';
import { Player } from '../types';
import PlayerCard from './PlayerCard';
import { POSITIONS } from '../constants';

interface LandingPageProps {
  players: Player[];
  onViewPlayer: (player: Player) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ players, onViewPlayer }) => {
  const [filter, setFilter] = useState('');
  const [posFilter, setPosFilter] = useState('');

  const filteredPlayers = players.filter(p => 
    p.fullName.toLowerCase().includes(filter.toLowerCase()) || 
    p.city.toLowerCase().includes(filter.toLowerCase())
  ).filter(p => !posFilter || p.position.includes(posFilter));

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover" 
          alt="Stadium" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight max-w-2xl">
            TU PRÓXIMO <span className="text-emerald-400">DESAFÍO</span> COMIENZA AQUÍ
          </h1>
          <p className="text-xl text-slate-200 max-w-lg mb-8">
            La plataforma líder para conectar jugadores libres y amateur con clubes y representantes de todo el mundo.
          </p>
          <div className="flex space-x-4">
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <span className="block text-2xl font-bold">{players.length}</span>
                <span className="text-xs uppercase text-slate-300">Jugadores Activos</span>
             </div>
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <span className="block text-2xl font-bold">100+</span>
                <span className="text-xs uppercase text-slate-300">Clubes Mirando</span>
             </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-10 border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-grow w-full">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Buscar por nombre o ciudad</label>
          <input 
            type="text" 
            placeholder="Ej: Juan, Buenos Aires..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Posición</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
            value={posFilter}
            onChange={(e) => setPosFilter(e.target.value)}
          >
            <option value="">Todas las posiciones</option>
            {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
        <span className="w-2 h-8 bg-emerald-500 rounded-full mr-3"></span>
        Jugadores Destacados
      </h2>

      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPlayers.map(player => (
            <PlayerCard 
              key={player.id} 
              player={player} 
              onClick={() => onViewPlayer(player)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No se encontraron jugadores con esos criterios.</p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
