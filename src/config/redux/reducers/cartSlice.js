import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addItem: (state, action) => {
            const index = state.cart.findIndex(item => item.id === action.payload.id);
            if (index === -1) {
                console.log("Item not in cart, adding new item.");
                action.payload.quantity = 1;
                state.cart.push(action.payload);
            } else {
                console.log("Item already in cart, increasing quantity.");
                state.cart[index].quantity += 1;
            }
            console.log("Cart after addItem:", state.cart);
        },
        removeItem: (state, action) => {
            const index = state.cart.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
            console.log("Cart after removeItem:", state.cart);
        },
        addQuantity: (state, action) => {
            const index = state.cart.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.cart[index].quantity += 1;
            }
            console.log("Cart after addQuantity:", state.cart);
        },
        lessQuantity: (state, action) => {
            const index = state.cart.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                if (state.cart[index].quantity > 1) {
                    state.cart[index].quantity -= 1;
                } else {
                    state.cart.splice(index, 1);
                }
            }
            console.log("Cart after lessQuantity:", state.cart);
        },
    }
});

export const { addItem, removeItem, lessQuantity, addQuantity } = cartSlice.actions;
export default cartSlice.reducer;
