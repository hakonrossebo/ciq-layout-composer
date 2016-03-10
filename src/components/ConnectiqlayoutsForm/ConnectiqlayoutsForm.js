import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import connectiqlayoutValidation from './connectiqlayoutValidation';
import * as connectiqlayoutActions from 'redux/modules/connectiqlayouts';

@connect(
  state => ({
    saveError: state.connectiqlayouts.saveError
  }),
  dispatch => bindActionCreators(connectiqlayoutActions, dispatch)
)
@reduxForm({
  form: 'connectiqlayout',
  fields: ['_id', 'color', 'description', 'name'],
  validate: connectiqlayoutValidation
})
export default class ConnectiqlayoutsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
    const { editStop, fields: {description, name}, formKey, handleSubmit, invalid,
      pristine, save, submitting, saveError: { [formKey]: saveError }, values } = this.props;
    const styles = require('containers/Connectiqlayouts/Connectiqlayouts.scss');
    return (
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
                  onClick={() => editStop(formKey)}
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          <button className="btn btn-success"
                  onClick={handleSubmit(() => save(values)
                    .then(result => {
                      if (result && typeof result.error === 'object') {
                        return Promise.reject(result.error);
                      }
                    })
                  )}
                  disabled={pristine || invalid || submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}
        </td>
      </tr>
    );
  }
}
