import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as connectiqlayoutActions from 'redux/modules/connectiqlayouts';
import {isLoaded, load as loadConnectiqlayouts} from 'redux/modules/connectiqlayouts';
import {initializeWithKey} from 'redux-form';
import { ConnectiqlayoutsForm } from 'components';
import { AddConnectiqlayoutsForm } from 'components';
import { asyncConnect } from 'redux-async-connect';
import { Tooltip, Button, OverlayTrigger} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadConnectiqlayouts());
    }
  }
}])

@connect(
  state => ({
    connectiqlayouts: state.connectiqlayouts.data,
    editing: state.connectiqlayouts.editing,
    adding: state.connectiqlayouts.adding,
    error: state.connectiqlayouts.error,
    loading: state.connectiqlayouts.loading
  }),
  {...connectiqlayoutActions, initializeWithKey })
export default class Connectiqlayouts extends Component {
  static propTypes = {
    connectiqlayouts: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    adding: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired,
    addStart: PropTypes.func.isRequired,
    setActiveItem: PropTypes.func.isRequired,
    deleteitem: PropTypes.func.isRequired
  };
  render() {
    const handleEdit = (connectiqlayout) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      return () => editStart(String(connectiqlayout._id));
    };
    const handleAdd = () => {
      const {addStart} = this.props; // eslint-disable-line no-shadow
      return () => addStart();
    };
    const handleDelete = (connectiqlayout) => {
      const {deleteitem} = this.props; // eslint-disable-line no-shadow
      return () => deleteitem(connectiqlayout);
    };
    const handleActivate = (connectiqlayout) => {
      const {setActiveItem} = this.props; // eslint-disable-line no-shadow
      return () => setActiveItem(connectiqlayout);
    };
    const {connectiqlayouts, error, editing, adding, loading} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const tooltip = (
      <Tooltip id="activatetooltip">By activating this layout, the viewer app will display elements from this layout</Tooltip>
    );
    const styles = require('./Connectiqlayouts.scss');
    return (
      <div className={styles.connectiqlayouts + ' container'}>
        <h1>
          Layouts
        </h1>
        <p>A layout is similar to a Connect IQ View than you can add drawables(elements) to. Add a new layout, then add one or more elements.</p>
        <p>Press the "Activate" button to hook up the Connect IQ Device simulator to view and listen to the Layout you want.</p>
        <Helmet title="Connectiqlayouts"/>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        {(connectiqlayouts && connectiqlayouts.length > 0) &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th className={styles.nameCol}>Name</th>
            <th className={styles.descriptionCol}>Description</th>
            <th className={styles.buttonCol}></th>
          </tr>
          </thead>
          <tbody>
          {
            connectiqlayouts.map((connectiqlayout) => editing[connectiqlayout._id] ?
              <ConnectiqlayoutsForm formKey={String(connectiqlayout._id)} key={String(connectiqlayout._id)} initialValues={connectiqlayout}/> :
              <tr key={connectiqlayout._id}>
                <td className={styles.nameCol}>
                  {connectiqlayout.name}
                </td>
                <td className={styles.descriptionCol}>{connectiqlayout.description}</td>
                <td className={styles.buttonCol}>
                  <LinkContainer to={ `connectiqlayout/${connectiqlayout._id}`}>
                    <Button bsStyle="primary">Edit elements</Button>
                  </LinkContainer>
                  <button className="btn btn-default" onClick={handleEdit(connectiqlayout)}>
                    <i className="fa fa-pencil"/>
                  </button>
                  <button className="btn btn-default" onClick={handleDelete(connectiqlayout)}>
                    <i className="fa fa-trash"/>
                  </button>
                  {!connectiqlayout.useAsDefault &&
                    <OverlayTrigger placement="bottom" overlay={tooltip}>
                      <Button bsStyle="default" onClick={handleActivate(connectiqlayout)}>Activate</Button>
                    </OverlayTrigger>
                  }
                </td>
              </tr>)
          }
          </tbody>
        </table>}
        {
          adding ?
          <AddConnectiqlayoutsForm /> :
          <button className="btn btn-primary" onClick={handleAdd()}>
            <i className="fa fa-plus"/> Add a new layout
          </button>
        }
      </div>
    );
  }
}
