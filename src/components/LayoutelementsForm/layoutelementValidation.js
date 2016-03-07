// import {createValidator, required, maxLength, integer, oneOf} from 'utils/validation';
// import {createValidator, required, maxLength} from 'utils/validation';
import {createValidator, required, maxLength} from 'utils/validation';

export const elementtypes = ['text', 'arc', 'circle', 'ellipse', 'point', 'line', 'polygon', 'rectangle'];
export const fonttypes = ['FONT_LARGE', 'FONT_MEDIUM', 'FONT_SMALL', 'FONT_TINY', 'FONT_XTINY', 'FONT_NUMBER_HOT', 'FONT_NUMBER_MEDIUM', 'FONT_NUMBER_MILD', 'FONT_NUMBER_THAI_HOT'];
export const justificationtypes = ['TEXT_JUSTIFY_RIGHT', 'TEXT_JUSTIFY_CENTER', 'TEXT_JUSTIFY_LEFT', 'TEXT_JUSTIFY_VCENTER'];
export const colortypes = ['COLOR_WHITE', 'COLOR_BLACK', 'COLOR_BLUE', 'COLOR_DK_BLUE', 'COLOR_DK_GRAY', 'COLOR_DK_GREEN', 'COLOR_DK_RED', 'COLOR_GREEN', 'COLOR_LT_GRAY', 'COLOR_ORANGE', 'COLOR_PINK', 'COLOR_PURPLE', 'COLOR_RED', 'COLOR_TRANSPARENT', 'COLOR_YELLOW'];
export const arcTypes = ['ARC_CLOCKWISE', 'ARC_COUNTER_CLOCKWISE'];

const layoutelementValidation = createValidator({
  // color: [required, oneOf(colors)],
  // coordinates: [integer],
  description: [required, maxLength(50)]
});
export default layoutelementValidation;
