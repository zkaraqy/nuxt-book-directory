import { resolve } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  runtimeConfig: {
    accessTokenLifeTime: 60 * 60 * 2,
    jwtAccessSecret:
      "UoPkdIzYgL78CQ9+oPdiGVkJPJReWjDk2NhssHYkJUI2oYX9uWZfh3AvNhNPKJz7y96g0RoaW/2TSEyQ2MTbyg==",
    jwtRefreshSecret:
      "tf3LYQRiuF6vAdy6heYb26O3gE7ekj0NV8hcXuhfkuV8Q+D9ZUjj7VmjlzAa+TTU3XobbldpSchQMqbuMjZivQ==",
    public: {
      cookieLifeTime: 60 * 60 * 24 * 30 || 3600,
    },
    storagePath: process.env.STORAGE || "./storage",
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'development',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'book_directory',
    port: Number(process.env.DB_PORT) || 3306,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image'
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  alias: {
    '#tailwind-config/theme/colors': resolve('./utils/tailwind-colors.ts')
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  }
})