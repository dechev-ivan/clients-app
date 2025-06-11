export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',

    runtimeConfig: {
        REQRES_API_KEY: process.env.REQRES_API_KEY,
    },

    modules: ['@pinia/nuxt'],

    css: [
        '~/assets/scss/common.scss',
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ['legacy-js-api'],

                    additionalData:
                        `
                @import "./assets/scss/shared/_variables.scss";
                @import "./assets/scss/shared/_mixins.scss";
              `,
                },
            },
        },
    },
});
