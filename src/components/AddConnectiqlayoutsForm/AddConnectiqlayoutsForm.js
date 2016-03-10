import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import addconnectiqlayoutValidation from './addconnectiqlayoutValidation';
import * as connectiqlayoutActions from 'redux/modules/connectiqlayouts';

@connect(
  state => ({
    addError: state.connectiqlayouts.addError
  }),
  dispatch => bindActionCreators(connectiqlayoutActions, dispatch)
)
@reduxForm({
  form: 'addconnectiqlayout',
  fields: ['name', 'description'],
  validate: addconnectiqlayoutValidation
})
export default class ConnectiqlayoutsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    addStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    additem: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    addError: PropTypes.object,
    values: PropTypes.object.isRequired
  };

  render() {
    const { addStop, fields: {name, description}, handleSubmit, invalid,
      pristine, additem, submitting, addError: addError, values} = this.props;
    const styles = require('containers/Connectiqlayouts/Connectiqlayouts.scss');
    return (
      <table>
        <tbody>
          <tr className={submitting ? styles.saving : ''}>
            <td className={styles.nameCol}>
              <input type="text" className="form-control" {...name}/>
              {name.error && name.touched && <div className="text-danger">{name.error}</div>}
            </td>
            <td className={styles.descriptionCol}>
              <input type="text" className="form-control" {...description}/>
              {description.error && description.touched && <div className="text-danger">{description.error}</div>}
            </td>
            <td className={styles.buttonCol}>
              <button className="btn btn-default"
                      onClick={() => addStop()}
                      disabled={submitting}>
                <i className="fa fa-ban"/> Cancel
              </button>
              <button className="btn btn-success"
                      onClick={handleSubmit(() => additem(values)
                        .then(result => {
                          if (result && typeof result.error === 'object') {
                            return Promise.reject(result.error);
                          }
                        })
                      )}
                      disabled={pristine || invalid || submitting}>
                <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Add
              </button>
              {addError && <div className="text-danger">{addError}</div>}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
