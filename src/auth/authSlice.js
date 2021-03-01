import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
  },
  reducers: {
    handleSignIn: (state) => {
      state.isAuth = true;
    },
    handleLogout: (state) => {
      state.isAuth = false;
    },
  },
});

export const {handleSignIn, handleLogout} = authSlice.actions;
export default authSlice.reducer;
