import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        products: resolve(__dirname, 'products.html'),
        productDetail: resolve(__dirname, 'product-detail.html'),
        about: resolve(__dirname, 'about.html'),
        campaigns: resolve(__dirname, 'campaigns.html'),
        storeLocator: resolve(__dirname, 'store-locator.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html'),
        newsletter: resolve(__dirname, 'newsletter.html'),
      },
    },
  },
})
