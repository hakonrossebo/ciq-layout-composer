const SAVE_SUCCESS = 'ciq/connectiqlayouts/SAVE_SUCCESS';
const ACTIVATE_SUCCESS = 'ciq/connectiqlayouts/ACTIVATE_SUCCESS';
export default function reducer(state, action) {
  switch (action.type) {
    case SAVE_SUCCESS:
      if (state._id !== action._id) {
        return state;
      }
      return {
        ...state,
        name: action.result.name,
        description: action.result.description
      };
    case ACTIVATE_SUCCESS:
      if (state._id !== action._id) {
        return {
          ...state,
          useAsDefault: false
        };
      }
      return {
        ...state,
        useAsDefault: true
      };
    default:
      return state;
  }
}
