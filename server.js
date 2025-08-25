const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Debug logging
console.log('🚀 Starting SongGram server...');
console.log('🔑 API Key present:', !!process.env.ELEVENLABS_API_KEY);
console.log('🌐 Port:', PORT);

// ElevenLabs Music API endpoint
app.post('/api/generate-music', async (req, res) => {
  try {
    console.log('📝 Received request:', req.body);
    
    const { occasion, recipient, relationship, musicStyle, voiceStyle } = req.body;
    
    if (!occasion || !recipient || !relationship || !musicStyle) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if API key is available
    if (!process.env.ELEVENLABS_API_KEY) {
      console.log('❌ No API key found in environment');
      return res.status(500).json({ error: 'ElevenLabs API key not configured' });
    }

    // Create a music generation prompt based on the form inputs
    const musicPrompt = `Create a ${musicStyle} song that captures the emotion of ${occasion}. 
    This song is dedicated to ${recipient}, who is my ${relationship}. 
    The music should reflect the love, connection, and emotion of this relationship. 
    Make it a heartfelt, romantic ${musicStyle} composition that would make someone feel special and loved. 
    The track should be exactly 1 minute long and have a beautiful melody that matches the ${musicStyle} genre.`;

    console.log('🎵 Calling ElevenLabs Music API...');
    console.log('🎼 Music generation prompt:', musicPrompt);
    console.log('🔑 Using API key:', process.env.ELEVENLABS_API_KEY.substring(0, 10) + '...');

    // Call ElevenLabs Music API
    const elevenLabsResponse = await fetch('https://api.elevenlabs.io/v1/music/generate', {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        prompt: musicPrompt,
        model_id: 'eleven_music_v1',
        duration: 60, // Generate 1 minute of music
        temperature: 0.7,
        top_k: 40,
        top_p: 0.8,
        classifier_free_guidance: 3.0
      })
    });

    console.log('📡 ElevenLabs response status:', elevenLabsResponse.status);

    if (!elevenLabsResponse.ok) {
      const errorData = await elevenLabsResponse.text();
      console.error(`❌ ElevenLabs API error: ${elevenLabsResponse.status} - ${errorData}`);
      
      if (elevenLabsResponse.status === 401) {
        return res.status(500).json({ error: 'Invalid ElevenLabs API key. Please check your configuration.' });
      } else if (elevenLabsResponse.status === 400) {
        return res.status(500).json({ error: 'Invalid request to ElevenLabs. The prompt may be too long or contain invalid characters.' });
      } else if (elevenLabsResponse.status === 404) {
        return res.status(500).json({ error: 'ElevenLabs Music API endpoint not found. This may be a temporary API issue. Please try again in a few minutes.' });
      } else if (elevenLabsResponse.status === 429) {
        return res.status(500).json({ error: 'ElevenLabs API rate limit exceeded. Please try again later.' });
      } else {
        return res.status(500).json({ error: `ElevenLabs API error: ${elevenLabsResponse.status}. Please try again.` });
      }
    }

    // Get the audio data
    const audioBuffer = await elevenLabsResponse.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');

    console.log('✅ Music generated successfully with ElevenLabs Music API!');
    console.log('🎵 Audio buffer size:', audioBuffer.byteLength, 'bytes');

    res.json({
      success: true,
      message: 'Music generated successfully with ElevenLabs Music API! 🎵🎼',
      audioData: audioBase64,
      prompt: musicPrompt,
      songDetails: {
        occasion,
        recipient,
        relationship,
        musicStyle,
        voiceStyle,
        duration: '1 minute',
        apiUsed: 'ElevenLabs Music API'
      }
    });

  } catch (error) {
    console.error('❌ Server error:', error);
    res.status(500).json({ error: 'Failed to generate music. Please try again.' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🎵 SongGram server running on port ${PORT}`);
  console.log(`🌐 Open http://localhost:${PORT} in your browser`);
  console.log(`🔑 API Key configured: ${!!process.env.ELEVENLABS_API_KEY}`);
});
