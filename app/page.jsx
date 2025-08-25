'use client';

import { useState } from 'react';
import { SongForm } from './components/SongForm';
import { SongStatus } from './components/SongStatus';

export default function Home() {
  const [currentSongId, setCurrentSongId] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #8b5cf6 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1rem'
          }}>
            🎵 Music Moments
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#bfdbfe',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Create personalized songs for your special moments using AI-powered voice generation
          </p>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
          {!currentSongId ? (
            <SongForm onSongCreated={setCurrentSongId} />
          ) : (
            <SongStatus songId={currentSongId} onReset={() => setCurrentSongId(null)} />
          )}
        </div>

        {/* Features Section */}
        <div style={{
          marginTop: '5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '72rem',
          margin: '5rem auto 0'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎭</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>Personalized Stories</h3>
            <p style={{ color: '#bfdbfe' }}>Transform your memories into meaningful lyrics</p>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎤</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>AI Voice Generation</h3>
            <p style={{ color: '#bfdbfe' }}>Powered by ElevenLabs for natural-sounding vocals</p>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💝</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>Perfect Gifts</h3>
            <p style={{ color: '#bfdbfe' }}>Create unforgettable moments for loved ones</p>
          </div>
        </div>
      </div>
    </div>
  );
}
