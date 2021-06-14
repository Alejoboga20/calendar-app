import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { eventStartLoading } from '../../../actions/events';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  calendar: {
    events: [],
    activeEvent: {}
  },
  auth: {
    uid: 'ABC123'
  },
  ui: {
    openModal: false
  }
};
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock('../../../actions/events', () => ({
  eventStartLoading: jest.fn()
}));

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe('CalendarScreen Tests', () => {
  test('should display properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
