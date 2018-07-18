module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8888,
        https: false,
        hotOnly: false,
        
        proxy: {
            '/api': {
                target: '',
                ws: true,
                // changeOrigin: true,
            },
        },
        before: app => { }
    },
}