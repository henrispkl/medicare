import { SET_VIEWBAR, SET_AUTHMODAL } from './types';

export const setViewbar = (visibility) => {
  return { type: SET_VIEWBAR, payload: visibility };
};

export const setAuthModal = (visibility) => {
  return { type: SET_AUTHMODAL, payload: visibility };
};
