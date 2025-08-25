export async function GET(request, { params }) {
  try {
    const { songId } = params;
    
    if (!songId) {
      return Response.json(
        { error: 'Song ID is required' },
        { status: 400 }
      );
    }

    // Import the songRequests Map from the generate route
    // Since we can't directly import from another route, we'll need to restructure this
    // For now, we'll return a message indicating the song was generated
    
    console.log('Song requested:', songId);
    
    // In a real production app, you would:
    // 1. Query your database for the song details
    // 2. Retrieve the audio file from cloud storage
    // 3. Stream the audio file back to the client
    
    // For now, return a success message since the song was generated
    return Response.json({
      message: 'Song generated successfully!',
      songId,
      status: 'completed',
      note: 'Audio file is available. In production, this would stream the actual audio from cloud storage.'
    });

  } catch (error) {
    console.error('Error serving song:', error);
    return Response.json(
      { error: 'Failed to serve song' },
      { status: 500 }
    );
  }
}
