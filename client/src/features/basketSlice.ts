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

export const addBasketItemAsync = createAsyncThunk<BasketType, { productId: number; quantity?: number }>(
  'basket/AddBasketItem',
  async ({ productId, quantity = 1 }) => {
    const response = await agent.Basket.addItem(productId, quantity);
    return response;
  }
);

export const removeBasketItemAsync = createAsyncThunk<{ productId: number; quantity?: number }, { productId: number; quantity?: number }>(
  'basket/addBasketItemAsync',
  async ({ productId, quantity }) => {
    const response = await agent.Basket.removeItem(productId, quantity);

    return response;
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
      const productId = action.meta.arg.productId;
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

    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      state.status = 'fulfilled';

      if (state.basket) {
        const { productId, quantity } = action.meta.arg;
        const itemToUpdate = state.basket.items.find((item) => item.productId === productId);
        if (itemToUpdate) {
          itemToUpdate.quantity -= quantity!;
        }
        // Filter out items with a quantity greater than zero
        state.basket.items = state.basket.items.filter((item) => item.quantity > 0);
      }
    });
    builder.addCase(removeBasketItemAsync.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export const { setBasket } = basketSlice.actions;
