import React, { useEffect } from 'react'
import { increment, decrement, deleteCartItem } from '../../redux/actions/cartActions'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../redux/actions/productActions';

export default function CartItem({ item, value }) {

    const { _id, name, image, price, count, total } = item;

    const dispatch = useDispatch()


    useEffect(() => {

    }, [])


    return (
        <div className="row my-5 my-lg-3 cartItems text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={image} style={{ width: '5rem', height: '5rem' }}
                    className="img-fluid" alt="product" />
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product : </span>
                {name}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price : </span>
                {price}
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="btn btn-black mx-1"
                            onClick={() => dispatch(decrement(item))}
                        >
                            -
                        </span>
                        <span className="btn btn-black mx-1">
                            {count}
                        </span>
                        <span className="btn btn-black mx-1"
                            onClick={() => dispatch(increment(item))}
                        >
                            +
                        </span>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="col-10 mx-auto col-lg-2">
                <div>
                    <i className="fas fa-trash cart-icon"
                        onClick={() => {
                            dispatch(deleteCartItem(_id))
                            dispatch(removeFromCart(_id))
                        }}
                    ></i>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <strong>item total : $ {total}</strong>
            </div>
        </div>
    )
}
