import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isLocal = mode === 'development';
  console.log("mode: ", mode);

  return {
    plugins: [react()],
    server: isLocal
      ? {
          proxy: {
            '/oauth2': {
              target: 'http://localhost:8080',
              changeOrigin: true,
              secure: false,
            },
          },
        }
      : undefined,
  };
});