import { loginError, loginPending, logoutError, logoutPending } from './actions';

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../Helpers/firebase';

export const login = (inputData) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const userCredencials = await signInWithEmailAndPassword(
        auth,
        inputData.email,
        inputData.password
      );
      const {
        token,
        claims: { role }
      } = await userCredencials.user.getIdTokenResult();
      sessionStorage.setItem('token', token);
      return role;
    } catch (error) {
      return dispatch(loginError(error.toString()));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutPending());
    try {
      await signOut(auth);
      sessionStorage.clear();
    } catch (error) {
      dispatch(logoutError(error.toString()));
    }
  };
};
