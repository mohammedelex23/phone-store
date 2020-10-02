import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { emptyCartItems, proceedToCheckout } from '../../redux/actions/cartActions'
import { productEmptyCartItems } from '../../redux/actions/productActions'

function CartTotals(props) {

    const { tax, cartTotal, subtotal } = props.cart
    const dispatch = useDispatch()
    return (
        <React.Fragment>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-10 col-sm-8 mt-2 ml-sm-5
                     ml-md-auto text-capitalize
                      text-right">
                        <Link to="/">
                            <button className="btn btn-outline-danger text-uppercase
                             mb-3 px-5" type="button"
                                onClick={() => {
                                    dispatch(emptyCartItems())
                                    dispatch(productEmptyCartItems())
                                }}
                            >
                                clear cart
                             </button>
                        </Link>
                        <h5>
                            <span className="text-title">
                                subtotal : </span>
                            <strong>$ {subtotal}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">
                                tax : </span>
                            <strong>$ {tax}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">
                                total : </span>
                            <strong>$ {cartTotal}</strong>
                        </h5>
                        <button
                            className="btn mb-3 px-5 btn-warning text-capitalize"
                            onClick={() => props.user ? dispatch(proceedToCheckout()) : props.history.push("/login")}
                        >
                            proceed to checkout
                         </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default withRouter(CartTotals)
