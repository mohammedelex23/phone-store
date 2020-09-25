import {
    LIST_PRODUCTS_ERROR,
    LIST_PRODUCTS_REQUEST,
    LIST_PRODUCTS_SUCCESS,
    ADD_TO_CART,
    PRODUCT_DELETE_CART_ITEM,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_ERROR,
    PRODUCT_EMPTY_CART_ITEMS
}
    from '../constants/productConstants'

let initialState = { products: [] }

function productListReducer(state = initialState, action) {
    switch (action.type) {
        case LIST_PRODUCTS_REQUEST:
            return { products: [], loading: true, error: null }
        case LIST_PRODUCTS_SUCCESS:
            return { products: action.payload, loading: false, error: null }
        case LIST_PRODUCTS_ERROR:
            return { products: [], loading: false, error: action.payload }
        case ADD_TO_CART:
            return {
                ...state,
                products: action.payload
            }
        case PRODUCT_DELETE_CART_ITEM:
            return {
                ...state,
                products: action.payload
            }
        case PRODUCT_EMPTY_CART_ITEMS:
            return { products: action.payload }
        default:
            return state
    }
}

function productDetailsReducer(state = { product: {} }, action) {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { product: {}, loading: true, error: null }
        case PRODUCT_DETAILS_SUCCESS:
            return { product: action.payload, loading: false, error: null }
        case PRODUCT_DETAILS_ERROR:
            return { product: {}, loading: false, error: action.payload }
        default:
            return state
    }
}




export {
    productListReducer,
    productDetailsReducer
}