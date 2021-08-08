export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Watch Store',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'format-detection', content: 'telephone=no' },
            { property: 'og:url', content: 'https://kenge-watch-store.herokuapp.com/' },
            { property: 'og:type', content: 'website' },
            { property: 'og:title', content: 'Sweetaste' },
            { property: 'og:image', content: 'https://kenge-watch-store.herokuapp.com/images/hero.jpg' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.svg' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/scss/tailwind.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '@/plugins/current-device.js', mode: 'client' },
        { src: '@/plugins/directives.js', mode: 'client' },
        { src: '@/plugins/localStorage.js', mode: 'client' },
        { src: '@/plugins/nprogress.js', mode: 'client' },
        { src: '@/plugins/aos.js', mode: 'client' },
        { src: '@/plugins/sweetalert2.js', mode: 'client' },
        { src: '@/plugins/day.js', mode: 'client' },
        { src: '@/plugins/authAPI.js' },
        { src: '@/plugins/dbAPI.js' }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: false,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/eslint-module',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/composition-api/module',
        ['@nuxtjs/dotenv', { filename: '.env.' + process.env.NODE_ENV }]
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        babel: {
            plugins: [
                ['@babel/plugin-proposal-private-methods', { loose: true }]
            ]
        },
        extractCSS: true
    },
    server: {
        host: '0.0.0.0'
    },
    router: {
        base: '/'
    },
    loading: {
        color: '#1D1E2C'
    }
};
