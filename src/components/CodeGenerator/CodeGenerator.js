import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {generateCode} from 'redux/modules/layoutelements';
import { Button, Input} from 'react-bootstrap';

@connect(
    state => ({
      layoutelements: state.layoutelements.data,
      displayText: state.layoutelements.generatedCode.displayText,
      show: state.layoutelements.generatedCode.show
    }),
    dispatch => bindActionCreators({generateCode}, dispatch))
export default class CodeGenerator extends Component {
  static propTypes = {
    displayText: PropTypes.string,
    show: PropTypes.bool,
    generateCode: PropTypes.func.isRequired
  }

  render() {
    const {displayText, show, generateCode} = this.props; // eslint-disable-line no-shadow
    const styles = require('./CodeGenerator.scss');
    return (
      <div>
        <Button bsStyle="default" onClick={generateCode}>
          Generate code
        </Button>
        {show &&
          <Input type="textarea" label="Generated code" rows="10" className={styles.generatedCode} placeholder="textarea" value={displayText} readOnly="true"/>
        }
      </div>
    );
  }
}
