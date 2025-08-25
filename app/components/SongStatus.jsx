'use client';

import { useState, useEffect } from 'react';

export function SongStatus({ songId, onReset }) {
  const [songData, setSongData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/status?songId=${songId}`);
        if (response.ok) {
          const data = await response.json();
          setSongData(data);
          
          if (data.status === 'processing' && data.eta) {
            setTimeRemaining(data.eta);
          }
        }
      } catch (error) {
        console.error('Failed to check status:', error);
      }
    };

    // Check status immediately
    checkStatus();

    // Set up polling every 2 seconds
    const interval = setInterval(checkStatus, 2000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev > 0) return prev - 1;
        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
    };
  }, [songId]);

  if (!songData) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
        backdropFilter: 'blur(30px)',
        borderRadius: '2rem',
        padding: '3rem',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 35px 70px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Liquid accent elements */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-20%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'float 12s ease-in-out infinite',
          pointerEvents: 'none'
        }}></div>
        
        <div style={{
          animation: 'spin 1.5s linear infinite',
          borderRadius: '50%',
          height: '4rem',
          width: '4rem',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          borderTopColor: 'rgba(255, 255, 255, 0.8)',
          margin: '0 auto 2rem',
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
        }}></div>
        <p style={{ 
          color: 'white', 
          fontSize: '1.375rem',
          fontWeight: '500',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}>Loading song status...</p>
      </div>
    );
  }

  if (songData.status === 'processing') {
    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
        backdropFilter: 'blur(30px)',
        borderRadius: '2rem',
        padding: '3rem',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 35px 70px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Liquid accent elements */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-20%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'float 12s ease-in-out infinite',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-15%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          animation: 'float 15s ease-in-out infinite reverse',
          pointerEvents: 'none'
        }}></div>
        
        <div style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            fontSize: '5rem', 
            marginBottom: '1.5rem',
            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
            animation: 'gentleFloat 4s ease-in-out infinite'
          }}>🎵</div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1.5rem',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            Creating Your Song...
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.375rem',
            marginBottom: '2rem',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Our AI is composing a personalized song just for you
          </p>
        </div>

        {/* Song Details */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
          borderRadius: '1.5rem',
          padding: '2rem',
          marginBottom: '2.5rem',
          textAlign: 'left',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(15px)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '1.5rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}>Song Details</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '1.125rem'
          }}>
            <div>
              <p style={{ marginBottom: '0.75rem' }}><strong>Occasion:</strong> {songData.occasion}</p>
              <p style={{ marginBottom: '0.75rem' }}><strong>For:</strong> {songData.recipientNames}</p>
              <p><strong>Relationship:</strong> {songData.relationship}</p>
            </div>
            <div>
              <p style={{ marginBottom: '0.75rem' }}><strong>Music Style:</strong> {songData.musicStyle}</p>
              <p style={{ marginBottom: '0.75rem' }}><strong>Voice Style:</strong> {songData.voiceStyle}</p>
              <p><strong>Story Length:</strong> {songData.story?.length || 0} characters</p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '100%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
            borderRadius: '9999px',
            height: '1rem',
            marginBottom: '1.5rem',
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              backgroundSize: '200% 200%',
              height: '1rem',
              borderRadius: '9999px',
              width: '60%',
              animation: 'liquidFlow 2s ease infinite',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}></div>
          </div>
          <p style={{ 
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: '500',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}>
            Estimated time remaining: {timeRemaining} seconds
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          color: 'rgba(255, 255, 255, 0.85)',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            padding: '1rem 1.5rem',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              width: '1rem',
              height: '1rem',
              backgroundColor: '#60a5fa',
              borderRadius: '50%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)'
            }}></div>
            <span style={{ fontSize: '1.125rem', fontWeight: '500' }}>Analyzing your story and emotions</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            padding: '1rem 1.5rem',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              width: '1rem',
              height: '1rem',
              backgroundColor: '#a78bfa',
              borderRadius: '50%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              boxShadow: '0 0 20px rgba(167, 139, 250, 0.5)'
            }}></div>
            <span style={{ fontSize: '1.125rem', fontWeight: '500' }}>Composing lyrics and melody in {songData.musicStyle} style</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            padding: '1rem 1.5rem',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              width: '1rem',
              height: '1rem',
              backgroundColor: '#ec4899',
              borderRadius: '50%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)'
            }}></div>
            <span style={{ fontSize: '1.125rem', fontWeight: '500' }}>Generating vocals with AI voice</span>
          </div>
        </div>
      </div>
    );
  }

  if (songData.status === 'completed') {
    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
        backdropFilter: 'blur(30px)',
        borderRadius: '2rem',
        padding: '3rem',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 35px 70px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Liquid accent elements */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-20%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'float 12s ease-in-out infinite',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-15%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          animation: 'float 15s ease-in-out infinite reverse',
          pointerEvents: 'none'
        }}></div>
        
        <div style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            fontSize: '5rem', 
            marginBottom: '1.5rem',
            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
            animation: 'gentleFloat 4s ease-in-out infinite'
          }}>🎉</div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1.5rem',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            Your Song is Ready!
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.375rem',
            marginBottom: '2rem',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Your personalized song has been created successfully
          </p>
        </div>

        {/* Song Details */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
          borderRadius: '1.5rem',
          padding: '2rem',
          marginBottom: '2.5rem',
          textAlign: 'left',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(15px)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '1.5rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}>Song Details</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '1.125rem'
          }}>
            <div>
              <p style={{ marginBottom: '0.75rem' }}><strong>Occasion:</strong> {songData.occasion}</p>
              <p style={{ marginBottom: '0.75rem' }}><strong>For:</strong> {songData.recipientNames}</p>
              <p><strong>Relationship:</strong> {songData.relationship}</p>
            </div>
            <div>
              <p style={{ marginBottom: '0.75rem' }}><strong>Music Style:</strong> {songData.musicStyle}</p>
              <p style={{ marginBottom: '0.75rem' }}><strong>Voice Style:</strong> {songData.voiceStyle}</p>
              <p><strong>Story Length:</strong> {songData.story?.length || 0} characters</p>
            </div>
          </div>
        </div>

        {songData.audioUrl && (
          <div style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
            <audio controls style={{
              width: '100%',
              maxWidth: '32rem',
              margin: '0 auto',
              borderRadius: '1rem',
              filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))'
            }}>
              <source src={songData.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '2.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            borderRadius: '1rem',
            padding: '1.25rem',
            backdropFilter: 'blur(10px)'
          }}>
            <p style={{
              color: '#bbf7d0',
              fontWeight: '600',
              fontSize: '1.125rem'
            }}>
              ✅ Song ID: {songId}
            </p>
          </div>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '1.125rem',
            fontWeight: '500'
          }}>
            You can now download and share your personalized song!
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1
        }}>
          <button
            onClick={onReset}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              backgroundSize: '200% 200%',
              animation: 'liquidFlow 3s ease infinite',
              color: 'white',
              fontWeight: '700',
              padding: '1rem 2rem',
              borderRadius: '1.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(0)',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              fontSize: '1.125rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
            }}
          >
            Create Another Song
          </button>
          {songData.audioUrl && (
            <a
              href={songData.audioUrl}
              download
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: 'white',
                fontWeight: '700',
                padding: '1rem 2rem',
                borderRadius: '1.5rem',
                textDecoration: 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                transform: 'translateY(0)',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                fontSize: '1.125rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.02)';
                e.target.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
              }}
            >
              Download Song
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
      backdropFilter: 'blur(30px)',
      borderRadius: '2rem',
      padding: '3rem',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: '0 35px 70px rgba(0, 0, 0, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Liquid accent elements */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-20%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        animation: 'float 12s ease-in-out infinite',
        pointerEvents: 'none'
      }}></div>
      
      <div style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          fontSize: '5rem', 
          marginBottom: '1.5rem',
          filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))'
        }}>❌</div>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1.5rem',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          Something Went Wrong
        </h2>
        <p style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '1.375rem',
          marginBottom: '2rem',
          lineHeight: '1.6',
          fontWeight: '300'
        }}>
          We encountered an issue while creating your song
        </p>
      </div>

      <button
        onClick={onReset}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          backgroundSize: '200% 200%',
          animation: 'liquidFlow 3s ease infinite',
          color: 'white',
          fontWeight: '700',
          padding: '1rem 2rem',
          borderRadius: '1.5rem',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(0)',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          fontSize: '1.125rem'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-3px) scale(1.02)';
          e.target.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        }}
      >
        Try Again
      </button>
    </div>
  );
}
