import { SET_VIEWBAR } from '../actions/types';

const initialState = { viewBar: false };

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEWBAR:
      return { ...state, viewBar: action.payload };
    default:
      return state;
  }
};

export default appReducer;
