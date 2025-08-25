'use client';

import { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';

function SongFormComponent({ onSongCreated }) {
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
  const [focusedField, setFocusedField] = useState('');

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

  useEffect(() => {
    // Add error boundary around fetchVoices
    try {
      fetchVoices();
    } catch (error) {
      console.error('Error in fetchVoices useEffect:', error);
    }
  }, []);

  const fetchVoices = async () => {
    try {
      const response = await fetch('/api/elevenlabs-voices');
      if (response.ok) {
        const data = await response.json();
        setVoices(data.voices || []);
      } else {
        console.error('Failed to fetch voices:', response.status);
        setVoices([]); // Set empty array as fallback
      }
    } catch (error) {
      console.error('Failed to fetch voices:', error);
      setVoices([]); // Set empty array as fallback
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data before submission
    if (!formData.occasion || !formData.recipientNames || !formData.relationship || !formData.musicStyle || !formData.voiceStyle || !formData.story) {
      setError('Please fill in all fields');
      return;
    }

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
        if (data.songId && typeof onSongCreated === 'function') {
          onSongCreated(data.songId);
        } else {
          setError('Invalid response from server');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create song');
      }
    } catch (error) {
      console.error('Form submission error:', error);
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

  const handleFieldFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleFieldBlur = () => {
    setFocusedField('');
  };

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
      
      <h2 style={{
        fontSize: '3rem',
        fontWeight: '900',
        background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 25%, #c7d2fe 50%, #a5b4fc 75%, #818cf8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '3rem',
        textAlign: 'center',
        textShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        letterSpacing: '-0.02em',
        lineHeight: '1.2'
      }}>
        Create Your Personalized Song
      </h2>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        animation: 'premiumSlideIn 1s ease-out 0.2s both'
      }}>
        {/* Occasion Field */}
        <div style={{ animation: 'premiumSlideIn 1s ease-out 0.3s both' }}>
          <label style={{
            display: 'block',
            color: 'white',
            fontWeight: '700',
            fontSize: '1.375rem',
            marginBottom: '1rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.01em'
          }}>
            What's the occasion?
          </label>
          <select
            name="occasion"
            value={formData.occasion}
            onChange={handleInputChange}
            onFocus={() => handleFieldFocus('occasion')}
            onBlur={handleFieldBlur}
            required
            style={{
              width: '100%',
              padding: '1.25rem 1.5rem',
              borderRadius: '1.5rem',
              background: focusedField === 'occasion' 
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
              border: focusedField === 'occasion' 
                ? '2px solid rgba(129, 140, 248, 0.6)' 
                : '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1.25rem',
              backdropFilter: 'blur(20px)',
              boxShadow: focusedField === 'occasion'
                ? '0 20px 40px rgba(129, 140, 248, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : '0 10px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              transform: focusedField === 'occasion' ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer'
            }}
          >
            <option value="">Choose your celebration</option>
            {occasions.map((occasion) => (
              <option key={occasion} value={occasion}>{occasion}</option>
            ))}
          </select>
        </div>

        {/* Recipient Names Field */}
        <div style={{ animation: 'premiumSlideIn 1s ease-out 0.4s both' }}>
          <label style={{
            display: 'block',
            color: 'white',
            fontWeight: '700',
            fontSize: '1.375rem',
            marginBottom: '1rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.01em'
          }}>
            Who is this song for?
          </label>
          <input
            type="text"
            name="recipientNames"
            value={formData.recipientNames}
            onChange={handleInputChange}
            onFocus={() => handleFieldFocus('recipientNames')}
            onBlur={handleFieldBlur}
            placeholder="e.g., Sarah, Mom, Dad, Best Friend"
            required
            style={{
              width: '100%',
              padding: '1.25rem 1.5rem',
              borderRadius: '1.5rem',
              background: focusedField === 'recipientNames' 
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
              border: focusedField === 'recipientNames' 
                ? '2px solid rgba(129, 140, 248, 0.6)' 
                : '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1.25rem',
              backdropFilter: 'blur(20px)',
              boxShadow: focusedField === 'recipientNames'
                ? '0 20px 40px rgba(129, 140, 248, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : '0 10px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              transform: focusedField === 'recipientNames' ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </div>

        {/* Relationship Field */}
        <div style={{ animation: 'premiumSlideIn 1s ease-out 0.5s both' }}>
          <label style={{
            display: 'block',
            color: 'white',
            fontWeight: '700',
            fontSize: '1.375rem',
            marginBottom: '1rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.01em'
          }}>
            What's your relationship?
          </label>
          <input
            type="text"
            name="relationship"
            value={formData.relationship}
            onChange={handleInputChange}
            onFocus={() => handleFieldFocus('relationship')}
            onBlur={handleFieldBlur}
            placeholder="wife, friend, daughter, partner..."
            required
            style={{
              width: '100%',
              padding: '1.25rem 1.5rem',
              borderRadius: '1.5rem',
              background: focusedField === 'relationship' 
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
              border: focusedField === 'relationship' 
                ? '2px solid rgba(129, 140, 248, 0.6)' 
                : '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1.25rem',
              backdropFilter: 'blur(20px)',
              boxShadow: focusedField === 'relationship'
                ? '0 20px 40px rgba(129, 140, 248, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : '0 10px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              transform: focusedField === 'relationship' ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </div>

        {/* Music Style Field */}
        <div style={{ animation: 'premiumSlideIn 1s ease-out 0.6s both' }}>
          <label style={{
            display: 'block',
            color: 'white',
            fontWeight: '700',
            fontSize: '1.375rem',
            marginBottom: '1rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.01em'
          }}>
            Music style
          </label>
          <div style={{ position: 'relative' }}>
            <select
              name="musicStyle"
              value={formData.musicStyle}
              onChange={handleInputChange}
              onFocus={() => handleFieldFocus('musicStyle')}
              onBlur={handleFieldBlur}
              required
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                paddingRight: '4rem',
                borderRadius: '1.5rem',
                background: focusedField === 'musicStyle' 
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                border: focusedField === 'musicStyle' 
                  ? '2px solid rgba(129, 140, 248, 0.6)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '1.25rem',
                backdropFilter: 'blur(20px)',
                boxShadow: focusedField === 'musicStyle'
                  ? '0 20px 40px rgba(129, 140, 248, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  : '0 10px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                transform: focusedField === 'musicStyle' ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
            >
              <option value="">Choose your music style</option>
              {musicStyles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
            <div style={{
              position: 'absolute',
              right: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.5rem',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
              animation: 'premiumFloat 4s ease-in-out infinite'
            }}>🎵</div>
          </div>
        </div>

        {/* Voice Style Field */}
        <div style={{ animation: 'premiumSlideIn 1s ease-out 0.7s both' }}>
          <label style={{
            display: 'block',
            color: 'white',
            fontWeight: '700',
            fontSize: '1.375rem',
            marginBottom: '1rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.01em'
          }}>
            Choose Your Voice Style
          </label>
          <select
            name="voiceStyle"
            value={formData.voiceStyle}
            onChange={handleInputChange}
            onFocus={() => handleFieldFocus('voiceStyle')}
            onBlur={handleFieldBlur}
            required
            style={{
              width: '100%',
              padding: '1.25rem 1.5rem',
              borderRadius: '1.5rem',
              background: focusedField === 'voiceStyle' 
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
              border: focusedField === 'voiceStyle' 
                ? '2px solid rgba(129, 140, 248, 0.6)' 
                : '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1.25rem',
              backdropFilter: 'blur(20px)',
              boxShadow: focusedField === 'voiceStyle'
                ? '0 20px 40px rgba(129, 140, 248, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : '0 10px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              transform: focusedField === 'voiceStyle' ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer'
            }}
          >
            <option value="">Select a voice</option>
            {voices.map((voice) => (
              <option key={voice.voice_id} value={voice.voice_id}>
                {voice.name} ({voice.labels?.accent || 'american'})
              </option>
            ))}
          </select>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1rem',
            marginTop: '0.5rem',
            fontWeight: '500'
          }}>
            {voices.length} voices available
          </p>
        </div>

        {/* Story Field */}
        <div style={{ animation: 'premiumSlideIn 1s ease-out 0.8s both' }}>
          <label style={{
            display: 'block',
            color: 'white',
            fontWeight: '700',
            fontSize: '1.375rem',
            marginBottom: '1rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.01em'
          }}>
            Share your story
          </label>
          <div style={{ position: 'relative' }}>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleInputChange}
              onFocus={() => handleFieldFocus('story')}
              onBlur={handleFieldBlur}
              placeholder="Tell us about this special moment, person, or memory that means so much to you. The more heartfelt details you share, the more personalized your song will be..."
              required
              rows={6}
              maxLength={500}
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                borderRadius: '1.5rem',
                background: focusedField === 'story' 
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                border: focusedField === 'story' 
                  ? '2px solid rgba(129, 140, 248, 0.6)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '1.25rem',
                backdropFilter: 'blur(20px)',
                boxShadow: focusedField === 'story'
                  ? '0 20px 40px rgba(129, 140, 248, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  : '0 10px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                transform: focusedField === 'story' ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              background: 'rgba(0, 0, 0, 0.3)',
              color: 'rgba(255, 255, 255, 0.7)',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              backdropFilter: 'blur(10px)'
            }}>
              {formData.story.length}/500
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.08) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1.5rem',
            padding: '1.5rem',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            fontSize: '1.125rem',
            fontWeight: '500',
            textAlign: 'center',
            animation: 'premiumSlideIn 0.5s ease-out'
          }}>
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            background: isLoading 
              ? 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
              : 'linear-gradient(135deg, #818cf8 0%, #a5b4fc 25%, #c7d2fe 50%, #e0e7ff 75%, #ffffff 100%)',
            backgroundSize: '200% 200%',
            animation: isLoading ? 'none' : 'premiumFlow 4s ease infinite',
            color: 'white',
            fontWeight: '800',
            padding: '1.5rem 3rem',
            borderRadius: '2rem',
            border: 'none',
            fontSize: '1.5rem',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: isLoading 
              ? '0 10px 20px rgba(0, 0, 0, 0.2)'
              : '0 25px 50px rgba(129, 140, 248, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            transform: 'translateY(0)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.02em',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.target.style.transform = 'translateY(-4px) scale(1.02)';
              e.target.style.boxShadow = '0 35px 70px rgba(129, 140, 248, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 25px 50px rgba(129, 140, 248, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            }
          }}
        >
          {isLoading ? (
            <>
              <div style={{
                display: 'inline-block',
                width: '1.5rem',
                height: '1.5rem',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTopColor: 'white',
                borderRadius: '50%',
                animation: 'premiumRotate 1s linear infinite',
                marginRight: '0.75rem'
              }}></div>
              Generating Your Song...
            </>
          ) : (
            '🎵 Generate My Song'
          )}
        </button>
      </form>
    </div>
  );
}

// Export with Error Boundary wrapper
export function SongForm(props) {
  return (
    <ErrorBoundary>
      <SongFormComponent {...props} />
    </ErrorBoundary>
  );
}
