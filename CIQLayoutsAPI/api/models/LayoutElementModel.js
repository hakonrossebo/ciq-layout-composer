var mongoose = require("mongoose");

var CoordinateSchema = new mongoose.Schema({
	xpos: {
	  type: Number
	},
	ypos: {
	  type: Number
	},
    xposCenter: {
      type: Boolean, default: true
    },
    yposCenter: {
      type: Boolean, default: true
    }
});


var ConnectIQLayoutElementSchema = new mongoose.Schema({
    connectiqlayout_ref: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'LayoutModel'
    },
	elementtype: {
	  type: String
	},
	name: {
	  type: String
	},
	description: {
	  type: String
	},
	displayText: {
	  type: String
	},
	zindex: {
	  type: Number, default: 1
	},
	text: {
	  type: String
	},
	font: {
	  type: String
	},
	color: {
	  type: String
	},
	justification: {
	  type: String
	},
	arcType: {
	  type: String
	},
	lineWidth: {
	  type: Number, default: 1
	},
	coordinates: [CoordinateSchema],
	visible: {
	  type: Boolean, default: true
	},
	filled: {
	  type: Boolean, default: false
	},
    xRadius: {
      type: Number, default: 0
    },
    yRadius: {
      type: Number, default: 0
    },
    rectangleWidth: {
      type: Number, default: 0
    },
    rectangleHeight: {
      type: Number, default: 0
    },
    degreeStart: {
      type: Number, default: 0
    },
    degreeEnd: {
      type: Number, default: 0
    },
	lastUpdatedDate: {
	  type: Date, default: Date.now
	}
});


ConnectIQLayoutElementSchema.pre('save', function(next){
  var now = new Date();
  this.lastUpdatedDate = now;
  next();
});

var LayoutElementModel = mongoose.model('LayoutElementModel', ConnectIQLayoutElementSchema, 'LayoutElementModels');

module.exports = {
  LayoutElementModel: LayoutElementModel
}


