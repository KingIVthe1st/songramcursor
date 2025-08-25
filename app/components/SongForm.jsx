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
    'Blues'
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
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      borderRadius: '0.5rem',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <h2 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Create Your Personalized Song
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Occasion */}
        <div>
          <label style={{
            display: 'block',
            color: 'white',
            fontWeight: '500',
            marginBottom: '0.75rem',
            fontSize: '1.125rem'
          }}>
            What's the occasion?
          </label>
          <select
            name="occasion"
            value={formData.occasion}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              outline: 'none',
              fontSize: '1.125rem'
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              color: 'white',
              fontWeight: '500',
              marginBottom: '0.75rem',
              fontSize: '1.125rem'
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
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                outline: 'none',
                fontSize: '1.125rem'
              }}
              required
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              color: 'white',
              fontWeight: '500',
              marginBottom: '0.75rem',
              fontSize: '1.125rem'
            }}>
              Your relationship
            </label>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                outline: 'none',
                fontSize: '1.125rem'
              }}
              required
            >
              <option value="">wife, friend, daughter, partner...</option>
              {relationships.map((relationship) => (
                <option key={relationship} value={relationship}>{relationship}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Music Style */}
        <div>
          <label style={{
            display: 'block',
            color: 'white',
            fontWeight: '500',
            marginBottom: '0.75rem',
            fontSize: '1.125rem'
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
                padding: '0.75rem 1rem',
                paddingRight: '3rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                outline: 'none',
                fontSize: '1.125rem'
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
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white'
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
            fontWeight: '500',
            marginBottom: '0.75rem',
            fontSize: '1.125rem'
          }}>
            Choose Your Voice Style
          </label>
          <select
            name="voiceStyle"
            value={formData.voiceStyle}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              outline: 'none',
              fontSize: '1.125rem'
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
          <p style={{ color: '#bfdbfe', marginTop: '0.5rem' }}>{voices.length} voices available</p>
        </div>

        {/* Story */}
        <div>
          <label style={{
            display: 'block',
            color: 'white',
            fontWeight: '500',
            marginBottom: '0.75rem',
            fontSize: '1.125rem'
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
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                outline: 'none',
                fontSize: '1.125rem',
                resize: 'none'
              }}
              required
            />
            <div style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              color: '#bfdbfe',
              fontSize: '0.875rem'
            }}>
              {formData.story.length}/500
            </div>
          </div>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '0.5rem',
            padding: '1rem'
          }}>
            <p style={{ color: '#fecaca' }}>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            color: 'white',
            fontWeight: 'bold',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '1.25rem',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.5 : 1,
            transition: 'all 0.2s'
          }}
        >
          {isLoading ? 'Creating Your Song...' : '🎵 Generate My Song'}
        </button>
      </form>
    </div>
  );
}
