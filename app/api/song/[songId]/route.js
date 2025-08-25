// Import the songRequests Map from the generate route
// We need to access the same Map instance
let songRequests;

// This is a workaround to access the same Map instance
// In production, use a proper database or shared storage
if (typeof global.songRequests === 'undefined') {
  global.songRequests = new Map();
}
songRequests = global.songRequests;

export async function GET(request, { params }) {
  try {
    const { songId } = params;
    
    if (!songId) {
      return Response.json(
        { error: 'Song ID is required' },
        { status: 400 }
      );
    }

    console.log('🎵 Song requested:', songId);
    
    // Get the song data from our in-memory storage
    const songData = songRequests.get(songId);
    
    if (!songData) {
      console.error('❌ Song not found:', songId);
      return Response.json(
        { error: 'Song not found. It may have expired or not been generated yet.' },
        { status: 404 }
      );
    }

    if (songData.status !== 'completed') {
      console.log('⏳ Song still processing:', songId, songData.status);
      return Response.json(
        { error: 'Song is still being generated. Please wait.' },
        { status: 202 }
      );
    }

    if (!songData.audioBuffer) {
      console.error('❌ No audio buffer found for song:', songId);
      return Response.json(
        { error: 'Audio data not found for this song.' },
        { status: 404 }
      );
    }

    console.log('✅ Serving audio for song:', songId, 'Size:', songData.audioBuffer.byteLength, 'bytes');

    // Convert the ArrayBuffer to a Buffer and serve it as audio
    const audioBuffer = Buffer.from(songData.audioBuffer);
    
    return new Response(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        'Content-Disposition': `attachment; filename="song_${songId}.mp3"`
      }
    });

  } catch (error) {
    console.error('❌ Error serving song:', error);
    return Response.json(
      { error: 'Failed to serve song. Please try again.' },
      { status: 500 }
    );
  }
}
