import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      console.error('ElevenLabs API key not configured');
      return Response.json(
        { error: 'ElevenLabs API key not configured' },
        { status: 500 }
      );
    }

    console.log('Fetching voices from ElevenLabs...');
    
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'xi-api-key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ElevenLabs API error: ${response.status} - ${errorText}`);
      
      if (response.status === 401) {
        return Response.json(
          { error: 'Invalid ElevenLabs API key. Please check your configuration.' },
          { status: 500 }
        );
      } else if (response.status === 404) {
        return Response.json(
          { error: 'ElevenLabs voices endpoint not found. API may have changed.' },
          { status: 500 }
        );
      } else {
        return Response.json(
          { error: `ElevenLabs API error: ${response.status}. Please try again.` },
          { status: 500 }
        );
      }
    }

    const data = await response.json();
    console.log(`✅ Successfully fetched ${data.voices?.length || 0} voices from ElevenLabs`);
    
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching ElevenLabs voices:', error);
    return Response.json(
      { error: 'Failed to fetch voices. Please check your internet connection and try again.' },
      { status: 500 }
    );
  }
}
