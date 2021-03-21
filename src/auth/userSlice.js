import {createSlice} from '@reduxjs/toolkit';
import {auth, createUserProfileDocument} from "../api/firebase/firebaseClient";

export const userSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      console.log('payload ', action.payload);
      state.currentUser = action.payload;
    },
    handleLogout: (state) => {
      state.isAuth = false;
    },
  },
});

export const {handleLogout, setCurrentUser} = userSlice.actions;
export default userSlice.reducer;

export const authStateCheck = () => dispatch => {
  auth.onAuthStateChanged(async (userAuth) => {
    if (userAuth) {
      console.log('jest user');
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot((snapShot) => {
        dispatch(setCurrentUser({
          id: snapShot.id,
          ...snapShot.data(),
        }));
      });
    }
    console.log('nie ma usera');
    dispatch(setCurrentUser(userAuth));
  });
};
