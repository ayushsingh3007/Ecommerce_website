import { createSlice } from '@reduxjs/toolkit';

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shopData: [],
  },
  reducers: {
    setShopData: (state, action) => {
      state.shopData = action.payload;
    },
  },
});

export const { setShopData } = shopSlice.actions;
export const selectShopData = (state) => state.shop.shopData;


export default shopSlice.reducer;
