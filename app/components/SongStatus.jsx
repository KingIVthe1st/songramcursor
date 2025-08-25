'use client';

import { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';

function SongStatusComponent({ songId, onReset }) {
  const [status, setStatus] = useState('processing');
  const [songData, setSongData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(120); // 2 minutes default

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/status?songId=${songId}`);
        if (response.ok) {
          const data = await response.json();
          setSongData(data);
          setStatus(data.status);
          
          if (data.status === 'completed') {
            setProgress(100);
            setEstimatedTimeRemaining(0);
          }
        }
      } catch (error) {
        console.error('Failed to check status:', error);
      }
    };

    // Check status every 5 seconds instead of 2 seconds for real API calls
    const interval = setInterval(checkStatus, 5000);
    checkStatus();

    return () => clearInterval(interval);
  }, [songId]);

  useEffect(() => {
    let timeTimer;
    let progressTimer;

    // Track time elapsed
    timeTimer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    // Update progress based on time elapsed for real song generation
    if (status === 'processing') {
      progressTimer = setInterval(() => {
        setProgress(prev => {
          // More realistic progress for actual song generation
          // Songs typically take 2-5 minutes to generate
          if (prev >= 95) return prev;
          
          // Slower progress at the beginning, faster in the middle
          if (prev < 30) return prev + Math.random() * 3; // 0-3% per interval
          if (prev < 70) return prev + Math.random() * 5; // 0-5% per interval
          return prev + Math.random() * 2; // 0-2% per interval near completion
        });
      }, 3000); // Check every 3 seconds for more realistic progress
    }

    // Cleanup function
    return () => {
      if (timeTimer) clearInterval(timeTimer);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, [status]);

  // Calculate estimated time remaining based on progress and time elapsed
  useEffect(() => {
    if (progress > 0 && timeElapsed > 0) {
      const progressRate = progress / timeElapsed;
      const remainingProgress = 100 - progress;
      const estimatedSeconds = remainingProgress / progressRate;
      setEstimatedTimeRemaining(Math.max(0, Math.ceil(estimatedSeconds)));
    }
  }, [progress, timeElapsed]);

  if (status === 'completed') {
    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(50px)',
        borderRadius: '3rem',
        padding: '4rem',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 60px 120px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        animation: 'premiumSlideIn 1s ease-out'
      }}>
        {/* Premium background elements */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          right: '-30%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)',
          animation: 'premiumFloat 18s ease-in-out infinite',
          pointerEvents: 'none'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-25%',
          left: '-25%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.06) 0%, transparent 70%)',
          animation: 'premiumFloat 22s ease-in-out infinite reverse',
          pointerEvents: 'none'
        }}></div>
        
        {/* Premium accent lines */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(34, 197, 94, 0.4) 25%, rgba(74, 222, 128, 0.6) 50%, rgba(34, 197, 94, 0.4) 75%, transparent 100%)',
          animation: 'premiumShine 6s ease-in-out infinite'
        }}></div>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            fontSize: '6rem',
            marginBottom: '2rem',
            filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.4))',
            animation: 'premiumBounce 2s ease-in-out infinite',
            color: '#22c55e'
          }}>🎉</div>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #ffffff 0%, #dcfce7 25%, #bbf7d0 50%, #86efac 75%, #22c55e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1.5rem',
            textShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            letterSpacing: '-0.02em',
            lineHeight: '1.2'
          }}>
            Your Song is Ready!
          </h2>
          <p style={{
            fontSize: '1.5rem',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: '400',
            letterSpacing: '0.01em',
            lineHeight: '1.6'
          }}>
            Your personalized song has been generated successfully with ElevenLabs AI
          </p>
        </div>

        {/* Song Details */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
          borderRadius: '2rem',
          padding: '3rem',
          marginBottom: '3rem',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}>
          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: '800',
            color: 'white',
            marginBottom: '2rem',
            textAlign: 'center',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            letterSpacing: '-0.01em'
          }}>
            Song Details
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Occasion</p>
              <p style={{
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: '600'
              }}>{songData?.occasion || 'Birthday'}</p>
            </div>
            <div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Recipients</p>
              <p style={{
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: '600'
              }}>{songData?.recipientNames || 'Sarah, Mom'}</p>
            </div>
            <div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Relationship</p>
              <p style={{
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: '600'
              }}>{songData?.relationship || 'daughter and mother'}</p>
            </div>
            <div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>Music Style</p>
              <p style={{
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: '600'
              }}>{songData?.musicStyle || 'Pop'}</p>
            </div>
          </div>
        </div>

        {/* Audio Player */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          {songData?.audioUrl ? (
            <audio
              controls
              style={{
                maxWidth: '40rem',
                width: '100%',
                borderRadius: '1.5rem',
                filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))'
              }}
              src={songData.audioUrl}
            />
          ) : (
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
              borderRadius: '1.5rem',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              maxWidth: '40rem',
              margin: '0 auto'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
              }}>🎵</div>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.125rem',
                fontWeight: '500',
                margin: '0'
              }}>
                Your personalized song is ready! Audio will be available shortly.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onReset}
            style={{
              background: 'linear-gradient(135deg, #818cf8 0%, #a5b4fc 25%, #c7d2fe 50%, #e0e7ff 75%, #ffffff 100%)',
              backgroundSize: '200% 200%',
              animation: 'premiumFlow 4s ease infinite',
              color: 'white',
              fontWeight: '800',
              padding: '1.25rem 2.5rem',
              borderRadius: '2rem',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 25px 50px rgba(129, 140, 248, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transform: 'translateY(0)',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              letterSpacing: '0.02em'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px) scale(1.02)';
              e.target.style.boxShadow = '0 35px 70px rgba(129, 140, 248, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 25px 50px rgba(129, 140, 248, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }}
          >
            🎵 Create Another Song
          </button>
          
          <button
            onClick={() => {
              if (songData?.audioUrl) {
                window.open(songData.audioUrl, '_blank');
              } else {
                // Show a message that the song is still being generated
                alert('Your song is still being generated. Please wait a moment and try again.');
              }
            }}
            disabled={!songData?.audioUrl}
            style={{
              background: songData?.audioUrl 
                ? 'linear-gradient(135deg, #22c55e 0%, #4ade80 25%, #86efac 50%, #bbf7d0 75%, #dcfce7 100%)'
                : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
              backgroundSize: '200% 200%',
              animation: songData?.audioUrl ? 'premiumFlow 4s ease infinite' : 'none',
              color: 'white',
              fontWeight: '800',
              padding: '1.25rem 2.5rem',
              borderRadius: '2rem',
              border: 'none',
              fontSize: '1.25rem',
              cursor: songData?.audioUrl ? 'pointer' : 'not-allowed',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: songData?.audioUrl 
                ? '0 25px 50px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                : '0 10px 20px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(0)',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              letterSpacing: '0.02em',
              opacity: songData?.audioUrl ? 1 : 0.6
            }}
            onMouseEnter={(e) => {
              if (songData?.audioUrl) {
                e.target.style.transform = 'translateY(-4px) scale(1.02)';
                e.target.style.boxShadow = '0 35px 70px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (songData?.audioUrl) {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 25px 50px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }
            }}
          >
            {songData?.audioUrl ? '💾 Download Song' : '⏳ Song Generating...'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
      backdropFilter: 'blur(50px)',
      borderRadius: '3rem',
      padding: '4rem',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 60px 120px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      position: 'relative',
      overflow: 'hidden',
      animation: 'premiumSlideIn 1s ease-out'
    }}>
      {/* Premium background elements */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        right: '-30%',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(129, 140, 248, 0.08) 0%, transparent 70%)',
        animation: 'premiumFloat 18s ease-in-out infinite',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-25%',
        left: '-25%',
        width: '50%',
        height: '50%',
        background: 'radial-gradient(circle, rgba(165, 180, 252, 0.06) 0%, transparent 70%)',
        animation: 'premiumFloat 22s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }}></div>
      
      {/* Premium accent lines */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(129, 140, 248, 0.4) 25%, rgba(165, 180, 252, 0.6) 50%, rgba(199, 210, 254, 0.4) 75%, transparent 100%)',
        animation: 'premiumShine 6s ease-in-out infinite'
      }}></div>
      
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          width: '6rem',
          height: '6rem',
          border: '4px solid rgba(255, 255, 255, 0.2)',
          borderTopColor: 'rgba(129, 140, 248, 0.8)',
          borderRadius: '50%',
          margin: '0 auto 2rem',
          animation: 'premiumRotate 1.5s linear infinite',
          filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))'
        }}></div>
        <h2 style={{
          fontSize: '3rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 25%, #c7d2fe 50%, #a5b4fc 75%, #818cf8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1.5rem',
          textShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          letterSpacing: '-0.02em',
          lineHeight: '1.2'
        }}>
          Creating Your Song
        </h2>
        <p style={{
          fontSize: '1.5rem',
          color: 'rgba(255, 255, 255, 0.9)',
          fontWeight: '400',
          letterSpacing: '0.01em',
          lineHeight: '1.6'
        }}>
          Our AI is crafting something special just for you using ElevenLabs
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
        borderRadius: '1rem',
        height: '1.5rem',
        marginBottom: '3rem',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #818cf8 0%, #a5b4fc 25%, #c7d2fe 50%, #e0e7ff 75%, #ffffff 100%)',
          backgroundSize: '200% 100%',
          animation: 'premiumFlow 3s ease infinite',
          borderRadius: '1rem',
          transition: 'width 1s ease-out',
          boxShadow: '0 0 20px rgba(129, 140, 248, 0.3)'
        }}></div>
      </div>

      {/* Time and Progress Info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
          padding: '1.5rem',
          borderRadius: '1rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)'
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>Time Elapsed</p>
          <p style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
          </p>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
          padding: '1.5rem',
          borderRadius: '1rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)'
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>Progress</p>
          <p style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            {Math.round(progress)}%
          </p>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
          padding: '1.5rem',
          borderRadius: '1rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)'
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>ETA</p>
          <p style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            {Math.floor(estimatedTimeRemaining / 60)}:{(estimatedTimeRemaining % 60).toString().padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* Status Steps */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.15) 0%, rgba(129, 140, 248, 0.08) 100%)',
          padding: '2rem 1.5rem',
          borderRadius: '1.5rem',
          textAlign: 'center',
          border: '1px solid rgba(129, 140, 248, 0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 40px rgba(129, 140, 248, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          animation: 'premiumPulse 2s ease-in-out infinite'
        }}>
          <div style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
          }}>🎵</div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '0.5rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}>Composing</h3>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1rem',
            fontWeight: '500'
          }}>Writing lyrics & melody</p>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, rgba(165, 180, 252, 0.15) 0%, rgba(165, 180, 252, 0.08) 100%)',
          padding: '2rem 1.5rem',
          borderRadius: '1.5rem',
          textAlign: 'center',
          border: '1px solid rgba(165, 180, 252, 0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 40px rgba(165, 180, 252, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          animation: 'premiumPulse 2s ease-in-out infinite 0.5s'
        }}>
          <div style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
          }}>🎤</div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '0.5rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}>Recording</h3>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1rem',
            fontWeight: '500'
          }}>AI voice generation</p>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, rgba(199, 210, 254, 0.15) 0%, rgba(199, 210, 254, 0.08) 100%)',
          padding: '2rem 1.5rem',
          borderRadius: '1.5rem',
          textAlign: 'center',
          border: '1px solid rgba(199, 210, 254, 0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 40px rgba(199, 210, 254, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          animation: 'premiumPulse 2s ease-in-out infinite 1s'
        }}>
          <div style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
          }}>🎧</div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '0.5rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
          }}>Mixing</h3>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1rem',
            fontWeight: '500'
          }}>Final audio production</p>
        </div>
      </div>

      {/* Processing Note */}
      <div style={{
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '1rem',
        fontWeight: '500',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        padding: '1.5rem',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)'
      }}>
        <p style={{ margin: '0 0 0.5rem 0' }}>
          <strong>Note:</strong> Real song generation with ElevenLabs typically takes 2-5 minutes.
        </p>
        <p style={{ margin: '0', fontSize: '0.875rem' }}>
          We're creating a unique, personalized song just for you using advanced AI technology.
        </p>
      </div>
    </div>
  );
}

// Export with Error Boundary wrapper
export function SongStatus(props) {
  return (
    <ErrorBoundary>
      <SongStatusComponent {...props} />
    </ErrorBoundary>
  );
}
