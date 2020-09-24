import {ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART} from './actionTypes';

export const addToCart = cartItem => {
    return {
        type: ADD_TO_CART,
        payload: cartItem
    };
};
export const removeFromCart = cartItem => {
    return {
        type: REMOVE_FROM_CART,
        payload: cartItem,
    };
};
export const emptyCart = () => {
    return {
        type: EMPTY_CART,
    };
};