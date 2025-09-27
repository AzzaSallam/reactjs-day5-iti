import { createSlice } from "@reduxjs/toolkit";

//TO HANDEL FLOATING NUMBERS    
const round2 = (num) => {
  return Math.round((Number(num) + Number.EPSILON) * 100) / 100;
};

const initialState= {
    cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
    totalQuantity: localStorage.getItem("totalQuantity")
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0,
  totalAmount: localStorage.getItem("totalAmount")
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload ;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            if(!existingItem){{
                state.cartItems.push({
                    id:newItem.id,
                    title: newItem.title,
                    price: Number(newItem.price),
                    image: newItem.thumbnail,
                    quantity: 1,
                    totalPrice: newItem.price,
                })
                state.totalQuantity+=1;
            }} else{
                existingItem.quantity+=1;
                existingItem.totalPrice = round2(existingItem.totalPrice + newItem.price);
            }
            state.totalAmount = round2(
                state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
            );
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        increaseQuantity: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            if(existingItem){
                existingItem.quantity+=1;
                existingItem.totalPrice = round2(existingItem.totalPrice + existingItem.price);
                state.totalAmount = round2(
                    state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
                );
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
        },
        decreaseQuantity : (state , action)=>{
            const id = action.payload ;
            const existingItem = state.cartItems.find(item => item.id === id);
            if(existingItem){
                if(existingItem.quantity === 1){
                    state.totalQuantity-=1;
                    state.cartItems = state.cartItems.filter(item => item.id !== id);
                } else{
                    existingItem.quantity-=1;
                    existingItem.totalPrice = round2(existingItem.totalPrice - existingItem.price);
                }
                state.totalAmount = round2(
                    state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
                );
                
                if(state.totalQuantity < 0) state.totalQuantity = 0;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
        } ,
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            if(existingItem){
                state.totalQuantity -= 1;
                state.cartItems = state.cartItems.filter(item => item.id !== id);
                state.totalAmount = round2(
                    state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
                );
                if(state.totalQuantity < 0) state.totalQuantity = 0;    
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
        }
       
    }
});

export const { addToCart, removeFromCart,increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;