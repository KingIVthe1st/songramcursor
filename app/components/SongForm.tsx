'use client';

import { useState, useEffect } from 'react';
import { Voice } from './types';

interface SongFormProps {
  onSongCreated: (songId: string) => void;
}

export function SongForm({ onSongCreated }: SongFormProps) {
  const [formData, setFormData] = useState({
    occasion: '',
    recipient: '',
    relationship: '',
    story: '',
    selectedVoiceId: ''
  });
  const [voices, setVoices] = useState<Voice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Create Your Personalized Song
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">
              Occasion *
            </label>
            <input
              type="text"
              name="occasion"
              value={formData.occasion}
              onChange={handleInputChange}
              placeholder="Birthday, Anniversary, Graduation..."
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Recipient's Name *
            </label>
            <input
              type="text"
              name="recipient"
              value={formData.recipient}
              onChange={handleInputChange}
              placeholder="Who is this song for?"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Your Relationship *
          </label>
          <select
            name="relationship"
            value={formData.relationship}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select relationship...</option>
            <option value="spouse">Spouse/Partner</option>
            <option value="parent">Parent</option>
            <option value="child">Child</option>
            <option value="friend">Friend</option>
            <option value="sibling">Sibling</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Your Story *
          </label>
          <textarea
            name="story"
            value={formData.story}
            onChange={handleInputChange}
            placeholder="Share the special memory, feeling, or message you want in your song..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Choose a Voice *
          </label>
          <select
            name="selectedVoiceId"
            value={formData.selectedVoiceId}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select a voice...</option>
            {voices.map((voice) => (
              <option key={voice.voice_id} value={voice.voice_id}>
                {voice.name} ({voice.labels?.accent || 'Standard'})
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          {isLoading ? 'Creating Your Song...' : '🎵 Generate My Song'}
        </button>
      </form>
    </div>
  );
}
