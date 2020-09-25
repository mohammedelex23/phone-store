import sessionStorage from 'sessionstorage'
import * as c from '../constants/cartConstants'
import Axios from 'axios'
import localStorage from 'localStorage'

const handleAddToCart = (product) => (dispatch) => {
    if (sessionStorage.cart) {
        let cart = JSON.parse(sessionStorage.getItem('cart'))
        let updatedProduct = { ...product }
        updatedProduct.count = 1
        updatedProduct.total = updatedProduct.price
        cart.cartTotal = updatedProduct.price

        cart.cartItems.push(updatedProduct)

        cart = calculate(cart)

        sessionStorage.setItem('cart', JSON.stringify(cart))
        dispatch({ type: c.HANDLE_ADD_TO_CART_SUCCESS, payload: cart })
    } else {
        let cart = { cartItems: [], tax: 0, cartTotal: 0, subtotal: 0, modalIsOpen: false }
        let updatedProduct = { ...product }
        updatedProduct.count = 1
        updatedProduct.total = updatedProduct.price
        cart.cartTotal = updatedProduct.price


        cart.cartItems.push(updatedProduct)
        cart = calculate(cart)


        sessionStorage.setItem('cart', JSON.stringify(cart))
        dispatch({ type: c.HANDLE_ADD_TO_CART_SUCCESS, payload: cart })
    }
}

const getCartItems = () => (dispatch) => {
    if (sessionStorage.cart) {
        let cart = JSON.parse(sessionStorage.getItem('cart'))

        dispatch({ type: c.GET_CART_ITEMS, payload: cart })
    } else {
        dispatch({ type: c.GET_CART_ITEMS, payload: { cartItems: [], tax: 0, cartTotal: 0, subtotal: 0, modalIsOpen: false } })
    }

}

const increment = (item) => (dispatch) => {
    let cart = JSON.parse(sessionStorage.getItem('cart'))
    let updatedItem = cart.cartItems.find(found => found._id === item._id)
    updatedItem.count = updatedItem.count + 1
    updatedItem.total = updatedItem.count * updatedItem.price

    cart = calculate(cart)

    cart.cartItems = cart.cartItems.map(found => {
        if (found._id === updatedItem._id) {
            return updatedItem;
        } else {
            return found
        }
    })
    sessionStorage.setItem('cart', JSON.stringify(cart))
    dispatch({ type: c.INCREMENT, payload: cart })
}

const decrement = (item) => (dispatch) => {
    let cart = JSON.parse(sessionStorage.getItem('cart'))
    let updatedItem = cart.cartItems.find(found => found._id === item._id)
    updatedItem.count = updatedItem.count === 1 ? updatedItem.count : updatedItem.count - 1
    updatedItem.total = updatedItem.count * updatedItem.price

    cart = calculate(cart)

    cart.cartItems = cart.cartItems.map(found => {
        if (found._id === updatedItem._id) {
            return updatedItem;
        } else {
            return found
        }
    })
    sessionStorage.setItem('cart', JSON.stringify(cart))
    dispatch({ type: c.DECREMENT, payload: cart })
}

const deleteCartItem = (id) => (dispatch) => {
    let cart = JSON.parse(sessionStorage.getItem('cart'))
    cart.cartItems = cart.cartItems.filter(cartItem => {
        return cartItem._id !== id
    })

    cart = calculate(cart)
    sessionStorage.setItem('cart', JSON.stringify(cart))
    dispatch({ type: c.DELETE_CART_ITEM, payload: cart })
}

const emptyCartItems = () => (dispatch) => {
    sessionStorage.removeItem('cart')
    dispatch({ type: c.EMPTY_CART_ITEMS, payload: { cartItems: [], tax: 0, cartTotal: 0, subtotal: 0, modalIsOpen: false } })
}

function calculate(cart) {
    let updatedCart = { ...cart }
    let subTotal = 0;
    updatedCart.cartItems.map(item => (subTotal += item.total))

    const tempTax = subTotal * 0.1;
    updatedCart.tax = parseFloat(tempTax.toFixed(2));
    updatedCart.cartTotal = subTotal + tempTax
    updatedCart.subtotal = subTotal
    return updatedCart
}

const proceedToCheckout = () => (dispatch) => {
    dispatch({type: c.PROCEED_TO_CHECKOUT_REQUEST})
    // read cart items
    const { cartItems, cartTotal } = JSON.parse(sessionStorage.getItem('cart'))
    let products = []
    cartItems.map(item => {
        let obj = new Object()
        obj.name = item.name
        obj.price = item.price
        obj.count = item.count
        products.push(obj)
    })
    const user = JSON.parse(localStorage.getItem('user'))
    console.log('proceedToCheckout', user)
    Axios({
        method: "POST",
        url: "/orders",
        data: {
            username: user.username,
            order: {
                total: cartTotal,
                products: products
            }
        }
    })
    .then(result => {
        if (result.data.success) {
            dispatch({type: c.PROCEED_TO_CHECKOUT_SUCCESS})
        }
    }).catch(err => dispatch({type: c.PROCEED_TO_CHECKOUT_ERROR, payload: err}))
}


export {
    handleAddToCart,
    getCartItems,
    increment,
    decrement,
    deleteCartItem,
    emptyCartItems,
    proceedToCheckout
}