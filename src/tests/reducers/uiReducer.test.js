import { uiCloseModal, uiOpenModal } from '../../actions/ui';
import { uiReducer } from '../../reducers/uiReducer';

const initialState = {
  modalOpen: false
};

describe('uiReducer Tests', () => {
  test('should return initialState', () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('should open modal', () => {
    const state = uiReducer(initialState, uiOpenModal());
    expect(state).toEqual({ modalOpen: true });
  });

  test('should close modal', () => {
    const state = uiReducer(initialState, uiCloseModal());
    expect(state).toEqual({ modalOpen: false });
  });
});
