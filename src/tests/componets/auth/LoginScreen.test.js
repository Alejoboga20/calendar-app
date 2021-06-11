import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin } from '../../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock('../../../actions/auth', () => ({
  startLogin: jest.fn()
}));

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe('LoginScreen Tests', () => {
  test('should display properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch startLogin', () => {
    wrapper.find('input[name="lEmail"]').simulate('change', {
      target: { name: 'lEmail', value: 'test@email.com' }
    });

    wrapper.find('input[name="lPassword"]').simulate('change', {
      target: { name: 'lPassword', value: '123456' }
    });

    wrapper.find('form').at(0).prop('onSubmit')({
      preventDefault() {}
    });

    expect(startLogin).toHaveBeenCalledWith('test@email.com', '123456');
  });
});
