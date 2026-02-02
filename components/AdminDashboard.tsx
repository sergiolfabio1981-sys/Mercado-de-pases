
import React from 'react';
import { Player, PlayerStatus } from '../types';

interface AdminDashboardProps {
  players: Player[];
  onUpdateStatus: (id: string, status: PlayerStatus) => void;
  onDelete: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ players, onUpdateStatus, onDelete }) => {
  const pendingCount = players.filter(p => p.status === PlayerStatus.PENDING).length;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Panel de Control</h2>
          <p className="text-gray-500">Gestiona las solicitudes de los jugadores</p>
        </div>
        <div className="flex space-x-4">
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl font-bold flex items-center">
             <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
             {pendingCount} Pendientes
          </div>
          <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl font-bold flex items-center">
             <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
             {players.length - pendingCount} Activos
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Jugador</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Info / Contacto</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Estado</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {players.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">No hay jugadores registrados.</td>
                </tr>
            )}
            {players.map(player => (
              <tr key={player.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={player.imageUrl} className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-emerald-500/20" />
                    <div>
                      <div className="font-bold text-slate-800">{player.fullName}</div>
                      <div className="text-xs text-gray-500 uppercase">{player.position}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <span className="text-slate-500">WhatsApp: </span>
                    <a href={`https://wa.me/${player.whatsapp.replace(/\D/g, '')}`} target="_blank" className="font-bold text-emerald-600 hover:underline">
                        {player.whatsapp}
                    </a>
                  </div>
                  <div className="text-xs text-gray-400">{player.city} • {player.lastClub}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                    player.status === PlayerStatus.APPROVED ? 'bg-emerald-100 text-emerald-700' :
                    player.status === PlayerStatus.PENDING ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {player.status === PlayerStatus.APPROVED ? 'Aprobado' : player.status === PlayerStatus.PENDING ? 'Pendiente' : 'Rechazado'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {player.status !== PlayerStatus.APPROVED && (
                      <button 
                        onClick={() => onUpdateStatus(player.id, PlayerStatus.APPROVED)}
                        className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-600 transition shadow-sm"
                      >
                        Aprobar
                      </button>
                    )}
                    {player.status !== PlayerStatus.REJECTED && (
                      <button 
                        onClick={() => onUpdateStatus(player.id, PlayerStatus.REJECTED)}
                        className="bg-gray-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-300 transition"
                      >
                        Rechazar
                      </button>
                    )}
                    <button 
                      onClick={() => onDelete(player.id)}
                      className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
