import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const repoName = 'zonecropper-ai'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
  optimizeDeps: {
    include: ['pdfjs-dist'],
  },
})
