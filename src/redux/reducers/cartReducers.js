import * as c from '../constants/cartConstants'

function cartReducer(state = { cart: { cartItems: [], tax: 0, cartTotal: 0, subtotal: 0, modalIsOpen: false } }, action) {
    switch (action.type) {
        case c.GET_CART_ITEMS:
            return { cart: action.payload }
        case c.INCREMENT:
            return { ...state, cart: action.payload }
        case c.DECREMENT:
            return { ...state, cart: action.payload }
        case c.DELETE_CART_ITEM:
            return { ...state, cart: action.payload }
        case c.EMPTY_CART_ITEMS:
            return { cart: { cartItems: [], tax: 0, cartTotal: 0, subtotal: 0 } }
        case c.HANDLE_ADD_TO_CART_REQUEST:
            return { cart: {}, loading: true, error: null }
        case c.HANDLE_ADD_TO_CART_SUCCESS:
            return { cart: action.payload, loading: false, error: null }
        case c.HANDLE_ADD_TO_CART_ERROR:
            return { cart: {}, loading: false, error: action.payload }
        case c.PROCEED_TO_CHECKOUT_REQUEST:
            return { ...state, loading: true, error: null }
        case c.PROCEED_TO_CHECKOUT_SUCCESS:
            return { ...state, cart: {...state.cart, modalIsOpen: true}, loading: false, error: null }
        case c.PROCEED_TO_CHECKOUT_ERROR:
            return { ...state, modalIsOpen: false, loading: false, error: action.payload }
        default:
            return state
    }
}




export {
    cartReducer
}