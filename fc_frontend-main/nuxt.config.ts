// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/device",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true, styles: true }));
      });
    },
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
    ],
  },
  build: {
    transpile: ["vuetify"],
  },
  css: ["@mdi/font/css/materialdesignicons.min.css"],
  // modules: [
  //   (_options, nuxt) => {
  //     nuxt.hooks.hook("vite:extendConfig", (config) => {
  //       // @ts-expect-error
  //       config.plugins.push(vuetify({ autoImport: true }));
  //     });
  //   },
  //   //...
  // ],
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  device: {
    refreshOnResize: true,
  },
  // vuetify: {
  //   vuetifyOptions:{
  //     theme: {
  //       themes: {
  //         light: {
  //           colors: {
  //             portalColor: '#009F8A',
  //             errorSnackbar: '#FF8A80',
  //             errorSnackbarLoading: '#D50000',
  //             successSnackbar: '#5cb85c',
  //             successSnackbarLoading: '#5cb85c',
  //             infoSnackbar: '#5bc0de',
  //             infoSnackbarLoading: '#5bc0de',
  //             warningSnackbar: '#f0ad4e',
  //             warningSnackbarLoading: '#f0ad4e',
  //             confirmSnackbar: '#EEEEEE',
  //             confirmSnackbarLoading: '#BDBDBD',
  //           }
  //         }
  //       },
  //     },
  //   },
  //   moduleOptions: {
  //     // treeshaking: true,
  //     // useIconCDN: true,
  //     importComposables: false,
  //     styles: true,
  //   },
  //   // autoImport: true,
  // },
  runtimeConfig: {
    public: {
      baseURL: "http://localhost:3333",
    },
  },
  ssr: false,
});
