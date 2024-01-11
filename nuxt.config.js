export default {
    components: [
        '~/components', // le chemin peut varier en fonction de votre structure
    ],
    head: {
        htmlAttrs: {
            lang: 'fr',
        },
        title: 'Atipikhouse',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'apple-mobile-web-app-title',
                name: 'apple-mobile-web-app-title',
                content: 'Atypikhouse',
            },
            {
                hid: 'og:site_name',
                name: 'og:site_name',
                content: 'Atypikhouse',
            },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Archivo:400,400i,500,500i,600,600i,700,700i&display=swap',
            },
        ],
        script: [{ src: 'https://js.stripe.com/v3' }],
    },
    serverMiddleware: [],
    loading: '~/components/LoadingBar.vue',
    plugins: [
        { src: '~/plugins/vue-carousel', ssr: false },
        { src: '~/plugins/vue-backtotop', ssr: false },
        { src: '~/plugins/vue-toastification', ssr: false },
        { src: '~/plugins/vueperslides', ssr: false },
        { src: '~/plugins/vue-calendar', ssr: false },
        { src: '~/plugins/vue-stripe', ssr: false },
    ],
    buildModules: ['@nuxtjs/pwa'],
    modules: [
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios',
        '@nuxtjs/dotenv',
        '@nuxtjs/moment',
        '@nuxtjs/sitemap',
        '@nuxtjs/recaptcha',
        '@nuxtjs/robots',
    ],
    pwa: {
        icon: true,
    },
    moment: {
        locales: ['fr'],
        defaultLocale: 'fr',
        timezone: true,
        defaultTimezone: 'Europe/Paris',
    },
    css: [
        './assets/scss/styles/animate.min.css',
        './assets/scss/styles/bootstrap.min.css',
        './assets/scss/styles/fontawesome.min.css',
        './assets/scss/styles/style.css',
        './assets/scss/styles/admin.css',
        './assets/scss/styles/responsive.css',
        './assets/scss/styles/multiselect.css',
    ],
    axios: {
        proxy: true,
        baseUrl: 'http://localhost:4000',
        browserBaseURL: 'http://localhost:4000',
    },
    sitemap: {
        hostname: process.env.BASE_URL_SITEMAP,
        gzip: true,
        exclude: ['/admin', '/admin/**'],
    },
    robots: {
        Disallow: ['/login', '/admin'],
        Sitemap: `${process.env.BASE_URL_SITEMAP}/sitemap.xml`,
    },
    recaptcha: {
        hideBadge: false,
        language: 'fr',
        mode: 'base',
        siteKey: process.env.RECPATCHA_PK,
        version: 2,
        size: 'normal',
    },
    router: {
        linkActiveClass: 'active',
    },
    server: {
        port: 8080,
    },
    build: {
        extend(config, ctx) {},
    },
};

// Add console logs for testing purposes
console.log ('Merged Nuxt.js configuration loaded successfully!');
console.log('Server port:', 8080);
console.log('Axios base URL:', 'http://localhost:4000');
console.log('Recaptcha public key:', process.env.RECPATCHA_PK);
console.log('Sitemap hostname:', process.env.BASE_URL_SITEMAP);
// ... add more console logs as needed
