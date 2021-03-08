import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA0xnOtzU5GGC0FAzWc3scHbfYcIMYNdV8',
  authDomain: 'strongfirstproject.firebaseapp.com',
  databaseURL: 'https://strongfirstproject.firebaseio.com',
  projectId: 'strongfirstproject',
  storageBucket: 'strongfirstproject.appspot.com',
  messagingSenderId: '977670929710',
  appId: '1:977670929710:web:53e88a1d00c4e78cff8ebf',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
