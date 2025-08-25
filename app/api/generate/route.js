// Store songs in memory (in production this would be a database)
// Use global Map so it can be accessed by other routes
let songRequests;

if (typeof global.songRequests === 'undefined') {
  global.songRequests = new Map();
}
songRequests = global.songRequests;

export async function POST(request) {
  try {
    const body = await request.json();
    const { occasion, recipientNames, relationship, musicStyle, voiceStyle, story } = body;

    console.log('🎵 Received song generation request:', {
      occasion,
      recipientNames,
      relationship,
      musicStyle,
      voiceStyle,
      storyLength: story?.length || 0
    });

    // Validate required fields
    if (!occasion || !recipientNames || !relationship || !musicStyle || !voiceStyle || !story) {
      console.error('Missing required fields:', { occasion, recipientNames, relationship, musicStyle, voiceStyle, story: !!story });
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
      console.error('Invalid music style:', musicStyle);
      return Response.json(
        { error: 'Invalid music style selected' },
        { status: 400 }
      );
    }

    // Generate a unique song ID
    const songId = `song_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create a much shorter, focused prompt for ElevenLabs (they have character limits)
    const shortPrompt = `A heartfelt ${musicStyle} song for ${occasion}. This is for ${recipientNames}, who is my ${relationship}. ${story.substring(0, 150)}... The song should capture the love and connection we share.`;

    console.log('📝 Generated prompt:', shortPrompt);
    console.log('📏 Prompt length:', shortPrompt.length, 'characters');

    // Check if ElevenLabs API key is configured
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
    if (!elevenLabsApiKey) {
      console.error('❌ ElevenLabs API key not configured');
      return Response.json(
        { error: 'ElevenLabs API not configured. Please contact support.' },
        { status: 500 }
      );
    }

    console.log('🔑 ElevenLabs API key found, length:', elevenLabsApiKey.length);

    try {
      // First, let's get available voices to use a valid voice_id
      console.log('🎤 Fetching available voices from ElevenLabs...');
      
      const voicesResponse = await fetch('https://api.elevenlabs.io/v1/voices', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'xi-api-key': elevenLabsApiKey
        }
      });

      if (!voicesResponse.ok) {
        const errorText = await voicesResponse.text();
        console.error(`❌ Failed to fetch voices from ElevenLabs: ${voicesResponse.status} - ${errorText}`);
        
        if (voicesResponse.status === 401) {
          return Response.json(
            { error: 'Invalid ElevenLabs API key. Please check your configuration.' },
            { status: 500 }
          );
        } else if (voicesResponse.status === 404) {
          return Response.json(
            { error: 'ElevenLabs voices endpoint not found. API may have changed.' },
            { status: 500 }
          );
        } else {
          return Response.json(
            { error: `Failed to fetch voices: ${voicesResponse.status}. Please try again.` },
            { status: 500 }
          );
        }
      }

      const voices = await voicesResponse.json();
      console.log(`✅ Successfully fetched ${voices.voices?.length || 0} voices from ElevenLabs`);
      
      // Use the selected voice if provided, otherwise use the first available voice
      let selectedVoiceId = voiceStyle;
      
      if (!selectedVoiceId || selectedVoiceId === '') {
        selectedVoiceId = voices.voices?.[0]?.voice_id || '21m00Tcm4TlvDq8ikWAM';
        console.log('🎯 No voice selected, using default voice ID:', selectedVoiceId);
      } else {
        console.log('🎯 Using selected voice ID:', selectedVoiceId);
      }

      // Validate that the selected voice exists
      const voiceExists = voices.voices?.some(voice => voice.voice_id === selectedVoiceId);
      if (!voiceExists) {
        console.warn('⚠️ Selected voice not found, using first available voice');
        selectedVoiceId = voices.voices?.[0]?.voice_id || '21m00Tcm4TlvDq8ikWAM';
      }

      console.log('🎤 Final voice ID selected:', selectedVoiceId);

      // Call ElevenLabs API to generate the song
      console.log('🎵 Calling ElevenLabs text-to-speech API...');
      
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
          voice_id: selectedVoiceId,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });

      if (!elevenLabsResponse.ok) {
        const errorData = await elevenLabsResponse.text();
        console.error(`❌ ElevenLabs API error: ${elevenLabsResponse.status} - ${errorData}`);
        
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
        } else if (elevenLabsResponse.status === 404) {
          return Response.json(
            { error: 'ElevenLabs text-to-speech endpoint not found. API may have changed.' },
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
      console.log('🎵 Audio buffer size:', audioBuffer.byteLength, 'bytes');
      console.log('📊 Song Details:', {
        songId,
        occasion,
        recipientNames,
        relationship,
        musicStyle,
        voiceStyle: selectedVoiceId,
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
        voiceStyle: selectedVoiceId,
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
        prompt: shortPrompt,
        voiceUsed: selectedVoiceId
      });

    } catch (elevenLabsError) {
      console.error('❌ Error calling ElevenLabs API:', elevenLabsError);
      return Response.json(
        { error: 'Failed to connect to ElevenLabs. Please check your API key and try again.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Error in generate route:', error);
    return Response.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
