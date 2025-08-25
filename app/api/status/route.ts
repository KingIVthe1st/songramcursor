import { NextRequest, NextResponse } from 'next/server';

// Store songs in memory (in production this would be a database)
const songRequests = new Map();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const songId = searchParams.get('songId');
    
    if (!songId) {
      return NextResponse.json(
        { error: 'Song ID is required' },
        { status: 400 }
      );
    }

    const songRequest = songRequests.get(songId);
    
    if (!songRequest) {
      return NextResponse.json(
        { error: 'Song not found' },
        { status: 404 }
      );
    }

    // Return the song request with all the new fields
    return NextResponse.json({
      status: songRequest.status,
      occasion: songRequest.occasion,
      recipientNames: songRequest.recipientNames,
      relationship: songRequest.relationship,
      musicStyle: songRequest.musicStyle,
      voiceStyle: songRequest.voiceStyle,
      story: songRequest.story,
      audioUrl: songRequest.audioUrl,
      eta: songRequest.eta,
      submittedAt: songRequest.submittedAt,
      completedAt: songRequest.completedAt
    });
  } catch (error) {
    console.error('❌ Error checking song status:', error);
    return NextResponse.json(
      { error: 'Failed to check song status' },
      { status: 500 }
    );
  }
}
