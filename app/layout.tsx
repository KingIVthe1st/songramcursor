import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Music Moments - Personalized AI Song Generation',
  description: 'Create personalized songs for your special moments using AI-powered voice generation. Transform your memories into meaningful music.',
  keywords: 'AI music, personalized songs, voice generation, ElevenLabs, music creation',
  authors: [{ name: 'Music Moments Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
