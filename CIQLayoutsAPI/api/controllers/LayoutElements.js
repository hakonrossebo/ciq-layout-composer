'use strict';

var url = require('url');

var LayoutModel = require("../models/LayoutModel").LayoutModel;
var LayoutElementModel = require("../models/LayoutElementModel").LayoutElementModel;

function updateConnectIQLayoutLastModifiedDate(connectIQLayoutId) {
    LayoutModel.findById(connectIQLayoutId, function(err, updateItem) {
        if (err)
            console.log(err);
        updateItem.lastUpdatedDate = new Date();  

        // save 
        updateItem.save(function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
};

module.exports.getLayoutElements = function getLayoutElements(req, res, next) {
  var connectIQLayoutId = req.swagger.params['connectIQLayoutId'].value;
	LayoutElementModel.find({connectiqlayout_ref: connectIQLayoutId},function(err, results) {
		if (err) {
            res.send(err);
		}
		res.setHeader('Content-Type', 'application/json');
		res.status(200).end(results);
	});
};

module.exports.addLayoutElement = function addLayoutElement (req, res, next) {
    var connectIQLayoutId = req.swagger.params['connectIQLayoutId'].value;
    var body = req.swagger.params['body'].value;
    var newLayoutElement = new LayoutElementModel(body);
    newLayoutElement.connectiqlayout_ref = connectIQLayoutId;
    newLayoutElement.save(function (err, createdItem) {
        if (err) {
            console.log('db error');
            res.setHeader('Content-Type', 'application/json');
            res.status(500).end(JSON.stringify({}, null, 2));
        }
        updateConnectIQLayoutLastModifiedDate(connectIQLayoutId);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).end(JSON.stringify(createdItem, null, 2));
    })
  
};


module.exports.getLayoutElement = function getLayoutElement (req, res, next) {
  var connectIQLayoutId = req.swagger.params['connectIQLayoutId'].value;
  var layoutElementsId = req.swagger.params['layoutElementsId'].value;
	LayoutElementModel.findOne({connectiqlayout_ref: connectIQLayoutId, _id:layoutElementsId},function(err, results) {
		if (err) {
            res.send(err);
		}
		res.setHeader('Content-Type', 'application/json');
		res.status(200).end(results);
	});
};


module.exports.updateLayoutElement = function updateLayoutElement (req, res, next) {
  var connectIQLayoutId = req.swagger.params['connectIQLayoutId'].value;
  var layoutElementsId = req.swagger.params['layoutElementsId'].value;
  var body = req.swagger.params['body'].value;
    LayoutElementModel.findById(layoutElementsId, function(err, updateItem) {
        if (err)
            res.send(err);

        updateItem.name = body.name;  
        updateItem.description = body.description;  
        updateItem.displayText = body.displayText;  
        updateItem.elementtype = body.elementtype;
        updateItem.font = body.font;
        updateItem.justification = body.justification;
        updateItem.arcType = body.arcType;
        updateItem.filled = body.filled;
        updateItem.color = body.color;
        updateItem.degreeStart = body.degreeStart;
        updateItem.degreeEnd = body.degreeEnd;
        updateItem.xRadius = body.xRadius;
        updateItem.yRadius = body.yRadius;
        updateItem.rectangleWidth = body.rectangleWidth;
        updateItem.rectangleHeight = body.rectangleHeight;
        updateItem.lineWidth = body.lineWidth;
        updateItem.coordinates = body.coordinates;
        

        // save 
        updateItem.save(function(err) {
            if (err) {
                console.log('db error');
                res.setHeader('Content-Type', 'application/json');
                res.status(500).end(JSON.stringify(err, null, 2));
            }
            updateConnectIQLayoutLastModifiedDate(connectIQLayoutId);
            res.setHeader('Content-Type', 'application/json');
            res.status(201).end(JSON.stringify(updateItem, null, 2));
        });
    });

};


module.exports.deleteLayoutElement = function deleteLayoutElement (req, res, next) {
  var connectIQLayoutId = req.swagger.params['connectIQLayoutId'].value;
  var layoutElementsId = req.swagger.params['layoutElementsId'].value;
    LayoutElementModel.findById(layoutElementsId, function(err, deleteObject) {
		if (err) return next(err);
        if (!deleteObject) {
			res.setHeader('Content-Type', 'application/json');
		    res.status(404).end();
        }
        else {
            deleteObject.remove();
            res.setHeader('Content-Type', 'application/json');
            res.status(200).end();
        }
    });
};
