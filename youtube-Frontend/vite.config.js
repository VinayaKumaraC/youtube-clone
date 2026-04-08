import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

//connect tailwind with vite
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
