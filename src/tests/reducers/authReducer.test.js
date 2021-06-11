import { authReducer } from '../../reducers/authReducer';

const initialState = {
  checking: true,
  uid: null,
  name: null
};

describe('', () => {
  test('should return initial state', () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });
});
