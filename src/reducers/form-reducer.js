const initialState = {
  title: ''
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case 'form':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
