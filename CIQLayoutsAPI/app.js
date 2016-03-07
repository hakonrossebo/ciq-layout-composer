'use strict';

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui')
var app = require('express')();
var mongoose   = require('mongoose');


module.exports = app; 
mongoose.connect('mongodb://localhost/ciq'); 

var config = {
appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) {
        console.log(err); 
        throw err; 
    }

    // install middleware
    swaggerExpress.register(app);
    app.use(SwaggerUi(swaggerExpress.runner.swagger));
    var port = process.env.PORT || 3043;
    app.listen(port);

    // console.log(swaggerExpress.runner.swagger.paths);
    if (swaggerExpress.runner.swagger.paths['/ConnectIQLayouts/']) {
        console.log('ConnectIQLayouts path ok - running');
    }
});
