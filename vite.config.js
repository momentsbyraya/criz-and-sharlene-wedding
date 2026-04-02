import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

// Custom plugin to copy assets and Netlify headers
function copyAssetsPlugin() {
  return {
    name: 'copy-assets',
    writeBundle() {
      const copyDir = (src, dest) => {
        if (!existsSync(dest)) {
          mkdirSync(dest, { recursive: true })
        }
        
        const items = readdirSync(src)
        items.forEach(item => {
          const srcPath = join(src, item)
          const destPath = join(dest, item)
          
          if (statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath)
          } else {
            copyFileSync(srcPath, destPath)
          }
        })
      }
      
      copyDir('assets', 'dist/assets')
      
      // Copy _headers file from public to dist root for Netlify
      if (existsSync('public/_headers')) {
        copyFileSync('public/_headers', 'dist/_headers')
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyAssetsPlugin()],
  server: {
    port: 3000,
    open: true,
    host: true,
    allowedHosts: [
      'subadministrative-alice-scrofulously.ngrok-free.dev',
      '.ngrok-free.dev',
      '.ngrok.io'
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap': ['gsap'],
        },
      },
    },
  },
  publicDir: 'assets'
}) 