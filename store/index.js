// cookies
import Cookies from 'js-cookie'

const baseUrl = process.env.APIBASEURI
const defaultCookieName = 'atipikhouse'
const state = () => ({
    cart: [],
    totalAmount: 0,
    totalQuantity: 0,
    orders: [],
    apiBaseUrl: baseUrl,
    authUser: Cookies.get(defaultCookieName) ? JSON.parse(Cookies.get(defaultCookieName)) : null,
})

export const totals = paylodArr => {
    const totalAmount = paylodArr
        .map(cartArr => {
            return cartArr.price * cartArr.quantity
        })
        .reduce((a, b) => a + b, 0)

    const totalQuantity = paylodArr
        .map(cartArr => {
            return cartArr.quantity
        })
        .reduce((a, b) => a + b, 0)

    return {
        amount: totalAmount,
        qty: totalQuantity
    }
}
const mutations = {
    SET_USER(state, user) {
        state.authUser = user
    },
    GET_ORDER(state, payload) {
        state.orders = payload
    },
    GET_CART(state, payload) {
        state.cart = payload
        state.totalAmount = totals(payload).amount
        state.totalQuantity = totals(payload).qty
    },
    ADD_TO_CART(state, payload) {
        state.cart = [...state.cart, ...payload]
        state.totalAmount = totals(state.cart).amount
        state.totalQuantity = totals(state.cart).qty
    },
    DELETE_CART(state, id) {
        const currentCartToDelete = state.cart
        const indexToDelete = currentCartToDelete.findIndex(cart => {
            return cart.id == id
        })

        state.cart = [
            ...currentCartToDelete.slice(0, indexToDelete),
            ...currentCartToDelete.slice(indexToDelete + 1)
        ]
        state.totalAmount = totals(state.cart).amount
        state.totalQuantity = totals(state.cart).qty
    },
    UPDATE_CART(state, payload) {
        state.cart = payload

        state.totalAmount = totals(payload).amount
        state.totalQuantity = totals(payload).qty
    },
    CART_EMPTY(state) {
        state.cart = []
        state.totalAmount = 0
        state.totalQuantity = 0
    }
}

const actions = {
    async login({ commit }, { email, password }) {
        try {
            const { success, data } = await this.$axios.$post(baseUrl + '/api/v1/login/', {
                email,
                password
            })
            let user = null
            if (success) {
                user = {
                    id: data.id,
                    last_name: data.last_name,
                    first_name: data.first_name,
                    email: data.email,
                    address: data.address,
                    phone: data.phone,
                    social_link: data.social_link,
                    grade: data.grade,
                    login_session_token: data.login_session_token,
                    confirmation_token: data.confirmation_token
                }
            }
            commit('SET_USER', user)
            // req.authUser = user
            Cookies.set(defaultCookieName, JSON.stringify(user), { expires: 1 })
            return user
        } catch (error) {
            if (error.response && error.response.status === 401) {
                throw new Error('Wrong credentials!')
            }
            throw error
            return false
        }
    },

    async logout({ commit }, id) {
        const { success } = await this.$axios.$delete(baseUrl+'/api/v1/login/'+id)
        if (success) {
            commit('SET_USER', null)
            Cookies.remove(defaultCookieName)
        }
    },

    addToCart({ commit }, payload) {
        commit('ADD_TO_CART', payload)
    },

    deleteCart({ commit }, id) {
        commit('DELETE_CART', id)
    },

    updateCart({ commit }, payload) {
        // console.log(payload.unit)
        const currentCartToUpdate = payload.cart
        const indexToUpdate = currentCartToUpdate.findIndex(cart => {
            return cart.id == payload.id
        })

        const newCart = {
            ...currentCartToUpdate[indexToUpdate],
            quantity: currentCartToUpdate[indexToUpdate].quantity + payload.unit
        }

        // console.log(newCart)

        const cartUpdate = [
            ...currentCartToUpdate.slice(0, indexToUpdate),
            newCart,
            ...currentCartToUpdate.slice(indexToUpdate + 1)
        ]
        commit('UPDATE_CART', cartUpdate)
    },
    cartEmpty({ commit }) {
        commit('CART_EMPTY')
    }
}

const getters = {
    cart(state) {
        return state.cart
    },
    totalAmount(state) {
        return state.totalAmount
    },
    totalQuantity(state) {
        return state.totalQuantity
    },
    getOrders(state) {
        return state.orders
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
