import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BasketType } from '../types/BasketType';
import agent from '../api/agent';

interface BasketState {
  basket: BasketType | null;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: BasketState = {
  basket: null,
  status: 'idle',
};

export const addBasketItemAsync = createAsyncThunk<BasketType, { productId: number; quantity: number }>(
  'basket/AddBasketItem',
  async ({ productId, quantity }) => {
    try {
      const response = await agent.Basket.addItem(productId, quantity);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.basket?.items.findIndex((i) => i.productId === productId);
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.items[itemIndex].quantity -= quantity;
      if (state.basket?.items[itemIndex].quantity === 0) state.basket.items.splice(itemIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = 'fulfilled';
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      // state.basket = action.payload;
      state.status = 'rejected';
    });
  },
});

export const { setBasket, removeItem } = basketSlice.actions;
