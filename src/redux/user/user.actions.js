import {auth, createUserProfileDocument} from "../../api/firebase/firebaseClient";

export const setCurrentUser = (user) => ({
  type: 'SET_CURRENT_USER',
  payload: user,
});

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
    dispatch(setCurrentUser(userAuth));
  });
};
