'use client';

import { useState } from 'react';
import { SongForm } from './components/SongForm';
import { SongStatus } from './components/SongStatus';

export default function Home() {
  const [currentSongId, setCurrentSongId] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      backgroundSize: '400% 400%',
      animation: 'liquidFlow 20s ease infinite',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Liquid background elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        animation: 'float 15s ease-in-out infinite',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-20%',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
        animation: 'float 18s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: '2rem',
            padding: '3rem 2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(0)',
            animation: 'gentleFloat 6s ease-in-out infinite'
          }}>
            <h1 style={{
              fontSize: '4rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}>
              🎵 Songgram
            </h1>
            <p style={{
              fontSize: '1.375rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '48rem',
              margin: '0 auto',
              lineHeight: '1.6',
              fontWeight: '300'
            }}>
              Create personalized songs for your special moments using AI-powered voice generation
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          {!currentSongId ? (
            <SongForm onSongCreated={setCurrentSongId} />
          ) : (
            <SongStatus songId={currentSongId} onReset={() => setCurrentSongId(null)} />
          )}
        </div>

        {/* Features Section */}
        <div style={{
          marginTop: '6rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          maxWidth: '80rem',
          margin: '6rem auto 0'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(25px)',
            borderRadius: '1.5rem',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(0)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-8px) scale(1.02)';
            e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.15)';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
          }}>
            <div style={{ 
              fontSize: '3.5rem', 
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
            }}>🎭</div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: 'white', 
              marginBottom: '1rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>Personalized Stories</h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.85)', 
              fontSize: '1.125rem',
              lineHeight: '1.6'
            }}>Transform your memories into meaningful lyrics</p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(25px)',
            borderRadius: '1.5rem',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(0)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-8px) scale(1.02)';
            e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.15)';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
          }}>
            <div style={{ 
              fontSize: '3.5rem', 
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
            }}>🎤</div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: 'white', 
              marginBottom: '1rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>AI Voice Generation</h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.85)', 
              fontSize: '1.125rem',
              lineHeight: '1.6'
            }}>Powered by ElevenLabs for natural-sounding vocals</p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(25px)',
            borderRadius: '1.5rem',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(0)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-8px) scale(1.02)';
            e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.15)';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
          }}>
            <div style={{ 
              fontSize: '3.5rem', 
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
            }}>💝</div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: 'white', 
              marginBottom: '1rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>Perfect Gifts</h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.85)', 
              fontSize: '1.125rem',
              lineHeight: '1.6'
            }}>Create unforgettable moments for loved ones</p>
          </div>
        </div>
      </div>
    </div>
  );
}
