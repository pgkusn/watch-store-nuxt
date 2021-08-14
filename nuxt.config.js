const authApiUrl = {
    dev: 'http://localhost:4001',
    sit: 'https://identitytoolkit.googleapis.com/v1',
    prod: 'https://identitytoolkit.googleapis.com/v1'
};
const dbApiUrl = {
    dev: 'http://localhost:4001',
    sit: 'https://perfume-8b21d-default-rtdb.firebaseio.com',
    prod: 'https://perfume-8b21d-default-rtdb.firebaseio.com'
};

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
        '@nuxtjs/composition-api/module'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        'cookie-universal-nuxt'
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
    loading: {
        color: '#1D1E2C'
    },
    server: {
        host: '0.0.0.0'
    },
    router: {
        base: '/'
    },
    env: {
        FIREBASE_API_KEY: 'AIzaSyCe0etdPskhxSxGh0w_IdZt3FDqcDQWbOo',
        AUTH_API_URL: authApiUrl[process.env.NODE_ENV],
        DB_API_URL: dbApiUrl[process.env.NODE_ENV]
    }
};
