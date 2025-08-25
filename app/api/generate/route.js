// Store songs in memory (in production this would be a database)
const songRequests = new Map();

export async function POST(request) {
  try {
    const body = await request.json();
    const { occasion, recipientNames, relationship, musicStyle, voiceStyle, story } = body;

    // Validate required fields
    if (!occasion || !recipientNames || !relationship || !musicStyle || !voiceStyle || !story) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Enhanced validation for music style
    const validMusicStyles = [
      'Pop', 'Rock', 'Country', 'Jazz', 'Classical', 'R&B', 'Folk', 'Electronic', 
      'Hip Hop', 'Blues', 'Trap Rap', 'Old Skool Hip Hop', 'Ballads', 'Reggae', 'Soul'
    ];
    
    if (!validMusicStyles.includes(musicStyle)) {
      return Response.json(
        { error: 'Invalid music style selected' },
        { status: 400 }
      );
    }

    // Generate a unique song ID
    const songId = `song_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create a much shorter, focused prompt for ElevenLabs (they have character limits)
    const shortPrompt = `A heartfelt ${musicStyle} song for ${occasion}. This is for ${recipientNames}, who is my ${relationship}. ${story.substring(0, 200)}... The song should capture the love and connection we share.`;

    // Check if ElevenLabs API key is configured
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
    if (!elevenLabsApiKey) {
      console.error('ElevenLabs API key not configured');
      return Response.json(
        { error: 'ElevenLabs API not configured. Please contact support.' },
        { status: 500 }
      );
    }

    try {
      // First, let's get available voices to use a valid voice_id
      const voicesResponse = await fetch('https://api.elevenlabs.io/v1/voices', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'xi-api-key': elevenLabsApiKey
        }
      });

      if (!voicesResponse.ok) {
        console.error('Failed to fetch voices from ElevenLabs');
        return Response.json(
          { error: 'Failed to initialize voice generation. Please try again.' },
          { status: 500 }
        );
      }

      const voices = await voicesResponse.json();
      const defaultVoiceId = voices.voices?.[0]?.voice_id || '21m00Tcm4TlvDq8ikWAM'; // Fallback to a default voice

      console.log('Using voice ID:', defaultVoiceId);

      // Call ElevenLabs API to generate the song
      const elevenLabsResponse = await fetch('https://api.elevenlabs.io/v1/text-to-speech', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey
        },
        body: JSON.stringify({
          text: shortPrompt,
          model_id: 'eleven_multilingual_v2',
          voice_id: defaultVoiceId,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });

      if (!elevenLabsResponse.ok) {
        const errorData = await elevenLabsResponse.text();
        console.error('ElevenLabs API error:', errorData);
        
        // Provide more specific error messages
        if (elevenLabsResponse.status === 401) {
          return Response.json(
            { error: 'Invalid ElevenLabs API key. Please check your configuration.' },
            { status: 500 }
          );
        } else if (elevenLabsResponse.status === 400) {
          return Response.json(
            { error: 'Invalid request to ElevenLabs. The text may be too long or contain invalid characters.' },
            { status: 500 }
          );
        } else if (elevenLabsResponse.status === 429) {
          return Response.json(
            { error: 'ElevenLabs API rate limit exceeded. Please try again later.' },
            { status: 500 }
          );
        } else {
          return Response.json(
            { error: `ElevenLabs API error: ${elevenLabsResponse.status}. Please try again.` },
            { status: 500 }
          );
        }
      }

      // Get the audio data
      const audioBuffer = await elevenLabsResponse.arrayBuffer();
      
      console.log('✅ Song generated successfully with ElevenLabs');
      console.log('Audio buffer size:', audioBuffer.byteLength, 'bytes');
      console.log('Song Details:', {
        songId,
        occasion,
        recipientNames,
        relationship,
        musicStyle,
        voiceStyle,
        storyLength: story.length,
        promptLength: shortPrompt.length,
        audioGenerated: true
      });

      // Store song data in memory (in a real app, save to database)
      songRequests.set(songId, {
        songId,
        occasion,
        recipientNames,
        relationship,
        musicStyle,
        voiceStyle,
        story,
        status: 'completed',
        createdAt: new Date().toISOString(),
        audioUrl: `/api/song/${songId}`,
        processingTime: '2-3 minutes',
        audioBuffer: audioBuffer // Store the actual audio data
      });

      return Response.json({
        success: true,
        songId,
        message: 'Song generated successfully with ElevenLabs!',
        prompt: shortPrompt
      });

    } catch (elevenLabsError) {
      console.error('Error calling ElevenLabs API:', elevenLabsError);
      return Response.json(
        { error: 'Failed to connect to ElevenLabs. Please check your API key and try again.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in generate route:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
