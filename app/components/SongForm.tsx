'use client';

import { useState, useEffect } from 'react';
import { Voice } from './types';

interface SongFormProps {
  onSongCreated: (songId: string) => void;
}

export function SongForm({ onSongCreated }: SongFormProps) {
  const [formData, setFormData] = useState({
    occasion: '',
    recipientNames: '',
    relationship: '',
    musicStyle: '',
    voiceStyle: '',
    story: ''
  });
  const [voices, setVoices] = useState<Voice[]>([]);
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

  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Create Your Personalized Song
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Occasion */}
        <div>
          <label className="block text-white font-medium mb-3 text-lg">
            What's the occasion?
          </label>
          <select
            name="occasion"
            value={formData.occasion}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            required
          >
            <option value="">Choose your celebration</option>
            {occasions.map((occasion) => (
              <option key={occasion} value={occasion}>{occasion}</option>
            ))}
          </select>
        </div>

        {/* Recipient and Relationship */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-3 text-lg">
              Who's this for?
            </label>
            <input
              type="text"
              name="recipientNames"
              value={formData.recipientNames}
              onChange={handleInputChange}
              placeholder="Sarah, Mom, John, Alex..."
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-3 text-lg">
              Your relationship
            </label>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
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
          <label className="block text-white font-medium mb-3 text-lg">
            Music style
          </label>
          <div className="relative">
            <select
              name="musicStyle"
              value={formData.musicStyle}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg pr-12"
              required
            >
              <option value="">Select music style</option>
              {musicStyles.map((style) => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
              🎤
            </div>
          </div>
        </div>

        {/* Voice Style */}
        <div>
          <label className="block text-white font-medium mb-3 text-lg">
            Choose Your Voice Style
          </label>
          <select
            name="voiceStyle"
            value={formData.voiceStyle}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            required
          >
            <option value="">Select a voice style...</option>
            {voices.map((voice) => (
              <option key={voice.voice_id} value={voice.voice_id}>
                {voice.name} ({voice.labels?.accent || 'Standard'})
              </option>
            ))}
          </select>
          <p className="text-blue-200 mt-2">{voices.length} voices available</p>
        </div>

        {/* Story */}
        <div>
          <label className="block text-white font-medium mb-3 text-lg">
            Share your story
          </label>
          <div className="relative">
            <textarea
              name="story"
              value={formData.story}
              onChange={handleInputChange}
              placeholder="Tell us about this special moment, person, or memory that means so much to you. The more heartfelt details you share, the more personalized your song will be..."
              rows={6}
              maxLength={500}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-lg"
              required
            />
            <div className="absolute top-3 right-3 text-blue-200 text-sm">
              {formData.story.length}/500
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 text-xl"
        >
          {isLoading ? 'Creating Your Song...' : '🎵 Generate My Song'}
        </button>
      </form>
    </div>
  );
}
