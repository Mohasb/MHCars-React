import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDemo = mode === 'demo'
  return {
    plugins: [react()],
    // La demo se publica en https://mohasb.github.io/MHCars-React/
    base: isDemo ? '/MHCars-React/' : '/',
    resolve: {
      // En la demo no se envían correos reales
      alias: isDemo
        ? { '@emailjs/browser': fileURLToPath(new URL('./src/demo/emailjs-stub.js', import.meta.url)) }
        : {},
    },
  }
})
