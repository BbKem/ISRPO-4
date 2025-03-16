import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "https://api.deezer.com", // Укажите целевой URL
        changeOrigin: true, // Изменяет заголовок Origin на целевой URL
        secure: false, // Отключает проверку SSL, если целевой сервер использует самоподписанный сертификат
        rewrite: (path) => path.replace(/^\/api/, '') // Опционально: переписывает путь, удаляя /api
      }
    }
  }
})
