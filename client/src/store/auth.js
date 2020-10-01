
const state = {
    count: 0,
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('userId')
}
const mutations = {
    increment(state) {
        state.count++
    },
    setToken(state, { token, userId, username }) {
        state.token = token
        state.username = username
        state.userId = userId
        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
        localStorage.setItem('username', username)
    }
}

const getters = {
    isLoggedIn: () => {
        return state.token !== null;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
}