import { NextRequest, NextResponse } from 'next/server';

// Store songs in memory (in production this would be a database)
const songRequests = new Map();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    console.log('🎵 Received song generation request for:', formData.recipient);
    
    // Validate required fields
    if (!formData.occasion || !formData.recipient || !formData.relationship || !formData.story || !formData.selectedVoiceId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique song ID for tracking
    const songId = `song_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    
    // Mock response
    const mockResponse = {
      songId: songId,
      eta: 5,
      provider: 'ElevenLabs',
      processingTimeMs: Date.now()
    };
    
    // Store the request for status checking
    songRequests.set(songId, {
      ...formData,
      status: 'processing',
      submittedAt: Date.now()
    });
    
    // Simulate processing completion after 3 seconds
    setTimeout(() => {
      const request = songRequests.get(songId);
      if (request) {
        songRequests.set(songId, {
          ...request,
          status: 'completed',
          audioUrl: '/demo-song.mp3',
          completedAt: Date.now()
        });
      }
    }, 3000);
    
    console.log('✅ Song generation request submitted:', songId);
    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('❌ Error in song generation:', error);
    return NextResponse.json(
      { error: 'Failed to process song generation request' },
      { status: 500 }
    );
  }
}
