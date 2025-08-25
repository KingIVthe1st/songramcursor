'use client';

import { useState } from 'react';
import { SongForm } from './components/SongForm';
import { SongStatus } from './components/SongStatus';

export default function Home() {
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            🎵 Music Moments
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Create personalized songs for your special moments using AI-powered voice generation
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!currentSongId ? (
            <SongForm onSongCreated={setCurrentSongId} />
          ) : (
            <SongStatus songId={currentSongId} onReset={() => setCurrentSongId(null)} />
          )}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-white mb-2">Personalized Stories</h3>
            <p className="text-blue-200">Transform your memories into meaningful lyrics</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">🎤</div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Voice Generation</h3>
            <p className="text-blue-200">Powered by ElevenLabs for natural-sounding vocals</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">💝</div>
            <h3 className="text-xl font-semibold text-white mb-2">Perfect Gifts</h3>
            <p className="text-blue-200">Create unforgettable moments for loved ones</p>
          </div>
        </div>
      </div>
    </div>
  );
}
