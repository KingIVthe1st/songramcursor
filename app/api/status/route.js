import { NextRequest, NextResponse } from 'next/server';

// Store songs in memory (in production this would be a database)
const songRequests = new Map();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const songId = searchParams.get('songId');

    if (!songId) {
      return Response.json(
        { error: 'Song ID is required' },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Query your database for the song status
    // 2. Check with ElevenLabs API for current status
    // 3. Return the actual status and audio URL when complete

    // For now, simulate a completed song with all the new fields
    // This avoids making actual API calls to ElevenLabs
    
    const mockSongData = {
      songId,
      status: 'completed',
      occasion: 'Birthday', // This would come from the stored song data
      recipientNames: 'Sarah, Mom', // This would come from the stored song data
      relationship: 'daughter and mother', // This would come from the stored song data
      musicStyle: 'Pop', // This would come from the stored song data
      voiceStyle: 'voice_123', // This would come from the stored song data
      story: 'A heartfelt story about celebrating another year of life...', // This would come from the stored song data
      audioUrl: '/demo-song.mp3', // This would be the actual ElevenLabs generated audio URL
      completedAt: new Date().toISOString(),
      processingTime: '45 seconds'
    };

    // Log the status check for debugging
    console.log('Status check for song:', songId);
    console.log('Returning mock data:', mockSongData);

    return Response.json(mockSongData);

  } catch (error) {
    console.error('Error in status route:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
