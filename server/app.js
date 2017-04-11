    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    var multer = require('multer');
    var im = require('imagemagick');
  
    app.use(function(req, res, next) { //allow cross origin requests
       next();
    });

    app.use(express.static('../client'));
    app.use(bodyParser.json());

    var storage = multer.diskStorage({ 
      destination: function(req, file, cb) {
        cb(null, './uploads/fullsize/');
       },
      filename: function(req, file, cb) {
        cb(null, file.originalname);
      }
    });

    var upload = multer({ 
      storage: storage
    }).single('file');

    app.post('/upload', function(req, res) {
      upload(req, res, function(err) {
        console.log(req.file.originalname);
        var options = {
          width: 755,
          height: 450,
          srcPath: './uploads/fullsize/' + req.file.originalname,
          dstPath: './uploads/thumb/horizontal/' + req.file.originalname
        };

        im.resize(options, function(err) {
          if (err) {
            throw err; }
          res.end("horizontal image resize complete");
        });

        var options = {
          width: 755,
          height: 450,
          srcPath: './uploads/fullsize/' + req.file.originalname,
          dstPath: './uploads/thumb/vertical/' + req.file.originalname
        };

        im.resize(options, function(err) {
          if (err) {
            throw err; }
          res.end("vertical image resize complete");
        });

        var options = {
          width: 365,
          height: 212,
          srcPath: './uploads/fullsize/' + req.file.originalname,
          dstPath: './uploads/thumb/horizontal-small/' + req.file.originalname
        };

        im.resize(options, function(err) {
          if (err) {
            throw err; }
          res.end("horizontal-small image resize complete");
        });

        var options = {
          width: 380,
          height: 380,
          srcPath: './uploads/fullsize/' + req.file.originalname,
          dstPath: './uploads/thumb/gallery/' + req.file.originalname
        };

        im.resize(options, function(err) {
          if (err) {
            throw err; }
          res.end("gallery image resize complete");
        });
        if (err) {
          res.json({ error_code: 1, err_desc: err });
          return;
        }
        res.json({ error_code: 0, err_desc: null });
      });
    });

    app.listen('3000', function() {
      console.log('running on 3000...');
    });