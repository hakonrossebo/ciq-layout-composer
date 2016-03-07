const prefix = 'Gfx.';
const bgColor = 'COLOR_TRANSPARENT';



const generateTopSetup = () => {
  return `// Generated View from Connect IQ Layout Composer
// To test this view, create a new Connect IQ watch app named "CIQViewTester"
// and replace the default view with this content
using Toybox.WatchUi as Ui;
using Toybox.Graphics as Gfx;

class CIQViewTesterView extends Ui.View {
    function onUpdate(dc) {
      `;
};

const generateBottomSetup = () => {
  return `
  }
}
      `;
};


// if center => basere på center
const generateScreenSetup = () => {
  return `// Screen setup
      var screenWidth = dc.getWidth();
      var screenHeight = dc.getHeight();
      var screenCenterX = screenWidth / 2;
      var screenCenterY = screenHeight / 2;
      var elementPositionX = 0;
      var elementPositionY = 0;
      var elementPositionX2 = 0;
      var elementPositionY2 = 0;
`;
};

const generateElementPosition = (coordinate, coordinateNumber = '') => {
  let elementPositionX = `      elementPositionX${coordinateNumber} = ${coordinate.xpos};`;
  if (coordinate.xposCenter) {
    elementPositionX = `      elementPositionX${coordinateNumber} = ${coordinate.xpos};
      elementPositionX${coordinateNumber} = screenCenterX + elementPositionX${coordinateNumber};`;
  }
  let elementPositionY = `      elementPositionY${coordinateNumber} = ${coordinate.ypos};`;
  if (coordinate.yposCenter) {
    elementPositionY = `      elementPositionY${coordinateNumber} = ${coordinate.ypos};
      elementPositionY${coordinateNumber} = screenCenterY + elementPositionY${coordinateNumber};`;
  }
  return elementPositionX + '\n' + elementPositionY;
};

const generateTextElement = (layoutElement) => {
  return `
      // ${layoutElement.description}
` + generateElementPosition(layoutElement.coordinates[0]) + `
      dc.setColor(${prefix + layoutElement.color}, ${prefix + bgColor});
      dc.drawText(elementPositionX, elementPositionY, ${prefix + layoutElement.font}, "${layoutElement.displayText}",${prefix + layoutElement.justification});`;
};

const generateCircleElement = (layoutElement) => {
  const drawType = layoutElement.filled ? 'fillCircle' : 'drawCircle';
  return `
      // ${layoutElement.description}
` + generateElementPosition(layoutElement.coordinates[0]) + `
      dc.setColor(${prefix + layoutElement.color}, ${prefix + bgColor});
      dc.${drawType}(elementPositionX, elementPositionY, ${layoutElement.xRadius});`;
};

const generateEllipseElement = (layoutElement) => {
  const drawType = layoutElement.filled ? 'fillEllipse' : 'drawEllipse';
  return `
      // ${layoutElement.description}
` + generateElementPosition(layoutElement.coordinates[0]) + `
      dc.setColor(${prefix + layoutElement.color}, ${prefix + bgColor});
      dc.${drawType}(elementPositionX, elementPositionY, ${layoutElement.xRadius}, ${layoutElement.yRadius});`;
};

const generateRectangleElement = (layoutElement) => {
  const drawType = layoutElement.filled ? 'fillRectangle' : 'drawRectangle';
  return `
      // ${layoutElement.description}
` + generateElementPosition(layoutElement.coordinates[0]) + `
      dc.setColor(${prefix + layoutElement.color}, ${prefix + bgColor});
      dc.${drawType}(elementPositionX, elementPositionY, ${layoutElement.rectangleWidth}, ${layoutElement.rectangleHeight});`;
};

const generateArcElement = (layoutElement) => {
  return `
      // ${layoutElement.description}
` + generateElementPosition(layoutElement.coordinates[0]) + `
      dc.setColor(${prefix + layoutElement.color}, ${prefix + bgColor});
      dc.drawArc(elementPositionX, elementPositionY, ${layoutElement.xRadius}, ${prefix + layoutElement.arcType}, ${layoutElement.degreeStart}, ${layoutElement.degreeEnd});`;
};

const generatePointElement = (layoutElement) => {
  return `
      // ${layoutElement.description}
` + generateElementPosition(layoutElement.coordinates[0]) + `
      dc.setColor(${prefix + layoutElement.color}, ${prefix + bgColor});
      dc.drawPoint(elementPositionX, elementPositionY);`;
};

const generateLineElement = (layoutElement) => {
  return `
      // ${layoutElement.description}
` + generateElementPosition(layoutElement.coordinates[0]) + `
` + generateElementPosition(layoutElement.coordinates[1], 2) + `
      dc.setColor(${prefix + layoutElement.color}, ${prefix + bgColor});
      dc.setPenWidth(${layoutElement.lineWidth});
      dc.drawLine(elementPositionX, elementPositionY, elementPositionX2, elementPositionY2);
      dc.setPenWidth(1);`;
};


const ciqCodeGenerator = (layoutElements, generator) => {
  if (generator === 'code') {
    const code = layoutElements.map((layoutElement) => {
      switch (layoutElement.elementtype) {
        case 'text':
          return generateTextElement(layoutElement);
        case 'circle':
          return generateCircleElement(layoutElement);
        case 'ellipse':
          return generateEllipseElement(layoutElement);
        case 'rectangle':
          return generateRectangleElement(layoutElement);
        case 'arc':
          return generateArcElement(layoutElement);
        case 'point':
          return generatePointElement(layoutElement);
        case 'line':
          return generateLineElement(layoutElement);
        default:
          return '      // not created yet';
      }}
    ).reduce((line1, line2) => line1 + '\n' + line2);

    return generateTopSetup() + generateScreenSetup() + code + generateBottomSetup();
  }
};

export default ciqCodeGenerator;
