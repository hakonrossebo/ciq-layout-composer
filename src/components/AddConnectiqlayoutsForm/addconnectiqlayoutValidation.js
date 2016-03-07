// import {createValidator, required, maxLength, integer, oneOf} from 'utils/validation';
import {createValidator, required, maxLength} from 'utils/validation';

export const colors = ['Blue', 'Fuchsia', 'Green', 'Orange', 'Red', 'Taupe'];

const connectiqlayoutValidation = createValidator({
  // color: [required, oneOf(colors)],
  // sprocketCount: [required, integer],
  name: [required, maxLength(30)]
});
export default connectiqlayoutValidation;
