
var mongodb= require('mongodb'),
    Express= require('express'),
    UploadStreamMiddleware= require('./../uploadToGridfsCloudinary')
    http= require('http');

var mongoUrl= 'yourMongoUrl',
    cloudinaryConf={
        cloud_name: 'yourCloudinaryName',
        api_key: 'yourApiKey',
        api_secret: 'yourApiSecret'
    };



var app = Express();
app.use(Express.static(__dirname + '/public'));

http.createServer(app).listen(5001, function(err){
    if(err) return console.log('Server start error:',err);

    mongodb.connect(mongoUrl , function(err, db){
        if(err) return console.log('Mongo connect error:',err);

        var uploadMiddlewareFunction= UploadStreamMiddleware(db,cloudinaryConf);

        app.post('/upload', uploadMiddlewareFunction, function(req, res, next) {
            console.log('File meta and storage ids:',req.fileInfoArr);
            res.json({file_data: req.fileInfoArr});
        });

        console.log('Ready for uploads.')
    });
});





