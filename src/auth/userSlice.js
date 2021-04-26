import {createSlice} from '@reduxjs/toolkit';
import {auth, createUserProfileDocument} from "../api/firebase/firebaseClient";

export const userSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    handleLogout: (state) => {
      state.currentUser = null;
    },
  },
});

export const {handleLogout, setCurrentUser} = userSlice.actions;
export default userSlice.reducer;

export const authStateCheck = () => dispatch => {
  auth.onAuthStateChanged(async (userAuth) => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot((snapShot) => {
        dispatch(setCurrentUser({
          id: snapShot.id,
          ...snapShot.data(),
        }));
      });
    }
    dispatch(setCurrentUser(null));
  });
};
