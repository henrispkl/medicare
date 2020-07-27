import { SET_VIEWBAR, SET_AUTHMODAL } from '../actions/types';

const initialState = { viewBar: false, authModal: false };

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEWBAR:
      return { ...state, viewBar: action.payload };
    case SET_AUTHMODAL:
      return { ...state, authModal: action.payload };
    default:
      return state;
  }
};

export default appReducer;
