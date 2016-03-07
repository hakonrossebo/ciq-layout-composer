import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as layoutelementsActions from 'redux/modules/layoutelements';
// import {isLoaded, load as loadConnectiqlayouts} from 'redux/modules/layoutelements';
import {load as loadConnectiqlayouts} from 'redux/modules/layoutelements';
import {initializeWithKey} from 'redux-form';
// import { LayoutelementsForm } from 'components';
import { LayoutelementsForm, CodeGenerator } from 'components';
import { CoordinatesView } from 'components';
import { asyncConnect } from 'redux-async-connect';
import { DropdownButton, MenuItem} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

@asyncConnect([{
  deferred: true,
  promise: ({params, store: {dispatch}}) => {
    return dispatch(loadConnectiqlayouts(params.ciqid));
  }
}])

@connect(
  (state, ownProps) => ({
    layoutelements: state.layoutelements.data,
    editing: state.layoutelements.editing,
    error: state.layoutelements.error,
    loading: state.layoutelements.loading,
    params: ownProps.params
  }),
  {...layoutelementsActions, initializeWithKey })
export default class Layoutelements extends Component {
  static propTypes = {
    layoutelements: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired,
    additem: PropTypes.func.isRequired,
    deleteitem: PropTypes.func.isRequired,
    params: PropTypes.object
  };

  render() {
    const handleEdit = (connectiqlayout) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      const id = (typeof connectiqlayout === 'undefined') ? null : connectiqlayout._id;
      return () => editStart(id);
    };
    const handleAdd = (ciqid, elementType) => {
      const {additem} = this.props; // eslint-disable-line no-shadow
      return () => additem(ciqid, elementType)
        .then(result => {
          if (result && typeof result.error === 'object') {
            return Promise.reject(result.error);
          }
        });
    };
    const handleDelete = (layoutelement) => {
      const {deleteitem} = this.props; // eslint-disable-line no-shadow
      return () => deleteitem(layoutelement);
    };
    const {layoutelements, error, editing, loading} = this.props;
    const {ciqid} = this.props.params;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Layoutelements.scss');
    return (
      <div className={styles.layoutelements + ' container'}>
        <h1>
          Layout details
        </h1>
        <p>Edit layout elements here</p>
        <p>
          To show this layout on the Device simulator, make sure to activate the layout on the main page.
        </p>
        <LinkContainer to={ `/`}>
          <Button bsStyle="default">Back to main screen</Button>
        </LinkContainer>
        <h3>
          Elements
        </h3>
        <Helmet title="Elements"/>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        {(layoutelements && layoutelements.length > 0) &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th className={styles.typeCol}>Type</th>
            <th className={styles.descriptionCol}>Description</th>
            <th className={styles.colorCol}>Color</th>
            <th className={styles.displayTextCol}>Displaytext</th>
            <th className={styles.positionCol}>Position</th>
            <th className={styles.buttonCol}></th>
          </tr>
          </thead>
          <tbody>
          {
            layoutelements.map((layoutelement) =>
              <tr key={layoutelement._id}>
                <td className={styles.typeCol}>{layoutelement.elementtype}</td>
                <td className={styles.descriptionCol}>{layoutelement.description}</td>
                <td className={styles.colorCol}>{layoutelement.color}</td>
                <td className={styles.displayTextCol}>{layoutelement.displayText}</td>
                <td className={styles.positionCol}><CoordinatesView coordinates = {layoutelement.coordinates}/></td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-primary" onClick={handleEdit(layoutelement)}>
                    <i className="fa fa-pencil"/> Edit
                  </button>
      				  	<button className="btn btn-default" onClick={handleDelete(layoutelement)}>
                    <i className="fa fa-trash"/>
                  </button>
                </td>
              </tr>)
          }
          </tbody>
        </table>
      }
      {!layoutelements || layoutelements.length === 0 &&
        <p>
          No elements added yet. Add elements to get started.
        </p>
      }
      <DropdownButton bsStyle="primary" title="Add element" id="addelementsbutton">
        <MenuItem eventKey={['text', ciqid]} onClick={handleAdd(ciqid, 'text')}>Text element</MenuItem>
        <MenuItem eventKey={['circle', ciqid]} onClick={handleAdd(ciqid, 'circle')}>Circle</MenuItem>
        <MenuItem eventKey={['ellipse', ciqid]} onClick={handleAdd(ciqid, 'ellipse')}>Ellipse</MenuItem>
        <MenuItem eventKey={['rectangle', ciqid]} onClick={handleAdd(ciqid, 'rectangle')}>Rectangle</MenuItem>
        <MenuItem eventKey={['arc', ciqid]} onClick={handleAdd(ciqid, 'arc')}>Arc</MenuItem>
        <MenuItem eventKey={['point', ciqid]} onClick={handleAdd(ciqid, 'point')}>Point</MenuItem>
        <MenuItem eventKey={['line', ciqid]} onClick={handleAdd(ciqid, 'line')}>Line</MenuItem>
        <MenuItem eventKey={['polygon', ciqid]} onClick={handleAdd(ciqid, 'polygon')}>Polygon</MenuItem>
      </DropdownButton>
      {editing && <LayoutelementsForm ciqid={ciqid} editing={editing}/>}
      <p/>
      <p/>
      {(layoutelements && layoutelements.length > 0) &&
        <div>
          <p>
            When ready, you can generate Connect IQ view code by pressing "Generate code"
          </p>
          <CodeGenerator/>
        </div>
      }
    </div>
    );
  }
}
