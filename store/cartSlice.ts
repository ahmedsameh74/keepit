import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string; // unique ID for the cart item (e.g. timestamp)
  productId: string;
  name: string; // The product name, we can fetch it or pass it. We need the product name and price. 
  price: number;
  productName: string;
  // User customizations
  nameOnCard: string;
  message: string;
  playlist: string;
  date: string;
  // Digital Profile additions
  backgroundImage?: string;
  profilePhotos?: string[];
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
