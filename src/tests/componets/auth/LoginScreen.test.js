import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';
import Swal from 'sweetalert2';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock('../../../actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn()
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe('LoginScreen Tests', () => {
  beforeEach(() => jest.clearAllMocks());

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

  test('should not register when passwords do not match', () => {
    wrapper.find('input[name="RName"]').simulate('change', {
      target: { name: 'RName', value: 'testUser' }
    });

    wrapper.find('input[name="REmail"]').simulate('change', {
      target: { name: 'REmail', value: 'test@email.com' }
    });

    wrapper.find('input[name="RPassword"]').simulate('change', {
      target: { name: 'RPassword', value: 'firstpass' }
    });

    wrapper.find('input[name="RConfirmPassword"]').simulate('change', {
      target: { name: 'RConfirmPassword', value: 'secondpass' }
    });

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {}
    });

    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Passwords should match',
      'error'
    );
  });

  test('should start register when passwords match', () => {
    wrapper.find('input[name="RName"]').simulate('change', {
      target: { name: 'RName', value: 'testUser' }
    });

    wrapper.find('input[name="REmail"]').simulate('change', {
      target: { name: 'REmail', value: 'test@email.com' }
    });

    wrapper.find('input[name="RPassword"]').simulate('change', {
      target: { name: 'RPassword', value: 'firstpass' }
    });

    wrapper.find('input[name="RConfirmPassword"]').simulate('change', {
      target: { name: 'RConfirmPassword', value: 'firstpass' }
    });

    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault() {}
    });

    expect(startRegister).toHaveBeenCalledWith(
      'testUser',
      'test@email.com',
      'firstpass'
    );
    expect(Swal.fire).not.toHaveBeenCalled();
  });
});
