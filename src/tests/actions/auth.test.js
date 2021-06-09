import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startLogin } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

describe('auth actions tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initialState);
  });

  test('should startLogin', async () => {
    await store.dispatch(startLogin('alejotest@email.com', '123456'));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    );
  });

  test('should not login with incorrect password', async () => {
    await store.dispatch(startLogin('alejotest@email.com', '123456789'));

    const actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Password incorrect',
      'error'
    );
  });
});
