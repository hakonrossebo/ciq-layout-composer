'use strict';
var testdate = new Date().toISOString();

var url = require('url');
var LayoutModel = require("../models/LayoutModel").LayoutModel;
var LayoutElementModel = require("../models/LayoutElementModel").LayoutElementModel;

module.exports.getConnectIQLayouts = function getConnectIQLayouts (req, res, next) {
	LayoutModel.find({},function(err, results) {
		if (err) {
			console.log('db error');
			res.setHeader('Content-Type', 'application/json');
			res.status(500).end(JSON.stringify({}, null, 2));
		}
		res.setHeader('Content-Type', 'application/json');
		res.status(200).end(results);
	});
};

module.exports.updateConnectIQLayout = function updateConnectIQLayout (req, res, next) {
    var body = req.swagger.params['body'].value;
    LayoutModel.findById(body._id, function(err, updateItem) {
        if (err)
            res.send(err);

        updateItem.name = body.name;
        updateItem.description = body.description;
        updateItem.lastUpdatedDate = new Date();

        // save
        updateItem.save(function(err) {
            if (err) {
                console.log('db error');
                res.setHeader('Content-Type', 'application/json');
                res.status(500).end(JSON.stringify(err, null, 2));
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(201).end(JSON.stringify(updateItem, null, 2));
        });
    });
};

module.exports.addConnectIQLayout = function addConnectIQLayout (req, res, next) {
 	var body = req.swagger.params['body'].value;
	var newLayout = new LayoutModel(body);
	newLayout.save(function (err, createdItem) {
		if (err) {
			console.log('db error');
			res.setHeader('Content-Type', 'application/json');
		    res.status(500).end(JSON.stringify({}, null, 2));
		}
		res.setHeader('Content-Type', 'application/json');
		res.status(201).end(JSON.stringify(createdItem, null, 2));
	})
};

module.exports.getConnectIQLayoutById = function getConnectIQLayoutById (req, res, next) {
    var connectIQLayoutId = req.swagger.params['connectIQLayoutId'].value;

    LayoutModel.findById(connectIQLayoutId, function(err, itemFound) {
		if (err) return next(err);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).end(JSON.stringify(itemFound, null, 2));
    });
};


module.exports.deleteConnectIQLayoutById = function getConnectIQLayoutById (req, res, next) {
    var connectIQLayoutId = req.swagger.params['connectIQLayoutId'].value;

    LayoutModel.findById(connectIQLayoutId, function(err, deleteObject) {
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

module.exports.setActiveConnectIQLayout = function setActiveConnectIQLayout (req, res, next) {
    var connectIQLayoutId = req.swagger.params['connectIQLayoutId'].value;

    LayoutModel.update({ _id: { $ne: connectIQLayoutId }}, { useAsDefault: false }, { multi: true }, function (err, raw) {
        if (err) res.send(err);
        console.log('The raw response from Mongo was ', raw);
    });

    LayoutModel.findById(connectIQLayoutId, function(err, updateItem) {
        if (err)
            res.send(err);

        updateItem.useAsDefault = true;
        updateItem.lastUpdatedDate = new Date();

        // save
        updateItem.save(function(err) {
            if (err) {
                console.log('db error');
                res.setHeader('Content-Type', 'application/json');
                res.status(500).end(JSON.stringify(err, null, 2));
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(204).end();
        });
    });
};


module.exports.getActiveConnectIQLayout = function getActiveConnectIQLayout (req, res, next) {
    var query = {useAsDefault: true};
    var reqIfModifiedSince = req.get('If-Modified-Since');
    if (typeof (reqIfModifiedSince) !== 'undefined') {
        query = { useAsDefault: true, lastUpdatedDate:{ $gt:(reqIfModifiedSince)}};
    }

	LayoutModel.findOne(query,function(err, result) {
		if (err) {
			console.log('db error');
			res.setHeader('Content-Type', 'application/json');
			res.status(500).end(JSON.stringify({}, null, 2));
		}
        if (result == null) {
            res.status(304).end();
            return;
        }
		res.setHeader('Content-Type', 'application/json');
        var ciqid = result._id;
        LayoutElementModel.find({connectiqlayout_ref: ciqid},function(err, results) {
            if (err) {
                res.send(err);
            }
            res.setHeader('Content-Type', 'application/json');
            result.elements = results;
            res.status(200).end(result);
        });
	});
};
