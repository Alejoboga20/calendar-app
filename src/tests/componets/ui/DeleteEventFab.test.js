import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/events';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock('../../../actions/events', () => ({
  eventStartDelete: jest.fn()
}));

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

describe('DeleteEventFab Tests', () => {
  test('should display properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should call eventStartDelete', () => {
    wrapper.find('button').prop('onClick')();
    expect(eventStartDelete).toHaveBeenCalled();
  });
});
