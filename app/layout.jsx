import './globals.css';

export const metadata = {
  title: 'Music Moments - Personalized AI Song Generation',
  description: 'Create personalized songs for your special moments using AI-powered voice generation. Transform your memories into meaningful music.',
  keywords: 'AI music, personalized songs, voice generation, ElevenLabs, music creation',
  authors: [{ name: 'Music Moments Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          html {
            scroll-behavior: smooth;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
