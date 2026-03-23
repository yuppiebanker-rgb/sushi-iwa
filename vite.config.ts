import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/recharts')) {
            return 'vendor-charts'
          }
          if (id.includes('node_modules/yet-another-react-lightbox') || id.includes('node_modules/qrcode.react')) {
            return 'vendor-ui'
          }
          if (id.includes('/pages/staff/') && !id.includes('StaffLogin')) {
            return 'staff-portal'
          }
        }
      }
    }
  }
})
