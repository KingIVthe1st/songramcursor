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
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
        borderRadius: '0.5rem',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          animation: 'spin 1s linear infinite',
          borderRadius: '50%',
          height: '3rem',
          width: '3rem',
          border: '2px solid white',
          borderTopColor: 'transparent',
          margin: '0 auto 1rem'
        }}></div>
        <p style={{ color: 'white', fontSize: '1.125rem' }}>Loading song status...</p>
      </div>
    );
  }

  if (songData.status === 'processing') {
    return (
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
        borderRadius: '0.5rem',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>🎵</div>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1rem'
          }}>
            Creating Your Song...
          </h2>
          <p style={{
            color: '#bfdbfe',
            fontSize: '1.125rem',
            marginBottom: '1.5rem'
          }}>
            Our AI is composing a personalized song just for you
          </p>
        </div>

        {/* Song Details */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'white',
            marginBottom: '1rem'
          }}>Song Details</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            color: '#bfdbfe'
          }}>
            <div>
              <p><strong>Occasion:</strong> {songData.occasion}</p>
              <p><strong>For:</strong> {songData.recipientNames}</p>
              <p><strong>Relationship:</strong> {songData.relationship}</p>
            </div>
            <div>
              <p><strong>Music Style:</strong> {songData.musicStyle}</p>
              <p><strong>Voice Style:</strong> {songData.voiceStyle}</p>
              <p><strong>Story Length:</strong> {songData.story?.length || 0} characters</p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '9999px',
            height: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              height: '0.75rem',
              borderRadius: '9999px',
              width: '60%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}></div>
          </div>
          <p style={{ color: 'white' }}>
            Estimated time remaining: {timeRemaining} seconds
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          color: '#bfdbfe'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '0.75rem',
              height: '0.75rem',
              backgroundColor: '#60a5fa',
              borderRadius: '50%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}></div>
            <span>Analyzing your story and emotions</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '0.75rem',
              height: '0.75rem',
              backgroundColor: '#a78bfa',
              borderRadius: '50%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}></div>
            <span>Composing lyrics and melody in {songData.musicStyle} style</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '0.75rem',
              height: '0.75rem',
              backgroundColor: '#ec4899',
              borderRadius: '50%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}></div>
            <span>Generating vocals with AI voice</span>
          </div>
        </div>
      </div>
    );
  }

  if (songData.status === 'completed') {
    return (
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
        borderRadius: '0.5rem',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1rem'
          }}>
            Your Song is Ready!
          </h2>
          <p style={{
            color: '#bfdbfe',
            fontSize: '1.125rem',
            marginBottom: '1.5rem'
          }}>
            Your personalized song has been created successfully
          </p>
        </div>

        {/* Song Details */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'white',
            marginBottom: '1rem'
          }}>Song Details</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            color: '#bfdbfe'
          }}>
            <div>
              <p><strong>Occasion:</strong> {songData.occasion}</p>
              <p><strong>For:</strong> {songData.recipientNames}</p>
              <p><strong>Relationship:</strong> {songData.relationship}</p>
            </div>
            <div>
              <p><strong>Music Style:</strong> {songData.musicStyle}</p>
              <p><strong>Voice Style:</strong> {songData.voiceStyle}</p>
              <p><strong>Story Length:</strong> {songData.story?.length || 0} characters</p>
            </div>
          </div>
        </div>

        {songData.audioUrl && (
          <div style={{ marginBottom: '2rem' }}>
            <audio controls style={{
              width: '100%',
              maxWidth: '28rem',
              margin: '0 auto'
            }}>
              <source src={songData.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            border: '1px solid rgba(34, 197, 94, 0.5)',
            borderRadius: '0.5rem',
            padding: '1rem'
          }}>
            <p style={{
              color: '#bbf7d0',
              fontWeight: '500'
            }}>
              ✅ Song ID: {songId}
            </p>
          </div>
          <p style={{ color: '#bfdbfe' }}>
            You can now download and share your personalized song!
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onReset}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              fontWeight: 'bold',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Create Another Song
          </button>
          {songData.audioUrl && (
            <a
              href={songData.audioUrl}
              download
              style={{
                backgroundColor: '#059669',
                color: 'white',
                fontWeight: 'bold',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                transition: 'all 0.2s'
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
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      borderRadius: '0.5rem',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>❌</div>
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '1rem'
        }}>
          Something Went Wrong
        </h2>
        <p style={{
          color: '#bfdbfe',
          fontSize: '1.125rem',
          marginBottom: '1.5rem'
        }}>
          We encountered an issue while creating your song
        </p>
      </div>

      <button
        onClick={onReset}
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          color: 'white',
          fontWeight: 'bold',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        Try Again
      </button>
    </div>
  );
}
