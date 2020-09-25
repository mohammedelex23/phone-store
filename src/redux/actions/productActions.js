import Axios from 'axios'
import sessionStorage from 'sessionstorage'
import {
    LIST_PRODUCTS_ERROR,
    LIST_PRODUCTS_REQUEST,
    LIST_PRODUCTS_SUCCESS,
    ADD_TO_CART,
    PRODUCT_DELETE_CART_ITEM,
    PRODUCT_EMPTY_CART_ITEMS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_ERROR
}
    from '../constants/productConstants'

const listProducts = () => (dispatch) => {
    if (sessionStorage.products) {
        var products = JSON.parse(sessionStorage.getItem('products'))
        dispatch({ type: LIST_PRODUCTS_SUCCESS, payload: products })
    } else {
        dispatch({ type: LIST_PRODUCTS_REQUEST })
        Axios.get('/products')
            .then(res => {
                var obj = res.data.products;
                sessionStorage.setItem('products', JSON.stringify(obj))
                dispatch({ type: LIST_PRODUCTS_SUCCESS, payload: res.data.products })
            }).catch(err => {
                dispatch({ type: LIST_PRODUCTS_ERROR, payload: 'Somthing went wrong!' })
            })
    }
}

const addToCart = (id) => (dispatch) => {
    var products = JSON.parse(sessionStorage.getItem('products'))
    products = products.map(product => {
        if (product._id === id) {
            product.inCart = true
            return product
        } else {
            return product
        }
    })
    sessionStorage.setItem('products', JSON.stringify(products))
    dispatch({ type: ADD_TO_CART, payload: products })
}


const removeFromCart = (id) => async (dispatch) => {
    var products = JSON.parse(sessionStorage.getItem('products'))
    products = products.map(product => {
        if (product._id === id) {
            product.inCart = false
            return product
        } else {
            return product
        }
    })
    sessionStorage.setItem('products', JSON.stringify(products))
    dispatch({ type: PRODUCT_DELETE_CART_ITEM, payload: products })

}

const productEmptyCartItems = () => (dispatch) => {
    var products = JSON.parse(sessionStorage.getItem('products'))
    products = products.map(product => {
        product.inCart = false
        return product
    })
    sessionStorage.setItem('products', JSON.stringify(products))
    dispatch({ type: PRODUCT_EMPTY_CART_ITEMS, payload: products })
}


const getProductDetails = (id) => (dispatch) => {
    if (sessionStorage.products) {
        var products = JSON.parse(sessionStorage.getItem('products'))
        var product = products.find(product => product._id === id)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product })
    } else {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        Axios.get('/products/' + id)
            .then(res => {
                dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data.product })
            }).catch(err => {
                dispatch({ type: PRODUCT_DETAILS_ERROR, payload: 'Somthing went wrong!' })
            })
    }
}

export {
    listProducts,
    addToCart,
    getProductDetails,
    removeFromCart,
    productEmptyCartItems
}