
import React, { useState, useEffect } from 'react';
import { Player } from '../types';
import { generateScoutReport } from '../services/geminiService';

interface PlayerDetailsViewProps {
  player: Player;
  onBack: () => void;
}

const PlayerDetailsView: React.FC<PlayerDetailsViewProps> = ({ player, onBack }) => {
  const [scoutReport, setScoutReport] = useState<string>('');
  const [isLoadingScout, setIsLoadingScout] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoadingScout(true);
      const report = await generateScoutReport(player);
      setScoutReport(report);
      setIsLoadingScout(false);
    };
    fetchReport();
  }, [player]);

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center text-emerald-600 font-bold mb-6 hover:translate-x-[-4px] transition-transform"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Volver
      </button>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Sidebar Info */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-10 flex flex-col items-center">
            <div className="w-64 h-64 rounded-3xl overflow-hidden border-4 border-emerald-500/50 shadow-2xl mb-8">
              <img src={player.imageUrl} className="w-full h-full object-cover" />
            </div>
            
            <h1 className="text-3xl font-black text-center mb-2 uppercase tracking-tighter">{player.fullName}</h1>
            <div className="bg-emerald-600 px-4 py-1 rounded-full text-xs font-black uppercase mb-8 shadow-lg">
              {player.position}
            </div>

            <div className="w-full space-y-4">
               <div className="bg-white/10 p-4 rounded-2xl flex justify-between items-center border border-white/5">
                 <span className="text-slate-400 text-xs uppercase font-bold">Residencia</span>
                 <span className="font-bold">{player.city}</span>
               </div>
               <div className="bg-white/10 p-4 rounded-2xl flex justify-between items-center border border-white/5">
                 <span className="text-slate-400 text-xs uppercase font-bold">Nacimiento</span>
                 <span className="font-bold">{new Date(player.birthDate).toLocaleDateString()}</span>
               </div>
               <div className="bg-white/10 p-4 rounded-2xl flex justify-between items-center border border-white/5">
                 <span className="text-slate-400 text-xs uppercase font-bold">Último Club</span>
                 <span className="font-bold">{player.lastClub}</span>
               </div>
            </div>

            <a 
              href={`https://wa.me/${player.whatsapp.replace(/\D/g, '')}`} 
              target="_blank"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl mt-10 font-bold text-center flex items-center justify-center transition shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 448 512">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.8 69.4 27.2 106.2 27.2 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.1zM223.9 445.9c-33.1 0-65.7-8.9-94.1-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.5-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-82.7 184.6-184.4 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.5-.3-8.5 2.4-11.2 2.5-2.6 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.6-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.7 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
              Contactar Oferta
            </a>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-7 p-10">
            <div className="mb-12">
              <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center">
                 <span className="w-1.5 h-6 bg-emerald-500 rounded-full mr-3"></span>
                 Trayectoria y Perfil
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg bg-slate-50 p-6 rounded-3xl border border-slate-100">
                {player.bio}
              </p>
            </div>

            {/* AI Analysis Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-slate-800 flex items-center">
                   <span className="w-1.5 h-6 bg-indigo-500 rounded-full mr-3"></span>
                   Análisis Scout AI
                </h3>
                <span className="text-[10px] uppercase font-black text-indigo-400 bg-indigo-50 px-2 py-1 rounded">Powered by Gemini</span>
              </div>
              <div className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <svg className="w-20 h-20 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </div>
                {isLoadingScout ? (
                  <div className="flex items-center space-x-2 text-indigo-500">
                    <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
                    <span className="ml-2 font-bold">Generando reporte profesional...</span>
                  </div>
                ) : (
                  <p className="text-indigo-900 italic font-medium leading-relaxed">
                    "{scoutReport}"
                  </p>
                )}
              </div>
            </div>

            {/* Videos/Highlights Section */}
            <div>
              <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center">
                 <span className="w-1.5 h-6 bg-rose-500 rounded-full mr-3"></span>
                 Highlights / Jugadas
              </h3>
              {player.videoUrl ? (
                <div className="aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center border-2 border-dashed border-slate-200">
                   {/* Simplified video placeholder logic */}
                   <div className="text-center">
                      <svg className="w-16 h-16 text-slate-300 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      <a href={player.videoUrl} target="_blank" className="text-emerald-600 font-bold underline">
                        Ver video en plataforma externa
                      </a>
                   </div>
                </div>
              ) : (
                <div className="bg-slate-50 p-8 rounded-3xl text-center text-slate-400 border border-slate-100 italic">
                  El jugador aún no ha cargado videos de sus jugadas.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailsView;
