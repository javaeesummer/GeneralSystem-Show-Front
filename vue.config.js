module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8888,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://47.104.236.227:8080/summar',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
        },
        before: app => { }
        
    },
}