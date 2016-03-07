import layoutelementreducer from './layoutelement';
import ciqCodeGenerator from './ciqCodeGenerator/ciqCodeGenerator';
const LOAD = 'redux-example/layoutelements/LOAD';
const LOAD_SUCCESS = 'redux-example/layoutelements/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/layoutelements/LOAD_FAIL';
const EDIT_START = 'redux-example/layoutelements/EDIT_START';
const EDIT_STOP = 'redux-example/layoutelements/EDIT_STOP';
const ADD_START = 'redux-example/layoutelements/ADD_START';
const ADD_STOP = 'redux-example/layoutelements/ADD_STOP';
const SAVE = 'redux-example/layoutelements/SAVE';
const SAVE_SUCCESS = 'redux-example/layoutelements/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/layoutelements/SAVE_FAIL';
const ADD = 'redux-example/layoutelements/ADD';
const ADD_SUCCESS = 'redux-example/layoutelements/ADD_SUCCESS';
const ADD_FAIL = 'redux-example/layoutelements/ADD_FAIL';
const DELETE = 'redux-example/layoutelements/DELETE';
const DELETE_SUCCESS = 'redux-example/layoutelements/DELETE_SUCCESS';
const DELETE_FAIL = 'redux-example/layoutelements/DELETE_FAIL';
const GENERATE_CODE = 'redux-example/layoutelements/GENERATE_CODE';

const initialState = {
  loaded: false,
  saveError: null,
  adding: false,
  editing: false,
  currentItem: null,
  addError: null,
  generatedCode: {
    displayText: 'Generated code goes here',
    show: false
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false
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
        adding: true,
        currentItem: action._id
      };
    case ADD_STOP:
      return {
        ...state,
        adding: false,
        currentItem: null
      };
    case ADD:
      console.log('Add started');
      return state; // 'saving' flag handled by redux-form
    case ADD_SUCCESS:
      return {
        ...state,
        data: state.data.concat(action.result),
        adding: false,
        addError: null,
        editing: true,
        currentItem: action.result._id,
        generatedCode: {
          ...state.generatedCode,
          displayText: '',
          show: false
        }
      };
    case ADD_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        addError: action.error
      } : state;
    case DELETE:
      console.log('Delete started');
      return state; // 'saving' flag handled by redux-form
    case DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(ciq =>
          ciq._id !== action._id),
        saveError: null,
        generatedCode: {
          ...state.generatedCode,
          displayText: '',
          show: false
        }
      };
    case DELETE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: action.error
      } : state;
    case EDIT_START:
      return {
        ...state,
        editing: true,
        currentItem: action._id
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: false,
        currentItem: null
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = state.data.map(clitem => layoutelementreducer(clitem, action));
      const editingMode = action.stopSaveMode ? false : true;
      const currentItemValue = action.stopSaveMode ? null : state.currentItem;
      return {
        ...state,
        data: data,
        editing: editingMode,
        currentItem: currentItemValue,
        saveError: null,
        generatedCode: {
          ...state.generatedCode,
          displayText: '',
          show: false
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: action.error
      } : state;
    case GENERATE_CODE:
      return {
        ...state,
        generatedCode: {
          ...state.generatedCode,
          displayText: ciqCodeGenerator(state.data, 'code'),
          show: true
        }
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.layoutelements && globalState.layoutelements.loaded;
}

export function load(ciqid) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/connectiqlayouts/' + ciqid + '/layoutelements')
  };
}

export function save(layoutelement, shouldStopSaveMode) {
  console.log(layoutelement);
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    _id: layoutelement._id,
    stopSaveMode: shouldStopSaveMode,
    promise: (client) => client.put('/connectiqlayouts/' + layoutelement.connectiqlayout_ref + '/layoutelements/' + layoutelement._id, {
      data: layoutelement
    })
  };
}

export function additem(ciqid, elementType) {
  let layoutelement = {};
  const defaultCoordinate = [{'xpos': 0, 'ypos': 0, 'xposCenter': true, 'yposCenter': true}];
  const lineCoordinate = [
    {'xpos': -50, 'ypos': -50, 'xposCenter': true, 'yposCenter': true},
    {'xpos': 50, 'ypos': 50, 'xposCenter': true, 'yposCenter': true}
  ];
  const polygonCoordinate = [
    {'xpos': -70, 'ypos': -70, 'xposCenter': true, 'yposCenter': true},
    {'xpos': -20, 'ypos': -50, 'xposCenter': true, 'yposCenter': true},
    {'xpos': 20, 'ypos': 20, 'xposCenter': true, 'yposCenter': true}
  ];
  switch (elementType) {
    case 'text':
      layoutelement = {
        'elementtype': 'text',
        'description': 'This is a text element',
        'displayText': 'Test text',
        'font': 'FONT_MEDIUM',
        'color': 'COLOR_GREEN',
        'justification': 'TEXT_JUSTIFY_CENTER',
        'coordinates': defaultCoordinate
      };
      break;
    case 'circle':
      layoutelement = {
        'elementtype': 'circle',
        'description': 'This is a circle element',
        'xRadius': 20,
        'color': 'COLOR_BLUE',
        'coordinates': defaultCoordinate
      };
      break;
    case 'ellipse':
      layoutelement = {
        'elementtype': 'ellipse',
        'description': 'This is an ellipse element',
        'xRadius': 50,
        'yRadius': 20,
        'color': 'COLOR_WHITE',
        'coordinates': defaultCoordinate
      };
      break;
    case 'rectangle':
      layoutelement = {
        'elementtype': 'rectangle',
        'description': 'This is a rectangle element',
        'rectangleWidth': 20,
        'rectangleHeight': 20,
        'color': 'COLOR_RED',
        'coordinates': defaultCoordinate
      };
      break;
    case 'arc':
      layoutelement = {
        'elementtype': 'arc',
        'description': 'This is an arc element',
        'arcType': 'ARC_CLOCKWISE',
        'xRadius': 50,
        'degreeStart': 0,
        'degreeEnd': 90,
        'color': 'COLOR_ORANGE',
        'coordinates': defaultCoordinate
      };
      break;
    case 'point':
      layoutelement = {
        'elementtype': 'point',
        'description': 'This is a point element',
        'color': 'COLOR_ORANGE',
        'coordinates': defaultCoordinate
      };
      break;
    case 'line':
      layoutelement = {
        'elementtype': 'line',
        'description': 'This is a line element',
        'color': 'COLOR_PINK',
        'lineWidth': 1,
        'coordinates': lineCoordinate
      };
      break;
    case 'polygon':
      layoutelement = {
        'elementtype': 'polygon',
        'description': 'This is a polygon element',
        'color': 'COLOR_PURPLE',
        'lineWidth': 1,
        'coordinates': polygonCoordinate
      };
      break;
    default:
      layoutelement = {
        'elementtype': 'text',
        'description': 'This is a text element',
        'displayText': 'Test text',
        'font': 'FONT_MEDIUM',
        'color': 'COLOR_GREEN',
        'justification': 'TEXT_JUSTIFY_CENTER',
        'coordinates': defaultCoordinate
      };
  }

  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post('/connectiqlayouts/' + ciqid + '/layoutelements', {
      data: layoutelement
    })
  };
}

export function deleteitem(layoutelement) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    _id: layoutelement._id,
    promise: (client) => client.del('/connectiqlayouts/' + layoutelement.connectiqlayout_ref + '/layoutelements/' + layoutelement._id, {
      data: layoutelement
    })
  };
}

export function generateCode() {
  return { type: GENERATE_CODE };
}


export function editStart(_id) {
  return { type: EDIT_START, _id };
}

export function editStop(_id) {
  return { type: EDIT_STOP, _id };
}

export function addStart(_id) {
  return { type: ADD_START, _id };
}

export function addStop(_id) {
  return { type: ADD_STOP, _id};
}
