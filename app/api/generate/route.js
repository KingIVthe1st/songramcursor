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

    // Log the enhanced prompt for debugging (without actually calling ElevenLabs)
    console.log('Enhanced ElevenLabs Prompt:', enhancedPrompt);
    console.log('Song Details:', {
      songId,
      occasion,
      recipientNames,
      relationship,
      musicStyle,
      voiceStyle,
      storyLength: story.length
    });

    // Simulate processing time (in real implementation, this would be the ElevenLabs API call)
    // For now, we'll just return success to avoid wasting credits
    
    // Store song data (in a real app, you'd save this to a database)
    const songData = {
      songId,
      occasion,
      recipientNames,
      relationship,
      musicStyle,
      voiceStyle,
      story,
      status: 'processing',
      createdAt: new Date().toISOString(),
      eta: Math.floor(Math.random() * 60) + 30 // Random ETA between 30-90 seconds
    };

    // In a real implementation, you would:
    // 1. Call ElevenLabs API with the enhanced prompt
    // 2. Store the job ID and status
    // 3. Set up webhook or polling to check completion
    // 4. Return the song ID for status checking

    return Response.json({
      success: true,
      songId,
      message: 'Song generation started successfully',
      prompt: enhancedPrompt // Including this for verification purposes
    });

  } catch (error) {
    console.error('Error in generate route:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
