import React, { useEffect } from 'react'
import Title from '../Title'
import CartColumns from './CartColumns'
import EmptyCart from './EmptyCart'
import CartList from './CartList'
import CartTotals from './CartTotals'
import { useSelector, useDispatch } from 'react-redux'
import { getCartItems } from '../../redux/actions/cartActions'
import Modal from '../Modal'
import localStorage from 'localStorage'

function Cart() {

    const user = JSON.parse(localStorage.getItem('user'))

    const cartReducer = useSelector(state => state.cart)
    const { cart } = cartReducer;
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(getCartItems())
    }, [])

    if (cart.cartItems.length === 0) {
        return <EmptyCart />
    } else {
        return (
            <section>
                <React.Fragment>
                    <Title name="your" title="cart" />
                    <CartColumns />
                    <CartList cart={cart} />
                    <CartTotals cart={cart} user={user} />
                    <Modal cart={cart} />
                </React.Fragment>
            </section>
        )
    }


}

export default Cart
