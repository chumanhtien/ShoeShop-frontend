import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productCreateReviewReducer, productDetailsReducer, productListReducer } from "./Reducers/ProductReducers";
import { cartReducer } from "./Reducers/CartReducers";
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./Reducers/UserReducers";
import { orderCreateReducer, orderDetailsReducer, orderMyListReducer, orderPayReducer } from "./Reducers/OrderReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreateReview: productCreateReviewReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderMyListReducer,
});

//cart
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
: []

//login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;

//shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
? JSON.parse(localStorage.getItem("shippingAddress"))
: {};

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage,
    },
    userLogin: {userInfo: userInfoFromLocalStorage},
};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;