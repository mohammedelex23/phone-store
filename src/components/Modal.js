import React from 'react'
import { useDispatch } from 'react-redux'
import { emptyCartItems } from '../redux/actions/cartActions'
import { productEmptyCartItems } from '../redux/actions/productActions'


function Modal({ cart }) {

    const dispatch = useDispatch()
    const { modalIsOpen, loading, error } = cart

    return (
        !modalIsOpen ? <div></div> :
            loading ? <div className="modal-container">loading...</div> :
                error ? <div className="error">{error}</div> :
                    // var body = document.getElementsByTagName('BODY')[0]
                    // body.style.overflow = 'hidden'

                    <div className="modal-container">
                        <div id="modal" tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-success">Payment succeeded</h5>
                                    </div>
                                    <div className="modal-body">
                                        <p>it will be shipped to you after around two days.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button" className="btn btn-secondary" data-dismiss="modal"
                                            onClick={() => {
                                                dispatch(emptyCartItems())
                                                dispatch(productEmptyCartItems())
                                            }}
                                        >
                                            Close
                                </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )

}

/* 
<div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Payment</h5>
                </div>
                <div className="modal-content">
                    Payment succeeded it will be shipped to you after around two days
                </div>
            </div>
        </div>
*/

export default Modal