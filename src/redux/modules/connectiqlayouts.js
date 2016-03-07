import connectiqlayoutreducer from './connectiqlayout';


const LOAD = 'ciq/connectiqlayouts/LOAD';
const LOAD_SUCCESS = 'ciq/connectiqlayouts/LOAD_SUCCESS';
const LOAD_FAIL = 'ciq/connectiqlayouts/LOAD_FAIL';
const EDIT_START = 'ciq/connectiqlayouts/EDIT_START';
const EDIT_STOP = 'ciq/connectiqlayouts/EDIT_STOP';
const ADD_START = 'ciq/connectiqlayouts/ADD_START';
const ADD_STOP = 'ciq/connectiqlayouts/ADD_STOP';
const SAVE = 'ciq/connectiqlayouts/SAVE';
const SAVE_SUCCESS = 'ciq/connectiqlayouts/SAVE_SUCCESS';
const SAVE_FAIL = 'ciq/connectiqlayouts/SAVE_FAIL';
const ADD = 'ciq/connectiqlayouts/ADD';
const ADD_SUCCESS = 'ciq/connectiqlayouts/ADD_SUCCESS';
const ADD_FAIL = 'ciq/connectiqlayouts/ADD_FAIL';
const DELETE = 'ciq/connectiqlayouts/DELETE';
const DELETE_SUCCESS = 'ciq/connectiqlayouts/DELETE_SUCCESS';
const DELETE_FAIL = 'ciq/connectiqlayouts/DELETE_FAIL';
const ACTIVATE = 'ciq/connectiqlayouts/ACTIVATE';
const ACTIVATE_SUCCESS = 'ciq/connectiqlayouts/ACTIVATE_SUCCESS';
const ACTIVATE_FAIL = 'ciq/connectiqlayouts/ACTIVATE_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {},
  adding: false,
  addError: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case ADD_START:
      return {
        ...state,
        adding: true
      };
    case ADD_STOP:
      return {
        ...state,
        adding: false
      };
    case ADD:
      console.log('Add started');
      return state; // 'saving' flag handled by redux-form
    case ADD_SUCCESS:
      return {
        ...state,
        data: state.data.concat(action.result),
        adding: false,
        addError: null
      };
    case ADD_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        addError: action.error
      } : state;
    case DELETE:
      return state; // 'saving' flag handled by redux-form
    case DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(ciq =>
          ciq._id !== action._id),
        editing: {
          ...state.editing,
          [action._id]: false
        },
        saveError: {
          ...state.saveError,
          [action._id]: null
        }
      };
    case DELETE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action._id]: action.error
        }
      } : state;
    case ACTIVATE:
      return state; // 'saving' flag handled by redux-form
    case ACTIVATE_SUCCESS:
      return {
        ...state,
        data: state.data.map(clitem => connectiqlayoutreducer(clitem, action))
      };
    case ACTIVATE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
      } : state;
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action._id]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action._id]: false
        }
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = state.data.map(clitem => connectiqlayoutreducer(clitem, action));
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action._id]: false
        },
        saveError: {
          ...state.saveError,
          [action._id]: null
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action._id]: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.connectiqlayouts && globalState.connectiqlayouts.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/connectiqlayouts') // params not used, just shown as demonstration
  };
}

export function save(connectiqlayout) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    _id: connectiqlayout._id,
    promise: (client) => client.put('/connectiqlayouts', {
      data: connectiqlayout
    })
  };
}

export function additem(connectiqlayout) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post('/connectiqlayouts', {
      data: connectiqlayout
    })
  };
}

export function deleteitem(connectiqlayout) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    _id: connectiqlayout._id,
    promise: (client) => client.del('/connectiqlayouts/' + connectiqlayout._id, {
      data: connectiqlayout
    })
  };
}

export function setActiveItem(connectiqlayout) {
  return {
    types: [ACTIVATE, ACTIVATE_SUCCESS, ACTIVATE_FAIL],
    _id: connectiqlayout._id,
    promise: (client) => client.put('/connectiqlayouts/' + connectiqlayout._id + '/setactive', {
      data: connectiqlayout
    })
  };
}

export function editStart(_id) {
  return { type: EDIT_START, _id };
}

export function editStop(_id) {
  return { type: EDIT_STOP, _id };
}

export function addStart() {
  return { type: ADD_START };
}

export function addStop() {
  return { type: ADD_STOP};
}
