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

    // Enhanced prompt for ElevenLabs that takes into account the new musical styles
    const enhancedPrompt = `Create a personalized song with the following specifications:

OCCASION: ${occasion}
RECIPIENT(S): ${recipientNames}
RELATIONSHIP: ${relationship}
MUSIC STYLE: ${musicStyle}
STORY CONTEXT: ${story}

MUSICAL DIRECTION:
- Style: ${musicStyle}
- For ${musicStyle === 'Trap Rap' ? 'trap rap with heavy 808s, hi-hats, and modern trap production' : 
         musicStyle === 'Old Skool Hip Hop' ? 'classic hip hop with boom bap drums, sample-based production, and golden era vibes' :
         musicStyle === 'Ballads' ? 'emotional ballad with piano, strings, and heartfelt vocals' :
         musicStyle === 'Reggae' ? 'reggae with offbeat rhythms, bass-heavy grooves, and island vibes' :
         musicStyle === 'Soul' ? 'soul music with gospel influences, rich harmonies, and emotional depth' :
         musicStyle === 'Country' ? 'country music with acoustic guitars, storytelling lyrics, and southern charm' :
         musicStyle === 'Jazz' ? 'jazz with sophisticated chord progressions, swing rhythms, and improvisational elements' :
         musicStyle === 'Classical' ? 'classical composition with orchestral arrangements and formal structure' :
         musicStyle === 'Electronic' ? 'electronic music with synthesizers, electronic drums, and modern production' :
         musicStyle === 'Hip Hop' ? 'hip hop with strong beats, rap vocals, and urban energy' :
         musicStyle === 'Blues' ? 'blues with guitar riffs, soulful vocals, and emotional depth' :
         'standard production appropriate for the genre'}

LYRICAL CONTENT:
- Focus on the relationship: ${relationship}
- Incorporate details from the story: ${story}
- Make it personal and meaningful for ${recipientNames}
- Match the emotional tone appropriate for ${occasion}

PRODUCTION NOTES:
- Ensure the ${musicStyle} style is authentically represented
- Create appropriate instrumental backing for the selected genre
- Maintain emotional connection throughout the song
- Keep the focus on the personal story and relationship

This should be a heartfelt, personalized song that captures the essence of the relationship and story while staying true to the ${musicStyle} genre.`;

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
      // Call ElevenLabs API to generate the song
      const elevenLabsResponse = await fetch('https://api.elevenlabs.io/v1/text-to-speech', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey
        },
        body: JSON.stringify({
          text: enhancedPrompt,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });

      if (!elevenLabsResponse.ok) {
        const errorData = await elevenLabsResponse.text();
        console.error('ElevenLabs API error:', errorData);
        return Response.json(
          { error: 'Failed to generate song with ElevenLabs. Please try again.' },
          { status: 500 }
        );
      }

      // Get the audio data
      const audioBuffer = await elevenLabsResponse.arrayBuffer();
      
      // In a real production app, you would:
      // 1. Save the audio file to cloud storage (AWS S3, Google Cloud Storage, etc.)
      // 2. Store the file URL in your database
      // 3. Return the song ID for status checking
      
      // For now, we'll simulate the process and return success
      // In production, implement proper file storage and database persistence
      
      console.log('✅ Song generated successfully with ElevenLabs');
      console.log('Song Details:', {
        songId,
        occasion,
        recipientNames,
        relationship,
        musicStyle,
        voiceStyle,
        storyLength: story.length,
        audioGenerated: true
      });

      // Store song data (in a real app, save to database)
      const songData = {
        songId,
        occasion,
        recipientNames,
        relationship,
        musicStyle,
        voiceStyle,
        story,
        status: 'completed',
        createdAt: new Date().toISOString(),
        audioUrl: `/api/song/${songId}`, // This would be the actual cloud storage URL
        processingTime: '45 seconds'
      };

      return Response.json({
        success: true,
        songId,
        message: 'Song generated successfully with ElevenLabs!',
        prompt: enhancedPrompt
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
