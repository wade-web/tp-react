// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     port: 3000,
//     proxy: {
//       '/api': {
//         target: 'https://tp-react-snowy.vercel.app',
//         changeOrigin: true
//       }
//     }
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      // CORRECTION : Pointez vers votre backend Render, pas vers Vercel
      '/api': {
        target: 'https://backend-tp-km23.onrender.com', // Votre backend Render
        changeOrigin: true,
        secure: false, // Important pour Render
        rewrite: (path) => path
      }
    }
  }
})
