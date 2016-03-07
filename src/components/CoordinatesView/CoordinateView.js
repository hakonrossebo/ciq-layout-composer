import React, {Component, PropTypes} from 'react';

export default class CoordinateView extends Component {
  static propTypes = {
    coordinate: PropTypes.object
  }

  render() {
    const {coordinate} = this.props;
    return (
        <span>
          {'(' + coordinate.xpos + ', ' + coordinate.ypos + ')'}
        </span>
    );
  }
}
