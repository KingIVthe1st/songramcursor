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

    // For now, we'll simulate the song being completed after a realistic time
    // In production, you would query your database for the actual song status
    
    // Simulate processing time (2-5 minutes for real generation)
    const processingTime = Math.floor(Math.random() * 180) + 120; // 2-5 minutes in seconds
    
    // Simulate the song being completed after a realistic time
    const songCreationTime = parseInt(songId.split('_')[1]); // Extract timestamp from songId
    const timeSinceCreation = Math.floor((Date.now() - songCreationTime) / 1000);
    
    let status = 'processing';
    let audioUrl = null;
    
    if (timeSinceCreation >= processingTime) {
      status = 'completed';
      audioUrl = `/api/song/${songId}`;
    }
    
    // For now, return simulated data
    // In production, this would come from your database
    const songData = {
      songId,
      status,
      occasion: 'Birthday', // This would come from the stored song data
      recipientNames: 'Sarah, Mom', // This would come from the stored song data
      relationship: 'daughter and mother', // This would come from the stored song data
      musicStyle: 'Pop', // This would come from the stored song data
      voiceStyle: 'voice_123', // This would come from the stored song data
      story: 'A heartfelt story about celebrating another year of life...', // This would come from the stored song data
      audioUrl: audioUrl, // This would be the actual ElevenLabs generated audio URL
      createdAt: new Date(songCreationTime).toISOString(),
      processingTime: `${Math.floor(processingTime / 60)} minutes`
    };

    // Log the status check for debugging
    console.log('Status check for song:', songId);
    console.log('Time since creation:', timeSinceCreation, 'seconds');
    console.log('Processing time needed:', processingTime, 'seconds');
    console.log('Status:', status);
    console.log('Returning data:', songData);

    return Response.json(songData);

  } catch (error) {
    console.error('Error in status route:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
