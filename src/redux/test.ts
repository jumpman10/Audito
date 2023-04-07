import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
  name: "test",
  initialState: {
    data: [],
  },
  reducers: {
    getData: (state) => {
      state;
    },
  },
});

export const { getData } = testSlice.actions;
export default testSlice.reducer;