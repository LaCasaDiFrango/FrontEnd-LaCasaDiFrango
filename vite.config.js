import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('passage-'),
        },
      },
    }),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'icons/android/android-launchericon-192-192.png',
        'icons/android/android-launchericon-512-512.png',
      ],
      manifest: {
        name: 'La Casa Di Frango',
        short_name: 'La Casa Di Frango',
        description:
          'Peça seu frango assado com praticidade! Escolha entre frango sem recheio, recheado e outras delícias com o tempero caseiro que você ama. Faça seu pedido pelo app e saboreie o melhor frango da cidade!',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#1b3d1f',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/android/android-launchericon-192-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/icons/android/android-launchericon-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        screenshots: [
          {
            src: '/screenshots/Tela_Inicial.png',
            sizes: '397x861',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Tela inicial do aplicativo La Casa Di Frango',
          },
          {
            src: '/screenshots/Tela_Login.png',
            sizes: '397x866',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Tela de login do aplicativo',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
