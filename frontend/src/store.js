import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from  'redux-thunk'
import { composeWithDevTools } from'redux-devtools-extension'
import  { productListReducers } from './reducers/productReducers'
import  { productDetailsReducers } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})


const cardItemsFromStorage = localStorage.getItem('cardItems')
    ? JSON.parse(localStorage.getItem('cardItems')) 
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

const initialState = {
    cart: { cartItems: cardItemsFromStorage },
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store