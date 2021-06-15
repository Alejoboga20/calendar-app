import React from 'react';
import moment from 'moment';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import {
  eventStartUpdate,
  eventClearActiveEvent,
  eventStartAddNew
} from '../../../actions/events';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import Swal from 'sweetalert2';

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

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

jest.mock('../../../actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn()
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

  test('should create a new event', () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null
      },
      auth: {
        uid: 'ABC123',
        name: 'TestUser'
      },
      ui: {
        modalOpen: true
      }
    };
    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'test title'
      }
    });

    wrapper.find('form').simulate('submit', {
      preventDefault() {}
    });

    expect(eventStartAddNew).toHaveBeenCalledWith({
      title: 'test title',
      end: expect.anything,
      start: expect.anything,
      notes: ''
    });

    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test('should validate dates', () => {
    const today = new Date();

    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(today);

      wrapper.find('form').simulate('submit', {
        preventDefault() {}
      });
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'End Date should be greater than Start Date',
      'error'
    );
  });
});
