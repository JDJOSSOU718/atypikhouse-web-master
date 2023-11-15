export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        htmlAttrs: {
            lang: 'fr'
        },
        title: 'Atipikhouse',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'apple-mobile-web-app-title',
                name: 'apple-mobile-web-app-title',
                content: 'Atypikhouse'
            },
            {
                hid: 'og:site_name',
                name: 'og:site_name',
                content: 'Atypikhouse'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Archivo:400,400i,500,500i,600,600i,700,700i&display=swap'
            }
        ],
        script: [{ src: 'https://js.stripe.com/v3' }]
    },
    /*
     ** Add server middleware
     ** Nuxt.js uses `connect` module as server
     ** So most of express middleware works with nuxt.js server middleware
     */
    serverMiddleware: [],
    /*
     ** Customize the progress-bar colors
     */
    loading: '~/components/LoadingBar.vue',
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~/plugins/vue-carousel', ssr: false },
        { src: '~/plugins/vue-backtotop', ssr: false },
        { src: '~/plugins/vue-toastification', ssr: false },
        { src: '~/plugins/vueperslides', ssr: false },
        { src: '~/plugins/vue-calendar', ssr: false },
        { src: '~/plugins/vue-stripe', ssr: false }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxtjs/pwa'],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // dotenv
        '@nuxtjs/dotenv',
        // moment
        '@nuxtjs/moment',
        // sitemap
        process.env.ENV == 'production' ? '@nuxtjs/sitemap' : '',
        // recaptcha
        '@nuxtjs/recaptcha',
        // robots
        process.env.ENV == 'production' ? '@nuxtjs/robots' : ''
    ],
    /**
     * PWA config
     *
     */
    pwa: {
        icon: true
    },
    /**
     * Moment options
     *
     */
    moment: {
        locales: ['fr'],
        defaultLocale: 'fr',
        timezone: true,
        defaultTimezone: 'Europe/Paris'
    },
    /*
    /*
    ** Global CSS
    */
    css: [
        './assets/scss/styles/animate.min.css',
        './assets/scss/styles/bootstrap.min.css',
        './assets/scss/styles/fontawesome.min.css',
        './assets/scss/styles/style.css',
        './assets/scss/styles/admin.css',
        './assets/scss/styles/responsive.css',
        './assets/scss/styles/multiselect.css'
    ],
    /** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     ** Add .
     */
    axios: {
        proxy: true,
        baseUrl: 'http://localhost:4000',
        browserBaseURL: 'http://localhost:4000'
    },
    /**
     *
     * Sitemap config
     */
    sitemap: {
        hostname: process.env.BASE_URL_SITEMAP,
        gzip: true,
        exclude: ['/admin', '/admin/**']
        // routes: []
    },

    /**
     *
     * robots
     * 
     *
     */
    robots: {
        Disallow: ['/login', '/admin'],
        Sitemap: `${process.env.BASE_URL_SITEMAP}/sitemap.xml`
    },
    /**
     * recpatcha options
     *
     */

    recaptcha: {
        hideBadge: false,
        language: 'fr',
        mode: 'base',
        siteKey: process.env.RECPATCHA_PK,
        version: 2,
        size: 'normal'
    },
    /*
     ** Globally configure <nuxt-link> default active class.
     */
    router: {
        linkActiveClass: 'active'
    },
    /**
     *
     * server config
     */
    server: {
        port: 8080
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
}
