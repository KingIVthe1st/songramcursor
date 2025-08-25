'use client';

import { useState, useEffect } from 'react';

interface SongStatusProps {
  songId: string;
  onReset: () => void;
}

interface SongRequest {
  status: 'processing' | 'completed' | 'failed';
  occasion?: string;
  recipientNames?: string;
  relationship?: string;
  musicStyle?: string;
  voiceStyle?: string;
  story?: string;
  audioUrl?: string;
  eta?: number;
}

export function SongStatus({ songId, onReset }: SongStatusProps) {
  const [songData, setSongData] = useState<SongRequest | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

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
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading song status...</p>
      </div>
    );
  }

  if (songData.status === 'processing') {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">🎵</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Creating Your Song...
          </h2>
          <p className="text-blue-200 text-lg mb-6">
            Our AI is composing a personalized song just for you
          </p>
        </div>

        {/* Song Details */}
        <div className="bg-white/10 rounded-lg p-6 mb-8 text-left">
          <h3 className="text-xl font-semibold text-white mb-4">Song Details</h3>
          <div className="grid md:grid-cols-2 gap-4 text-blue-200">
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

        <div className="mb-8">
          <div className="w-full bg-white/20 rounded-full h-3 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <p className="text-white">
            Estimated time remaining: {timeRemaining} seconds
          </p>
        </div>

        <div className="space-y-4 text-blue-200">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Analyzing your story and emotions</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Composing lyrics and melody in {songData.musicStyle} style</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
            <span>Generating vocals with AI voice</span>
          </div>
        </div>
      </div>
    );
  }

  if (songData.status === 'completed') {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Your Song is Ready!
          </h2>
          <p className="text-blue-200 text-lg mb-6">
            Your personalized song has been created successfully
          </p>
        </div>

        {/* Song Details */}
        <div className="bg-white/10 rounded-lg p-6 mb-8 text-left">
          <h3 className="text-xl font-semibold text-white mb-4">Song Details</h3>
          <div className="grid md:grid-cols-2 gap-4 text-blue-200">
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
          <div className="mb-8">
            <audio controls className="w-full max-w-md mx-auto">
              <source src={songData.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
            <p className="text-green-200 font-medium">
              ✅ Song ID: {songId}
            </p>
          </div>
          <p className="text-blue-200">
            You can now download and share your personalized song!
          </p>
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            onClick={onReset}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Create Another Song
          </button>
          {songData.audioUrl && (
            <a
              href={songData.audioUrl}
              download
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Download Song
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
      <div className="mb-6">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Something Went Wrong
        </h2>
        <p className="text-blue-200 text-lg mb-6">
          We encountered an issue while creating your song
        </p>
      </div>

      <button
        onClick={onReset}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
      >
        Try Again
      </button>
    </div>
  );
}
