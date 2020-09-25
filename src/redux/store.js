import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import {cartReducer } from './reducers/cartReducers'
import userReducer from './reducers/userReducers'

const initialState = {}
const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer
})

const composEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose



const store = createStore(reducers, initialState, composEnhancer(applyMiddleware(thunk)))

export default store