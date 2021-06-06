import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const response = await fetchWithoutToken(
      'auth',
      { email, password },
      'POST'
    );

    const body = await response.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      const { uid, name } = body;

      dispatch(login({ uid, name }));
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const response = await fetchWithoutToken(
      'auth/new',
      { name, email, password },
      'POST'
    );

    const body = await response.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      const { uid, name } = body;

      dispatch(login({ uid, name }));
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const response = await fetchWithToken('auth/renew');

    const body = await response.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      const { uid, name } = body;

      dispatch(login({ uid, name }));
    } else {
      Swal.fire('Error', body.msg, 'error');
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
  type: types.authLogin,
  payload: user
});
