import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
        allowedHosts: ["plural-mustang-refute.ngrok-free.dev"]
    }, 
  plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})
