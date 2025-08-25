# SongGram 🎵

Transform your memories into personalized AI songs using ElevenLabs Music API.

## ✨ Features

- **AI Music Generation**: Creates 1-minute personalized songs using ElevenLabs Music API
- **Beautiful UI**: Modern, responsive design with dark theme
- **Form Inputs**: Occasion, recipient, relationship, music style, voice style, and personal story
- **Real-time Generation**: Instant music creation based on your inputs
- **Download Support**: Download your generated songs as MP3 files

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- ElevenLabs API key ([Get one here](https://elevenlabs.io/))

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/KingIVthe1st/songramcursor.git
   cd songramcursor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Then edit `.env` and add your ElevenLabs API key:
   ```
   ELEVENLABS_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🌐 Deployment

### Deploy to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: SongGram app with ElevenLabs Music API"
   git push origin main
   ```

2. **Create Render Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `songgram`
     - **Runtime**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Environment Variables**: Add `ELEVENLABS_API_KEY` with your API key

3. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your app

### Deploy to GitHub Pages (Static)

Since this is a Node.js app, GitHub Pages won't work directly. Use Render instead for the full functionality.

## 🎵 How It Works

1. **User Input**: Fill out the form with occasion, recipient, relationship, music style, voice style, and personal story
2. **AI Processing**: The app sends your inputs to ElevenLabs Music API
3. **Music Generation**: ElevenLabs creates a 1-minute personalized song based on your inputs
4. **Result**: Play and download your generated song

## 🛠️ Technology Stack

- **Backend**: Node.js + Express
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **API**: ElevenLabs Music API
- **Styling**: Custom CSS with gradients and animations
- **Deployment**: Render (recommended)

## 📁 Project Structure

```
songramcursor/
├── public/
│   └── index.html          # Main web interface
├── server.js               # Express server with ElevenLabs API integration
├── package.json            # Dependencies and scripts
├── env.example            # Environment variables template
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables

- `ELEVENLABS_API_KEY`: Your ElevenLabs API key (required)
- `PORT`: Server port (defaults to 3000)

### ElevenLabs API Settings

The app is configured to:
- Generate 1-minute songs
- Use the `eleven_music_v1` model
- Apply creative parameters for better music quality

## 🎨 Customization

### Styling
- Edit `public/index.html` to modify colors, fonts, and layout
- The app uses CSS custom properties for easy theming

### Music Generation
- Modify the prompt template in `server.js` to change how songs are generated
- Adjust API parameters like `temperature`, `top_k`, etc.

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check your `.env` file has the correct API key
   - Verify the API key is valid on ElevenLabs dashboard

2. **"Music API endpoint not found" error**
   - This is usually temporary - try again in a few minutes
   - Check ElevenLabs status page

3. **App won't start locally**
   - Ensure Node.js 18+ is installed
   - Check all dependencies are installed with `npm install`
   - Verify `.env` file exists and has the API key

### Getting Help

- Check the [ElevenLabs documentation](https://elevenlabs.io/docs/overview)
- Review the [ElevenLabs Music API blog post](https://elevenlabs.io/blog/eleven-music-now-available-in-the-api)
- Open an issue on GitHub

## 📄 License

MIT License - feel free to use this project for your own apps!

## 🙏 Acknowledgments

- [ElevenLabs](https://elevenlabs.io/) for the amazing Music API
- The open-source community for inspiration and tools

---

**Made with ❤️ by KingIVthe1st**

Transform your memories into music today! 🎵✨
