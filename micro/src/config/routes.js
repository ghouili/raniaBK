const ROUTES = [
    // {
    //     url: '/google',
    //     auth: false,
    //     permissions: ['admin', 'pdv', 'finance'],
    //     rateLimit: {
    //         windowMs: 15 * 60 * 1000,
    //         max: 100
    //     },
    //     proxy: {
    //         target: "https://www.google.com",
    //         changeOrigin: true,
    //         pathRewrite: {
    //             [`^/google`]: '',
    //         },
    //     }
    // },
    {
        url: '/credit',
        auth: false,
        permissions: ['admin', 'pdv', 'finance'],
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 100
        },
        proxy: {
            target: "http://localhost:5004",
            changeOrigin: true,
            pathRewrite: {
                [`^/credit`]: '',
            },
        }
    },
    {
        url: '/offre',
        auth: false,
        permissions: ['admin', 'pdv', 'finance'],
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 100
        },
        proxy: {
            target: "http://localhost:5003",
            changeOrigin: true,
            pathRewrite: {
                [`^/offre`]: '',
            },
        }
    },
    {
        url: '/service',
        auth: false,
        permissions: ['admin', 'pdv', 'finance'],
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 100
        },
        proxy: {
            target: "http://localhost:5002",
            changeOrigin: true,
            pathRewrite: {
                [`^/service`]: '',
            },
        }
    },
    {
        url: '/user',
        auth: false,
        permissions: ['admin', 'pdv', 'finance'],
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 1000
        },
        // proxy: {
        //     target: "http://localhost:5001",
        //     changeOrigin: true,
        //     pathRewrite: {
        //         [`^/user/(.*)`]: '/$1',
        //     },

        // }
        proxy: {
            target: "http://localhost:5001",
            changeOrigin: true,
            pathRewrite: {
                '^/user/': '',
            }

        }

    }
]

exports.ROUTES = ROUTES;