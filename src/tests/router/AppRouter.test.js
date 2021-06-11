import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { AppRouter } from '../../router/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('AppRouter Tests', () => {
  test('should display wait...', () => {
    const initState = {
      auth: {
        checking: true
      }
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h5').exists()).toBe(true);
  });

  test('should show PublicRoute and login-container', () => {
    const initState = {
      auth: {
        checking: false,
        uid: null
      }
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.login-container').exists()).toBe(true);
  });

  test('should show PrivateRoute and calendar', () => {
    const initState = {
      ui: {
        modalOpen: false
      },
      auth: {
        checking: false,
        uid: 'ABC123'
      },
      calendar: {
        events: []
      }
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.calendar-screen').exists()).toBe(true);
  });
});
