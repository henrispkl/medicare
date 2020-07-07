import { SET_VIEWBAR } from './types';

export const setViewbar = (visibility) => {
  return { type: SET_VIEWBAR, payload: visibility };
};
