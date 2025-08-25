'use client';

import { useState, useEffect } from 'react';

export function SongForm({ onSongCreated }) {
  const [formData, setFormData] = useState({
    occasion: '',
    recipientNames: '',
    relationship: '',
    musicStyle: '',
    voiceStyle: '',
    story: ''
  });
  const [voices, setVoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const occasions = [
    'Birthday',
    'Anniversary',
    'Graduation',
    'Wedding',
    'Baby Shower',
    'Retirement',
    'Holiday',
    'Just Because',
    'Other'
  ];

  const musicStyles = [
    'Pop',
    'Rock',
    'Country',
    'Jazz',
    'Classical',
    'R&B',
    'Folk',
    'Electronic',
    'Hip Hop',
    'Blues',
    'Trap Rap',
    'Old Skool Hip Hop',
    'Ballads',
    'Reggae',
    'Soul'
  ];

  const relationships = [
    'Wife/Husband',
    'Girlfriend/Boyfriend',
    'Mother/Father',
    'Daughter/Son',
    'Sister/Brother',
    'Friend',
    'Grandmother/Grandfather',
    'Aunt/Uncle',
    'Cousin',
    'Other'
  ];

  useEffect(() => {
    fetchVoices();
  }, []);

  const fetchVoices = async () => {
    try {
      const response = await fetch('/api/elevenlabs-voices');
      if (response.ok) {
        const data = await response.json();
        setVoices(data.voices || []);
      }
    } catch (error) {
      console.error('Failed to fetch voices:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        onSongCreated(data.songId);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create song');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
      backdropFilter: 'blur(30px)',
      borderRadius: '2rem',
      padding: '3rem',
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
      
      <h2 style={{
        fontSize: '2.5rem',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #fff 0%, #e0e7ff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2.5rem',
        textAlign: 'center',
        textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        Create Your Personalized Song
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
        {/* Occasion */}
        <div>
          <label style={{
            display: 'block',
            color: 'white',
            fontWeight: '600',
            marginBottom: '1rem',
            fontSize: '1.25rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}>
            What's the occasion?
          </label>
          <select
            name="occasion"
            value={formData.occasion}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '1rem 1.25rem',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              outline: 'none',
              fontSize: '1.125rem',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
            }}
            onFocus={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            }}
            required
          >
            <option value="">Choose your celebration</option>
            {occasions.map((occasion) => (
              <option key={occasion} value={occasion}>{occasion}</option>
            ))}
          </select>
        </div>

        {/* Recipient and Relationship */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              color: 'white',
              fontWeight: '600',
              marginBottom: '1rem',
              fontSize: '1.25rem',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}>
              Who's this for?
            </label>
            <input
              type="text"
              name="recipientNames"
              value={formData.recipientNames}
              onChange={handleInputChange}
              placeholder="Sarah, Mom, John, Alex..."
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '1rem',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                outline: 'none',
                fontSize: '1.125rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}
              onFocus={(e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
              }}
              required
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              color: 'white',
              fontWeight: '600',
              marginBottom: '1rem',
              fontSize: '1.25rem',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}>
              Your relationship
            </label>
            <input
              type="text"
              name="relationship"
              value={formData.relationship}
              onChange={handleInputChange}
              placeholder="wife, friend, daughter, partner..."
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '1rem',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                outline: 'none',
                fontSize: '1.125rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}
              onFocus={(e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
              }}
              required
            />
          </div>
        </div>

        {/* Music Style */}
        <div>
          <label style={{
            display: 'block',
            color: 'white',
            fontWeight: '600',
            marginBottom: '1rem',
            fontSize: '1.25rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}>
            Music style
          </label>
          <div style={{ position: 'relative' }}>
            <select
              name="musicStyle"
              value={formData.musicStyle}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                paddingRight: '4rem',
                borderRadius: '1rem',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                outline: 'none',
                fontSize: '1.125rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}
              onFocus={(e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
              }}
              required
            >
              <option value="">Select music style</option>
              {musicStyles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
            <div style={{
              position: 'absolute',
              right: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              fontSize: '1.5rem',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
            }}>
              🎤
            </div>
          </div>
        </div>

        {/* Voice Style */}
        <div>
          <label style={{
            display: 'block',
            color: 'white',
            fontWeight: '600',
            marginBottom: '1rem',
            fontSize: '1.25rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}>
            Choose Your Voice Style
          </label>
          <select
            name="voiceStyle"
            value={formData.voiceStyle}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '1rem 1.25rem',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              outline: 'none',
              fontSize: '1.125rem',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
            }}
            onFocus={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            }}
            required
          >
            <option value="">Select a voice style...</option>
            {voices.map((voice) => (
              <option key={voice.voice_id} value={voice.voice_id}>
                {voice.name} ({voice.labels?.accent || 'Standard'})
              </option>
            ))}
          </select>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            marginTop: '0.75rem',
            fontSize: '1rem',
            fontWeight: '500'
          }}>{voices.length} voices available</p>
        </div>

        {/* Story */}
        <div>
          <label style={{
            display: 'block',
            color: 'white',
            fontWeight: '600',
            marginBottom: '1rem',
            fontSize: '1.25rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}>
            Share your story
          </label>
          <div style={{ position: 'relative' }}>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleInputChange}
              placeholder="Tell us about this special moment, person, or memory that means so much to you. The more heartfelt details you share, the more personalized your song will be..."
              rows={6}
              maxLength={500}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '1rem',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.15) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                outline: 'none',
                fontSize: '1.125rem',
                backdropFilter: 'blur(10px)',
                resize: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}
              onFocus={(e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
              }}
              required
            />
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.875rem',
              fontWeight: '500',
              background: 'rgba(0, 0, 0, 0.2)',
              padding: '0.25rem 0.75rem',
              borderRadius: '0.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              {formData.story.length}/500
            </div>
          </div>
        </div>

        {error && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '1rem',
            padding: '1.25rem',
            backdropFilter: 'blur(10px)'
          }}>
            <p style={{ color: '#fecaca', fontWeight: '500' }}>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            backgroundSize: '200% 200%',
            animation: isLoading ? 'none' : 'liquidFlow 3s ease infinite',
            color: 'white',
            fontWeight: '700',
            padding: '1.25rem 2rem',
            borderRadius: '1.5rem',
            border: 'none',
            fontSize: '1.375rem',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(0)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.25)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
            }
          }}
        >
          {isLoading ? 'Creating Your Song...' : '🎵 Generate My Song'}
        </button>
      </form>
    </div>
  );
}
