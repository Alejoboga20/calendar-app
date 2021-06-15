import React from 'react';
import moment from 'moment';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import {
  eventStartUpdate,
  eventClearActiveEvent
} from '../../../actions/events';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'Test Title',
      notes: 'Test notes',
      start: now.toDate(),
      end: nowPlus1.toDate()
    }
  },
  auth: {
    uid: 'ABC123'
  },
  ui: {
    modalOpen: true
  }
};
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock('../../../actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe('CalendarModal Tests', () => {
  test('should show modal', () => {
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
  });

  test('should call update and close modal', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    });

    expect(eventStartUpdate).toHaveBeenCalledWith(
      initState.calendar.activeEvent
    );

    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('should show error when no title is provided', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    });

    expect(wrapper.find('input[name="title"]'))
      .toHaveClass('is-invalid')
      .toBe(true);
  });
});
