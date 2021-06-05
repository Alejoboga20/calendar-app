import { fetchWithoutToken } from '../helpers/fetch';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const response = await fetchWithoutToken(
      'auth',
      { email, password },
      'POST'
    );

    const body = await response.json();

    console.log(body);
  };
};
