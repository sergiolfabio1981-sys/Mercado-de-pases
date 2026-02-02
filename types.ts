
export enum PlayerStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum PlayerPosition {
  GK = 'Portero',
  DF = 'Defensa',
  MD = 'Mediocampista',
  FW = 'Delantero'
}

export interface Player {
  id: string;
  fullName: string;
  birthDate: string;
  position: PlayerPosition;
  city: string;
  lastClub: string;
  whatsapp: string;
  bio: string;
  imageUrl: string;
  videoUrl?: string;
  status: PlayerStatus;
  createdAt: string;
  scoutAnalysis?: string;
}

export type View = 'HOME' | 'REGISTER' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD' | 'PLAYER_DETAILS';
