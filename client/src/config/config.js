
export const config = {
    apiUrl: 'http://localhost:8081',
    webSocketUrl: 'ws://localhost:8081'
}

export default {
    install(Vue) {
        Vue.prototype.$config = config
    }
}