import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = never
declare module "../../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_qvuatha57ukqh7gg4mt7eeyqci/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}