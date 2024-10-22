import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',  // Ensure the host is set
    port: 5173,         // Set the port explicitly (change if needed)
    hmr: {
      protocol: 'ws',  // Explicitly define WebSocket protocol
      host: 'localhost', // Ensure WebSocket connects to the right host
      port: 5173,        // Match this to the port you're running on
    }
  }
})
