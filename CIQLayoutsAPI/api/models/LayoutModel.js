var mongoose = require("mongoose");

var ConnectIQLayoutSchema = new mongoose.Schema({
	name: {
	  type: String
	},
	description: {
	  type: String
	},
	lastUpdatedDate: {
	  type: Date, default: Date.now
	},
	useAsDefault: {
	  type: Boolean, default: false
	},
    elements : [{ type: mongoose.Schema.Types.ObjectId, ref: 'LayoutElementModel' }]
});


var LayoutModel = mongoose.model('LayoutModel', ConnectIQLayoutSchema, 'LayoutModels');

module.exports = {
  LayoutModel: LayoutModel
}
