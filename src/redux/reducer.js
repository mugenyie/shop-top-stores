import {ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART} from './actionTypes';

const ShoppinReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.payload]
        case REMOVE_FROM_CART:
            return state.filter(cartItem => cartItem.id !== action.payload.id)
        case EMPTY_CART:
            return []
        default:
            return state;
    }
};
export {ShoppinReducer};