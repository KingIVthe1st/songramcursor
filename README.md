# Songgram

A modern web application for creating personalized songs using AI-powered voice generation. Built with Next.js, React, and modern web technologies.

## Features

- **Personalized Song Creation**: Input occasion, recipient, relationship, and story to generate custom songs
- **AI Voice Generation**: Powered by ElevenLabs for natural-sounding vocals
- **Multiple Music Styles**: Choose from Pop, Rock, Country, Jazz, Classical, R&B, Folk, Electronic, Hip Hop, and Blues
- **Voice Selection**: Choose from 22+ available AI voices
- **Modern, Responsive UI**: Beautiful gradient design with glassmorphism effects
- **Real-time Progress Tracking**: Monitor song generation status with live updates

## Tech Stack

- **Frontend**: Next.js 14, React 18, JavaScript
- **Styling**: Inline CSS with modern design patterns
- **Backend**: Next.js API routes
- **AI Integration**: ElevenLabs API for voice generation
- **Deployment**: Render cloud platform

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- ElevenLabs API key

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:KingIVthe1st/songramender.git
   cd songramender
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Create .env.local file
   ELEVENLABS_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static site

## Deployment

This project is configured for deployment on Render. The deployment process is automated and will build and deploy your application whenever you push to the main branch.

**Live URL**: https://music-moments.onrender.com

## License

This project is private and proprietary.
