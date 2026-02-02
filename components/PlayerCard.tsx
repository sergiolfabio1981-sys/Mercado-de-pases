
import React from 'react';
import { Player } from '../types';

interface PlayerCardProps {
  player: Player;
  onClick: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={player.imageUrl} 
          alt={player.fullName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
          {player.position}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition">
          {player.fullName}
        </h3>
        <p className="text-gray-500 text-sm mb-4 flex items-center">
          <svg className="w-4 h-4 mr-1 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {player.city}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
          <div className="text-xs">
             <span className="text-gray-400 uppercase block">Último Club</span>
             <span className="font-semibold text-slate-700">{player.lastClub}</span>
          </div>
          <button className="text-emerald-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
            Ver Perfil →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
