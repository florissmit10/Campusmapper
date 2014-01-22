'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model={dataurl: '/get?type=welkom',
    				mapCenter: '[52.24406788078239, 6.855125427246093]',
    				mapZoom: 15
    			};
        res.render('index', model);
        
    });

    server.get('/studie', function (req, res) {
         var model={dataurl: '/get?type=studie',
    				mapCenter: '[52.239009264494015, 6.855812072753906]',
    				mapZoom: 16
    			};
        res.render('index', model);
        
    });

    server.get('/wonen', function (req, res) {
        var model={dataurl: '/get?type=wonen',
    				mapCenter: '[52.245907234646474, 6.853623390197754]',
    				mapZoom: 15
    			};
        res.render('index', model);
        
    });

    server.get('/activisme', function (req, res) {
         var model={dataurl: '/get?type=activisme',
    				mapCenter: '[52.245145225868, 6.852142810821533]',
    				mapZoom: 16
    			};
        res.render('index', model);
        
    });

};
