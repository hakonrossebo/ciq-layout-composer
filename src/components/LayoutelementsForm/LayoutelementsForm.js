import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import layoutelementValidation, {fonttypes, justificationtypes, colortypes, arcTypes} from './layoutelementValidation';
import * as layoutelementsActions from 'redux/modules/layoutelements';
import { Modal} from 'react-bootstrap';

function checkShowElement(elementType, fieldType) {
  const elementTypeFieldsMapping = {
    'text': ['description', 'displayText', 'font', 'justification', 'color', 'coordinates'],
    'circle': ['description', 'xRadius', 'color', 'coordinates', 'filled'],
    'ellipse': ['description', 'xRadius', 'color', 'coordinates', 'filled'],
    'rectangle': ['description', 'rectangleWidth', 'color', 'coordinates', 'filled'],
    'arc': ['description', 'arcType', 'color', 'xRadius', 'degreeStart', 'degreeEnd'],
    'point': ['description', 'color', 'coordinates'],
    'line': ['description', 'color', 'lineWidth', 'coordinates'],
    'polygon': ['description', 'color', 'lineWidth', 'coordinates'],
  };
  if (elementTypeFieldsMapping[elementType.initialValue].indexOf(fieldType) >= 0) {
    return true;
  }
  return false;
}

@connect(
  state => ({
    saveError: state.layoutelements.saveError,
    initialValues: state.layoutelements.data[state.layoutelements.data.findIndex(xval => xval._id === state.layoutelements.currentItem)]
  }),
  dispatch => bindActionCreators(layoutelementsActions, dispatch)
)
@reduxForm({
  form: 'layoutelement',
  fields: ['_id', 'name', 'connectiqlayout_ref', 'description', 'displayText', 'elementtype', 'font', 'justification', 'color', 'coordinates[].xpos', 'coordinates[].xposCenter', 'coordinates[].ypos', 'coordinates[].yposCenter', 'arcType', 'filled', 'xRadius', 'yRadius', 'degreeStart', 'degreeEnd', 'lineWidth', 'rectangleWidth', 'rectangleHeight'],
  validate: layoutelementValidation
})

export default class LayoutelementsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    values: PropTypes.object.isRequired,
    ciqid: PropTypes.string,
    editing: PropTypes.bool
  };

  render() {
    const { editStop, fields: {elementtype, description, displayText, font, justification, color, coordinates, arcType, filled, xRadius, yRadius, degreeStart, degreeEnd, lineWidth, rectangleWidth, rectangleHeight}, handleSubmit, invalid,
      pristine, save, submitting, saveError: saveError, values, editing} = this.props;
    // const styles = require('containers/connectiqlayouts/connectiqlayouts.scss');
    return (
      <Modal show={editing} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Edit element</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal">
            {checkShowElement(elementtype, 'description') &&
              <div className="form-group">
                <label className="col-sm-4" htmlFor={description}>Description</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" {...description}/>
                  {description.error && description.touched && <div className="text-danger">{description.error}</div>}
                </div>
              </div>
            }
            {checkShowElement(elementtype, 'displayText') &&
              <div className="form-group">
                <label className="col-sm-4" htmlFor={displayText}>Display text</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" {...displayText}/>
                  {displayText.error && displayText.touched && <div className="text-danger">{displayText.error}</div>}
                </div>
              </div>
            }
            {checkShowElement(elementtype, 'font') &&
              <div className="form-group">
                <label className="col-sm-4" htmlFor={font}>Font</label>
                <div className="col-sm-8">
                  <select name="font" className="form-control" {...font}>
                    <option value="">Select a font type...</option>
                    {fonttypes.map(fontOption => <option value={fontOption} key={fontOption}>{fontOption}</option>)}
                  </select>
                  {font.error && font.touched && <div className="text-danger">{font.error}</div>}
                </div>
              </div>
            }
            {checkShowElement(elementtype, 'justification') &&
              <div className="form-group">
                <label className="col-sm-4" htmlFor={justification}>Justification</label>
                <div className="col-sm-8">
                  <select name="font" className="form-control" {...justification}>
                    <option value="">Select a justification type...</option>
                    {justificationtypes.map(justificationOption => <option value={justificationOption} key={justificationOption}>{justificationOption}</option>)}
                  </select>
                  {justification.error && justification.touched && <div className="text-danger">{justification.error}</div>}
                </div>
              </div>
            }
            {checkShowElement(elementtype, 'color') &&
              <div className="form-group">
                <label className="col-sm-4" htmlFor={color}>Color</label>
                <div className="col-sm-8">
                  <select name="font" className="form-control" {...color}>
                    <option value="">Select a color...</option>
                    {colortypes.map(colorOption => <option value={colorOption} key={colorOption}>{colorOption}</option>)}
                  </select>
                  {color.error && color.touched && <div className="text-danger">{color.error}</div>}
                </div>
              </div>
            }
            {checkShowElement(elementtype, 'arcType') &&
              <div className="form-group">
                <label className="col-sm-4" htmlFor={arcType}>Arc type</label>
                <div className="col-sm-8">
                  <select name="font" className="form-control" {...arcType}>
                    <option value="">Select arcType...</option>
                    {arcTypes.map(arcTypeOption => <option value={arcTypeOption} key={arcTypeOption}>{arcTypeOption}</option>)}
                  </select>
                  {arcType.error && arcType.touched && <div className="text-danger">{arcType.error}</div>}
                </div>
              </div>
            }
            {checkShowElement(elementtype, 'filled') &&
              <div className="form-group">
                <label className="col-sm-4" htmlFor={filled}>Shape options</label>
                <div className="col-sm-8">
                  <label>
                    <input type="checkbox" {...filled}/> Filled
                  </label>
                  {filled.error && filled.touched && <div className="text-danger">{filled.error}</div>}
                </div>
              </div>
            }
            {checkShowElement(elementtype, 'xRadius') &&
              <div className="form-group">
                <label className="col-sm-4" htmlFor={xRadius}>Radius x y</label>
                <div className="col-sm-4">
                  <input type="text" className="form-control" {...xRadius}/>
                  {xRadius.error && xRadius.touched && <div className="text-danger">{xRadius.error}</div>}
                </div>
                <div className="col-sm-4">
                  <input type="text" className="form-control" {...yRadius}/>
                  {yRadius.error && yRadius.touched && <div className="text-danger">{yRadius.error}</div>}
                </div>
              </div>
            }
            {checkShowElement(elementtype, 'rectangleWidth') &&
              <div className="form-group">
                <label className="col-sm-4" htmlFor={rectangleWidth}>Width and height</label>
                <div className="col-sm-4">
                  <input type="text" className="form-control" {...rectangleWidth}/>
                  {rectangleWidth.error && rectangleWidth.touched && <div className="text-danger">{rectangleWidth.error}</div>}
                </div>
                <div className="col-sm-4">
                  <input type="text" className="form-control" {...rectangleHeight}/>
                  {rectangleHeight.error && rectangleHeight.touched && <div className="text-danger">{rectangleHeight.error}</div>}
                </div>
              </div>
            }
            {checkShowElement(elementtype, 'degreeStart') &&
              <div className="form-group">
                <label className="col-sm-4" htmlFor={degreeStart}>Arc degree start-end</label>
                <div className="col-sm-4">
                  <input type="text" className="form-control" {...degreeStart}/>
                  {degreeStart.error && degreeStart.touched && <div className="text-danger">{degreeStart.error}</div>}
                </div>
                <div className="col-sm-4">
                  <input type="text" className="form-control" {...degreeEnd}/>
                  {degreeEnd.error && degreeEnd.touched && <div className="text-danger">{degreeEnd.error}</div>}
                </div>
              </div>
            }
            {checkShowElement(elementtype, 'lineWidth') &&
              <div className="form-group">
                <label className="col-sm-4" htmlFor={lineWidth}>Line width</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" {...lineWidth}/>
                  {lineWidth.error && lineWidth.touched && <div className="text-danger">{lineWidth.error}</div>}
                </div>
              </div>
            }
            {checkShowElement(elementtype, 'coordinates') && coordinates.map((child, index) =>
              <div key={index} className="form-group">
                <label className="col-sm-4" htmlFor={coordinates}>Coordinates</label>
                <div className="col-sm-4">
                  <label>
                    <input type="checkbox" {...child.xposCenter}/> CenterX
                  </label>
                  <input type="text" className="form-control" {...child.xpos}/>
                  {child.xpos.error && child.xpos.touched && <div child="text-danger">{child.xpos.error}</div>}
                </div>
                <div className="col-sm-4">
                  <label>
                    <input type="checkbox" {...child.yposCenter}/> CenterY
                  </label>
                  <input type="text" className="form-control" {...child.ypos}/>
                  {coordinates.error && coordinates.touched && <div className="text-danger">{coordinates.error}</div>}
                </div>
              </div>
            )}
              <div>
                {saveError && <div className="text-danger">{saveError}</div>}
              </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default"
                  onClick={() => editStop()}
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          <button className="btn btn-success"
                  onClick={handleSubmit(() => save(values, false)
                    .then(result => {
                      if (result && typeof result.error === 'object') {
                        return Promise.reject(result.error);
                      }
                    })
                  )}
                  disabled={pristine || invalid || submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
          <button className="btn btn-success"
                  onClick={handleSubmit(() => save(values, true)
                    .then(result => {
                      if (result && typeof result.error === 'object') {
                        return Promise.reject(result.error);
                      }
                    })
                  )}
                  disabled={pristine || invalid || submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save and close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
