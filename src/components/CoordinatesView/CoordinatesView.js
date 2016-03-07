import React, {Component, PropTypes} from 'react';
import { CoordinateView } from 'components';

export default class CoordinatesView extends Component {
  static propTypes = {
    coordinates: PropTypes.array
  }

  render() {
    const {coordinates} = this.props;
    // const styles = require('./CoordinatesView.scss');
    return (
      <span>
        {coordinates.map((coordinate) => <CoordinateView key={coordinate._id} coordinate = {coordinate} />)}
      </span>
    );
  }
}
