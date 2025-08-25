'use client';

import { useState, useEffect } from 'react';
import { SongForm } from './components/SongForm';
import { SongStatus } from './components/SongStatus';
import ErrorBoundary from './components/ErrorBoundary';

export default function Home() {
  const [currentSongId, setCurrentSongId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Add bounds checking to prevent extreme values
      const x = Math.max(0, Math.min(e.clientX, window.innerWidth));
      const y = Math.max(0, Math.min(e.clientY, window.innerHeight));
      setMousePosition({ x, y });
    };

    // Add error handling
    try {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    } catch (error) {
      console.error('Error setting up mouse tracking:', error);
      return () => {};
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
      backgroundSize: '400% 400%',
      animation: 'premiumFlow 25s ease infinite',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Premium background elements */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
        animation: 'premiumFloat 20s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%)',
        animation: 'premiumFloat 25s ease-in-out infinite reverse'
      }}></div>
      
      {/* Interactive cursor follower */}
      <div style={{
        position: 'fixed',
        left: mousePosition.x - 20,
        top: mousePosition.y - 20,
        width: '40px',
        height: '40px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'all 0.1s ease-out',
        filter: 'blur(1px)'
      }}></div>
      
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem 1rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Premium Header */}
        <ErrorBoundary>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(40px)',
              borderRadius: '3rem',
              padding: '4rem 3rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 50px 100px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transform: 'translateY(0)',
              animation: 'premiumFloat 8s ease-in-out infinite',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Premium accent lines */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                animation: 'premiumShine 3s ease-in-out infinite'
              }}></div>
              
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
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px) scale(1.02)';
              e.target.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '2rem',
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
                animation: 'premiumFloat 6s ease-in-out infinite'
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
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px) scale(1.02)';
              e.target.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '2rem',
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
                animation: 'premiumFloat 6s ease-in-out infinite 1s'
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
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px) scale(1.02)';
              e.target.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '2rem',
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
                animation: 'premiumFloat 6s ease-in-out infinite 2s'
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
            <SongStatus songId={currentSongId} onReset={() => setCurrentSongId(null)} />
          ) : (
            <SongForm onSongCreated={setCurrentSongId} />
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
