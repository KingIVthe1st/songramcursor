'use client';

import { useState, useEffect } from 'react';
import { SongForm } from './components/SongForm';
import { SongStatus } from './components/SongStatus';

export default function Home() {
  const [currentSongId, setCurrentSongId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
              marginBottom: '2rem',
              textShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}>
              🎵 Songgram
            </h1>
            <p style={{
              fontSize: '1.5rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '56rem',
              margin: '0 auto',
              lineHeight: '1.7',
              fontWeight: '400',
              letterSpacing: '0.01em'
            }}>
              Create personalized songs for your special moments using AI-powered voice generation
            </p>
            
            {/* Premium decorative elements */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginTop: '3rem'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#818cf8',
                borderRadius: '50%',
                animation: 'premiumPulse 2s ease-in-out infinite'
              }}></div>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#a5b4fc',
                borderRadius: '50%',
                animation: 'premiumPulse 2s ease-in-out infinite 0.5s'
              }}></div>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#c7d2fe',
                borderRadius: '50%',
                animation: 'premiumPulse 2s ease-in-out infinite 1s'
              }}></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          {!currentSongId ? (
            <SongForm onSongCreated={setCurrentSongId} />
          ) : (
            <SongStatus songId={currentSongId} onReset={() => setCurrentSongId(null)} />
          )}
        </div>

        {/* Premium Features Section */}
        <div style={{
          marginTop: '8rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '3rem',
          maxWidth: '90rem',
          margin: '8rem auto 0'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
            backdropFilter: 'blur(40px)',
            borderRadius: '2rem',
            padding: '3rem 2.5rem',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transform: 'translateY(0)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-12px) scale(1.03)';
            e.target.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
          }}>
            {/* Premium accent line */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, #818cf8 0%, #a5b4fc 50%, #c7d2fe 100%)',
              animation: 'premiumShine 4s ease-in-out infinite'
            }}></div>
            
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '2rem',
              filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
              animation: 'premiumFloat 6s ease-in-out infinite'
            }}>🎭</div>
            <h3 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '800', 
              color: 'white', 
              marginBottom: '1.5rem',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              letterSpacing: '-0.01em'
            }}>Personalized Stories</h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.85)', 
              fontSize: '1.25rem',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>Transform your memories into meaningful lyrics</p>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
            backdropFilter: 'blur(40px)',
            borderRadius: '2rem',
            padding: '3rem 2.5rem',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transform: 'translateY(0)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-12px) scale(1.03)';
            e.target.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
          }}>
            {/* Premium accent line */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, #a5b4fc 0%, #c7d2fe 50%, #e0e7ff 100%)',
              animation: 'premiumShine 4s ease-in-out infinite 1s'
            }}></div>
            
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '2rem',
              filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
              animation: 'premiumFloat 6s ease-in-out infinite 1s'
            }}>🎤</div>
            <h3 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '800', 
              color: 'white', 
              marginBottom: '1.5rem',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              letterSpacing: '-0.01em'
            }}>AI Voice Generation</h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.85)', 
              fontSize: '1.25rem',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>Powered by ElevenLabs for natural-sounding vocals</p>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
            backdropFilter: 'blur(40px)',
            borderRadius: '2rem',
            padding: '3rem 2.5rem',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transform: 'translateY(0)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-12px) scale(1.03)';
            e.target.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
          }}>
            {/* Premium accent line */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, #c7d2fe 0%, #e0e7ff 50%, #ffffff 100%)',
              animation: 'premiumShine 4s ease-in-out infinite 2s'
            }}></div>
            
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
              marginBottom: '1.5rem',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              letterSpacing: '-0.01em'
            }}>Perfect Gifts</h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.85)', 
              fontSize: '1.25rem',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>Create unforgettable moments for loved ones</p>
          </div>
        </div>
      </div>
    </div>
  );
}
