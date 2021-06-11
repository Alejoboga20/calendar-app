import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initialState = {
  checking: true,
  uid: null,
  name: null
};

const loginAction = {
  type: types.authLogin,
  payload: {
    uid: '123ABC',
    name: 'TestUser'
  }
};

describe('', () => {
  test('should return initial state', () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('should authenticate user', () => {
    const state = authReducer(initialState, loginAction);
    expect(state).toEqual({ checking: false, uid: '123ABC', name: 'TestUser' });
  });
});
