import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS, CART_CLEAR_SHIPPING_ADDRESS, CART_CLEAR_PAYMENT_METHOD
} from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const itemA = action.payload
            const existItem = state.cartItems.find((x) => (x.product === itemA.product && x.size === itemA.size))
            // console.log(existItem)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        (x.product === itemA.product && x.size === itemA.size) ? itemA : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, itemA]
                }
            }

        case CART_REMOVE_ITEM:
            const itemR = action.payload
            return {
                ...state,
                cartItems: state.cartItems.filter(x => (x.product !== itemR.id || x.size !== itemR.size))
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }

        case CART_CLEAR_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: []
            }

        case CART_CLEAR_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: []
            }

        default:
            return state
    }
}
