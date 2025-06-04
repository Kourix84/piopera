import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        mystery: './mysterybox.html',
        sidequest: './sideQuest.html',
        quizgame: './quizGame.html',
        rulebook: './rulebook.html'
      }
    }
  }
});
