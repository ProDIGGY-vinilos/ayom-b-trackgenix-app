import { initializeApp } from 'firebase/app';
import store from 'redux/store';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import { loginSuccess, logoutSuccess } from 'redux/auth/actions';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

export const tokenListener = () => {
  onIdTokenChanged(auth, async (user) => {
    if (user) {
      try {
        const {
          token,
          claims: { role, email }
        } = await user.getIdTokenResult();
        if (token) {
          store.dispatch(
            loginSuccess({
              role,
              email
            })
          );
          sessionStorage.setItem('token', token);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      store.dispatch(logoutSuccess());
    }
  });
};
