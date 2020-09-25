import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Product from './Product'
import Title from './Title'
import { listProducts } from '../redux/actions/productActions'


function ProductsList(props) {

    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()

    const initFetch = useCallback(() => {
        dispatch(listProducts())
    },[dispatch])

    useEffect(() => {
        initFetch()
    }, [initFetch])

    return (
        loading ? <div className='loading'>loading...</div> :
            error ? <div>{error}</div> :
                <React.Fragment>
                    <div className="py-5">
                        <div className="container">
                            <Title name="our" title="products" />
                            <div className="row">
                                {
                                    products.map(product =>
                                        <Product key={product._id} product={product} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </React.Fragment>
    )

}

export default ProductsList


