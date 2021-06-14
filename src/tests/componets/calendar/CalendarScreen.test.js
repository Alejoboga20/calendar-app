import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { eventStartLoading } from '../../../actions/events';
import { messages } from '../../../helpers/calendar-messages-es';

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

  test('should dispacth actions', () => {
    const calendar = wrapper.find('Calendar');
    const calendarMessages = calendar.prop('messages');
    expect(calendarMessages).toEqual(messages);
  });
});
