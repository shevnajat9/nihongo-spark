import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'tts-proxy',
      configureServer(server) {
        server.middlewares.use('/api/tts', async (req, res) => {
          try {
            const url = new URL(req.url, 'http://localhost');
            const q = url.searchParams.get('q') || '';
            if (!q) {
              res.statusCode = 400;
              res.end('Missing q');
              return;
            }
            const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(q.slice(0, 200))}`;
            const fetchRes = await fetch(googleUrl, {
              headers: {
                'Referer': 'https://translate.google.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
              }
            });
            if (!fetchRes.ok) {
              res.statusCode = fetchRes.status;
              res.end('TTS fetch failed');
              return;
            }
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Cache-Control', 'public, max-age=86400');
            const buffer = await fetchRes.arrayBuffer();
            res.end(Buffer.from(buffer));
          } catch (err) {
            res.statusCode = 500;
            res.end(err.message);
          }
        });
      }
    }
  ],
})
