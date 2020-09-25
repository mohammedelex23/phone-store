import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'
import { ButtonContainer } from './Button'
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails, addToCart } from '../redux/actions/productActions';
import { handleAddToCart } from '../redux/actions/cartActions';



function Details(props) {
    let productId = props.location.search.split("=")[1]
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails
    const { _id, name, image, price, company, description, inCart } = product;

    const dispatch = useDispatch()

    const initFetch = useCallback(() => {
        dispatch(getProductDetails(productId))
    },[productId,dispatch])

    useEffect(() => {
        initFetch()
    }, [initFetch])

    return (
        loading ? <div className="loading">loading...</div> :
            error ? <div>{error}</div> :
                <React.Fragment>

                    <div className="container py-5">
                        {/* title */}
                        <div className="row">
                            <div className="col-10 mx-auto my-5 text-center text-slanted text-blue">
                                <h1>{name}</h1>
                            </div>
                        </div>
                        {/* end title */}
                        {/* product info */}
                        <div className="row">
                            <div className="col-10 col-md-6 mx-auto my-3">
                                <img src={image} className="img-fluid" alt="product" />
                            </div>
                            {/* product text */}
                            <div className="col-10 col-md-6 mx-auto my-3 text-capitalize">
                                <h2>model : {name}</h2>
                                <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                    made by : <span className="text-uppercase">
                                        {company}
                                    </span>
                                </h4>
                                <h4 className="text-blue">
                                    <strong>
                                        price : <span>$</span>
                                        {price}
                                    </strong>
                                </h4>
                                <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                    some info about product:
                                </p>
                                <p className="text-muted lead">
                                    {description}
                                </p>
                                {/* buttons */}
                                <div>
                                    <Link to="/">
                                        <ButtonContainer>
                                            back to products
                                        </ButtonContainer>
                                    </Link>
                                    <ButtonContainer
                                        inCart={inCart}
                                        disabled={inCart ? true : false}
                                        onClick={() => {
                                            dispatch(addToCart(_id))
                                            dispatch(handleAddToCart(product))
                                            dispatch(getProductDetails(_id))
                                        }}
                                    >
                                        {inCart ? 'inCart' : 'add to cart'}
                                    </ButtonContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        </React.Fragment>
    )
}

export default Details
