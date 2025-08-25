'use client';

import { useState } from 'react';
import { SongForm } from './components/SongForm';
import { SongStatus } from './components/SongStatus';
import ErrorBoundary from './components/ErrorBoundary';

export default function Home() {
  const [currentSongId, setCurrentSongId] = useState(null);

  const handleSongCreated = (songId) => {
    if (songId && typeof songId === 'string') {
      setCurrentSongId(songId);
    }
  };

  const handleReset = () => {
    setCurrentSongId(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
      backgroundSize: '400% 400%',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Background elements */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%)'
      }}></div>
      
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem 1rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <ErrorBoundary>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(40px)',
              borderRadius: '3rem',
              padding: '4rem 3rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 50px 100px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <h1 style={{
                fontSize: '5rem',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 25%, #c7d2fe 50%, #a5b4fc 75%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.5rem',
                textShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                letterSpacing: '-0.02em',
                lineHeight: '1.2'
              }}>
                🎵 Songgram
              </h1>
              <p style={{
                fontSize: '1.5rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: '400',
                letterSpacing: '0.01em',
                lineHeight: '1.6'
              }}>
                Create personalized songs for your special moments using AI-powered voice generation
              </p>
            </div>
          </div>
        </ErrorBoundary>

        {/* Feature Section */}
        <ErrorBoundary>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            marginBottom: '5rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(40px)',
              borderRadius: '2rem',
              padding: '3rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '2rem',
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))'
              }}>🎵</div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                color: 'white',
                marginBottom: '1rem',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                letterSpacing: '-0.01em'
              }}>
                AI-Powered Generation
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.25rem',
                fontWeight: '400',
                lineHeight: '1.6'
              }}>
                Create unique, personalized songs using advanced AI technology and ElevenLabs voice synthesis
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(40px)',
              borderRadius: '2rem',
              padding: '3rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '2rem',
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))'
              }}>🎨</div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                color: 'white',
                marginBottom: '1rem',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                letterSpacing: '-0.01em'
              }}>
                Multiple Music Styles
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.25rem',
                fontWeight: '400',
                lineHeight: '1.6'
              }}>
                Choose from 15 different music styles including Pop, Rock, Hip Hop, Trap Rap, and more
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(40px)',
              borderRadius: '2rem',
              padding: '3rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '2rem',
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))'
              }}>💝</div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                color: 'white',
                marginBottom: '1rem',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                letterSpacing: '-0.01em'
              }}>
                Personalized Experience
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.25rem',
                fontWeight: '400',
                lineHeight: '1.6'
              }}>
                Tell your story and create songs that capture your special moments and relationships
              </p>
            </div>
          </div>
        </ErrorBoundary>

        {/* Main Content */}
        <ErrorBoundary>
          {currentSongId ? (
            <SongStatus songId={currentSongId} onReset={handleReset} />
          ) : (
            <SongForm onSongCreated={handleSongCreated} />
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
