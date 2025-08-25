export const metadata = {
  title: 'Songgram - Personalized AI Song Generation',
  description: 'Create personalized songs for your special moments using AI-powered voice generation. Transform your memories into meaningful music.',
  keywords: 'AI music, personalized songs, voice generation, ElevenLabs, music creation',
  authors: [{ name: 'Songgram Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
