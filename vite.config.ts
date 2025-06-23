import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss()],
  optimizeDeps: {
    include: [
      '@vueuse/core',
      '@vueuse/motion',
      'motion-v',
      'clsx',
      'tailwind-merge',
      'class-variance-authority'
    ]
  },
  ssr: {
    noExternal: ['@vueuse/core', '@vueuse/motion', 'motion-v']
  },
  build: {
    // aumenta o limite de aviso opcionalmente
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks: {
          // separa a lib Scalar num chunk isolado
          'scalar-api': ['@scalar/api-reference'],
          // separa os hooks VueUse num bundle à parte
          'vueuse': ['@vueuse/core', '@vueuse/motion'],
          // separa libs de utilidade CSS
          'tailwind-utils': ['tailwind-merge', 'clsx', 'class-variance-authority']
        }
      }
    }
  }
})
