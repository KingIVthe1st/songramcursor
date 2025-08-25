export interface Voice {
  voice_id: string;
  name: string;
  labels?: {
    accent?: string;
    description?: string;
    age?: string;
    gender?: string;
    use_case?: string;
  };
  preview_url?: string;
}

export interface SongRequest {
  occasion: string;
  recipientNames: string;
  relationship: string;
  musicStyle: string;
  voiceStyle: string;
  story: string;
}

export interface SongResponse {
  songId: string;
  eta: number;
  provider: string;
  processingTimeMs: number;
}

export interface SongStatus {
  status: 'processing' | 'completed' | 'failed';
  audioUrl?: string;
  eta?: number;
  submittedAt?: number;
  completedAt?: number;
}
