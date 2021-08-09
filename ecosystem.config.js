module.exports = {
    apps: [{
        name: 'wayne1894_nuxt',
        script: './node_modules/nuxt-start/bin/nuxt-start.js',
        instances: 'max', // 負載平衡模式下的 cpu 數量
        exec_mode: 'cluster', // cpu 負載平衡模式
        max_memory_restart: '1G', // 緩存了多少記憶體重新整理
        port: 3002 // 指定伺服器上的 port
    }]
};