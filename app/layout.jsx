import './globals.css';

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
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow-x: hidden;
          }
          html {
            scroll-behavior: smooth;
          }
          
          /* Premium Animations */
          @keyframes premiumFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes premiumFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-15px) rotate(0.5deg); }
            66% { transform: translateY(-8px) rotate(-0.5deg); }
          }
          
          @keyframes premiumShine {
            0% { opacity: 0; transform: translateX(-100%); }
            50% { opacity: 1; transform: translateX(0%); }
            100% { opacity: 0; transform: translateX(100%); }
          }
          
          @keyframes premiumPulse {
            0%, 100% { 
              opacity: 0.6; 
              transform: scale(1); 
            }
            50% { 
              opacity: 1; 
              transform: scale(1.2); 
            }
          }
          
          @keyframes premiumGlow {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(129, 140, 248, 0.3); 
            }
            50% { 
              box-shadow: 0 0 40px rgba(129, 140, 248, 0.6), 0 0 60px rgba(129, 140, 248, 0.3); 
            }
          }
          
          @keyframes premiumSlideIn {
            0% { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            100% { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes premiumRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes premiumBounce {
            0%, 20%, 53%, 80%, 100% { 
              transform: translate3d(0,0,0); 
            }
            40%, 43% { 
              transform: translate3d(0,-30px,0); 
            }
            70% { 
              transform: translate3d(0,-15px,0); 
            }
            90% { 
              transform: translate3d(0,-4px,0); 
            }
          }
          
          /* Premium Scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #818cf8 0%, #a5b4fc 100%);
            border-radius: 4px;
            transition: all 0.3s ease;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #a5b4fc 0%, #c7d2fe 100%);
          }
          
          /* Premium Selection */
          ::selection {
            background: rgba(129, 140, 248, 0.3);
            color: white;
          }
          
          /* Premium Focus States */
          *:focus {
            outline: 2px solid rgba(129, 140, 248, 0.5);
            outline-offset: 2px;
          }
          
          /* Premium Loading States */
          .premium-loading {
            position: relative;
            overflow: hidden;
          }
          
          .premium-loading::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: premiumShine 2s infinite;
          }

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
