import React from 'react'
import CartItem from './CartItem'

export default function CartList({cart}) {
    return (
        <div className="container-fluid">
            {cart.cartItems.map(item => {
                return <CartItem key={item._id} item={item} 
                value={cart}/>
            })}
        </div>
    )
}
