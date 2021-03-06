var config = require('../config.json');
var express = require('express');
var request = require('request');
var os = require('os');

var router = express.Router();

var base = config.monitor;

router.get('/api/serverz', function(req, res, next) {
    var serverz = {
        hostname: os.hostname(),
        loadavg: os.loadavg(),
        uptime: os.uptime(),
        freemem: os.freemem(),
        totalmem: os.totalmem(),
        cpus: os.cpus()
    };
    res.json(serverz);
});

router.get('/api/config', function(req, res, next) {
  res.json(config);
});

router.get('/api/connz', function(req, res, next) {
    'use strict';
    request(base + '/connz', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body));
        } else {
            next(error);
        }
    });
});

router.get('/api/varz', function(req, res, next) {
    'use strict';
    request(base + '/varz', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body));
        } else {
            next(error);
        }
    });

});

router.get('/', function(req, res, next) {
    'use strict';
    var context = {
        title: 'NATS.io monitor'
    };
    res.render('index', context);

});


module.exports = router;
