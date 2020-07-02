const initialState = { viewBar: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VIEWBAR':
      return { ...state, text: action.payload };
    default:
      return state;
  }
};
