import axios from "axios";
import { CART_CLEAR_ITEMS } from "../Constants/CartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, 
    ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, 
    ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../Constants/OrderConstants";
import { logout } from "./UserActions"

//CREATE ORDER
export const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({type: ORDER_CREATE_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        
        const {data} = await axios.post(
            `/api/orders`, 
            order,
            config
        );
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data});
        dispatch({type: CART_CLEAR_ITEMS, payload: data});

        localStorage.removeItem("cartItems");

        //DKI thanh cong => Dang nhap luon
        // dispatch({type: USER_LOGIN_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === "Not authorized, no token") {
            dispatch(logout())
        } 
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message
        });
    }
};

//GET SINGLE ORDER DETAILS
export const getSingleOrderDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        
        const {data} = await axios.get(
            `/api/orders/${id}`, 
            config
        );
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});


        //DKI thanh cong => Dang nhap luon
        // dispatch({type: USER_LOGIN_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === "Not authorized, no token") {
            dispatch(logout())
        } 
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message
        });
    }
};

//ORDER PAY
export const payOrder = (orderId, paymentResult) => async(dispatch, getState) => {
    try {
        dispatch({type: ORDER_PAY_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        
        const {data} = await axios.put(
            `/api/orders/${orderId}/pay`, 
            paymentResult,
            config
        );
        dispatch({type: ORDER_PAY_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if (message === "Not authorized, no token") {
            dispatch(logout())
        } 
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message
        });
    }
};