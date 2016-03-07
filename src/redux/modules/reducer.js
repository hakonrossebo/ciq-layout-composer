import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import {reducer as form} from 'redux-form';
import connectiqlayouts from './connectiqlayouts';
import layoutelements from './layoutelements';
import normalizeCoordinate from '../../components/LayoutelementsForm/FormNormalizers';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  connectiqlayouts,
  layoutelements,
  form: form.normalize({
    layoutelement: {
      'coordinates[].xpos': normalizeCoordinate,
      'coordinates[].ypos': normalizeCoordinate,
      xRadius: value => value && Number(value),
      yRadius: value => value && Number(value),
      rectangleWidth: value => value && Number(value),
      rectangleHeight: value => value && Number(value),
      degreeStart: value => value && Number(value),
      degreeEnd: value => value && Number(value),
      lineWidth: value => value && Number(value)
    }
  })
});
