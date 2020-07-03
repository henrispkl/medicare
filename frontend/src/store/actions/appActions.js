import { SET_VIEWBAR } from './actionTypes';

const setViewbar = (value) => {
  return { type: SET_VIEWBAR, payload: value };
};

export default {
  setViewbar,
};
