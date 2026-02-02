
import React, { useState } from 'react';
import { Player, PlayerPosition } from '../types';
import { POSITIONS, ARGENTINE_REGIONS } from '../constants';

interface RegisterFormProps {
  onRegister: (playerData: Omit<Player, 'id' | 'status' | 'createdAt'>) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    position: '' as PlayerPosition,
    city: '',
    lastClub: '',
    whatsapp: '',
    bio: '',
    imageUrl: '',
    videoUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
        formData.imageUrl = `https://picsum.photos/seed/${formData.fullName}/400/400`;
    }
    onRegister(formData as Omit<Player, 'id' | 'status' | 'createdAt'>);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-emerald-600 p-8 text-white">
          <h2 className="text-3xl font-black mb-2">ÚNETE AL MERCADO</h2>
          <p className="text-emerald-100">Completa tus datos para ser visto por clubes de todo el mundo.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Nombre Completo *</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Ej: Lionel Messi"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Fecha de Nacimiento *</label>
              <input 
                required
                type="date" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                value={formData.birthDate}
                onChange={e => setFormData({...formData, birthDate: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Posición de Juego *</label>
              <select 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                value={formData.position}
                onChange={e => setFormData({...formData, position: e.target.value as PlayerPosition})}
              >
                <option value="">Seleccionar posición</option>
                {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">WhatsApp de contacto *</label>
              <input 
                required
                type="tel" 
                placeholder="+54 9..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                value={formData.whatsapp}
                onChange={e => setFormData({...formData, whatsapp: e.target.value})}
              />
              <p className="text-xs text-slate-400 mt-1">Lo usaremos para verificar tu identidad.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Ciudad/Provincia *</label>
              <select 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              >
                <option value="">Seleccionar ubicación</option>
                {ARGENTINE_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Último club donde jugaste</label>
              <input 
                type="text" 
                placeholder="Ej: Libre / Club Atlético..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                value={formData.lastClub}
                onChange={e => setFormData({...formData, lastClub: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Foto de Perfil (URL)</label>
              <input 
                type="url" 
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                value={formData.imageUrl}
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Link de Video (YouTube/Vimeo)</label>
              <input 
                type="url" 
                placeholder="https://youtube.com/..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                value={formData.videoUrl}
                onChange={e => setFormData({...formData, videoUrl: e.target.value})}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-1">Trayectoria y Descripción *</label>
            <textarea 
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Cuéntanos sobre tus habilidades, logros y experiencia..."
              value={formData.bio}
              onChange={e => setFormData({...formData, bio: e.target.value})}
            />
          </div>

          <div className="md:col-span-2 pt-4">
            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-lg hover:bg-slate-800 transition shadow-xl"
            >
              REGISTRAR MI PERFIL
            </button>
            <p className="text-center text-gray-500 text-sm mt-4 italic">
              * El perfil será revisado y aprobado por el administrador antes de publicarse.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
