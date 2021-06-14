import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { eventStartLoading, eventSetActive } from '../../../actions/events';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';

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
  eventStartLoading: jest.fn(),
  eventSetActive: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe('CalendarScreen Tests', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should display properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispacth actions openModal', () => {
    const calendar = wrapper.find('Calendar');
    const calendarMessages = calendar.prop('messages');

    expect(calendarMessages).toEqual(messages);

    calendar.prop('onSelectEvent')({ start: 'Test' });
    expect(store.dispatch).toHaveBeenCalledWith({ start: 'Test' });

    calendar.prop('onDoubleClickEvent')();
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });
  });

  test('should dispatch onView action', () => {
    const calendar = wrapper.find('Calendar');

    calendar.prop('onView');
    expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
  });
});
