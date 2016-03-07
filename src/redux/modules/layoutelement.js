const SAVE_SUCCESS = 'redux-example/layoutelements/SAVE_SUCCESS';

export default function reducer(state, action) {
  switch (action.type) {
    case SAVE_SUCCESS:
      if (state._id !== action._id) {
        return state;
      }
    //   return state;
      return {
        ...state,
        name: action.result.name,
        description: action.result.description,
        displayText: action.result.displayText,
        elementtype: action.result.elementtype,
        font: action.result.font,
        justification: action.result.justification,
        arcType: action.result.arcType,
        filled: action.result.filled,
        xRadius: action.result.xRadius,
        yRadius: action.result.yRadius,
        rectangleWidth: action.result.rectangleWidth,
        rectangleHeight: action.result.rectangleHeight,
        degreeStart: action.result.degreeStart,
        degreeEnd: action.result.degreeEnd,
        lineWidth: action.result.lineWidth,
        color: action.result.color,
        coordinates: action.result.coordinates
      };
    default:
      return state;
  }
}
