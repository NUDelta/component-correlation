// set up spawns for phridge
(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        //console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

// set variables for environment
var express = require('express');
var path = require('path');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var beautify_html = require('js-beautify').html;
var phridge = require('phridge');
var https = require('https');
var fs = require('fs');
var Firebase = require('firebase');
// set options for SSL server
var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
var app = express();
// var beautify_js = require('js-beautify'); // also available under "js" export
// var beautify_css = require('js-beautify').css;

// set routes
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/compare', function(req, res) {
	res.render('compare');
});

app.get('/comparison', function(req, res) {
	res.render('comparison');
});

app.get('/add', function(req, res) {
	res.render('add');
});

app.get('/contribute', function(req, res) {
	res.render('contribute');
});

app.get('/scrape', function(req, res){
	var newyorkercss, nytcss, nprcss;
	// (1) first 3 requests get html for nav bars using cheerio
	// (2) last 3 requests get css for nav bars using phridge/phantom
	async.parallel([
	    function(next) {
	        request("http://www.npr.org", function(error, response, html) {
	            if(!error){
		            var $ = cheerio.load(html);
		            var firstData = beautify_html($('#globalheader').html());
		        }
	            next(null, firstData);
	        });
	    },
	    function(next) {
	        request("http://www.newyorker.com", function(error, response, html) {
	            var $ = cheerio.load(html);
		        var secondData = beautify_html($('.primary-nav').html());
		        $('.primary-nav').each(function(elem){
		        	$(this).removeAttr('alt');
				    if ($(this).attr('alt')){
				        $(this).removeAttr('alt');
				    };
				});
	            next(null, secondData);
	        });
	    },
	    function(next) {
	        request("http://www.nytimes.com", function(error, response, html) {
	            if(!error){
		            var $ = cheerio.load(html);
		            var thirdData = beautify_html($('#shell').html());
		        }
	            next(null, thirdData);
	        });
	    },
	    function(next) {
	    	// creates new PhantomJS process
			phridge.spawn()
			    .then(function (phantom) {
			        return phantom.openPage("http://www.npr.org");
			    })
			    .then(function (page) {
			        // page.run(fn) runs fn inside PhantomJS
			        return page.run(function () {
			            // 'this' is an instance of PhantomJS' WebPage as returned by require("webpage").create()
					   //  this.includeJs(
						  // 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js',
						  // function() {
						  //   console.log('included');
						  // });
					    return this.evaluate(function () {
					    	// because of "this", need to redeclare jQuery and css() function in each async request
					    	// TODO:
					    	// - find way to abstract out css() function
					    	// - find way to consolidate async requests
			            	var $ = jQuery;
			            	jQuery.fn.css = (function(css2) { 
							    return function() {
							        if (arguments.length) { return css2.apply(this, arguments); }
							        var attr = ['font-family','font-size','font-weight','font-style','color',
							            'text-transform','text-decoration','letter-spacing','word-spacing',
							            'line-height','text-align','vertical-align','direction','background-color',
							            'background-image','background-repeat','background-position',
							            'background-attachment','opacity','width','height','top','right','bottom',
							            'left','margin-top','margin-right','margin-bottom','margin-left',
							            'padding-top','padding-right','padding-bottom','padding-left',
							            'border-top-width','border-right-width','border-bottom-width',
							            'border-left-width','border-top-color','border-right-color',
							            'border-bottom-color','border-left-color','border-top-style',
							            'border-right-style','border-bottom-style','border-left-style','position',
							            'display','visibility','z-index','overflow-x','overflow-y','white-space',
							            'clip','float','clear','cursor','list-style-image','list-style-position',
							            'list-style-type','marker-offset'];
							        var len = attr.length, obj = {};
							        for (var i = 0; i < len; i++) {
							            obj[attr[i]] = css2.call(this, attr[i]);
							        }
							        return obj;
							    };
							})(jQuery.fn.css);
							var styles = jQuery('#globalheader').css();
							console.log(styles);
			                return styles;
			            });
			        });
			    })

			    .done(function (css) {
			        console.log(css);
			        nprcss = css;
			        next(null, nprcss);
			    }, function (err) {
			        // Don't forget to handle errors
			        throw err;
			    });
			    
	    },
	    function(next) {
			phridge.spawn()
			    .then(function (phantom) {
			        return phantom.openPage("http://www.nytimes.com");
			    })
			    .then(function (page) {
			        // page.run(fn) runs fn inside PhantomJS
			        return page.run(function () {
					    return this.evaluate(function () {
			            	var $ = jQuery;
			            	jQuery.fn.css = (function(css2) { 
							    return function() {
							        if (arguments.length) { return css2.apply(this, arguments); }
							        var attr = ['font-family','font-size','font-weight','font-style','color',
							            'text-transform','text-decoration','letter-spacing','word-spacing',
							            'line-height','text-align','vertical-align','direction','background-color',
							            'background-image','background-repeat','background-position',
							            'background-attachment','opacity','width','height','top','right','bottom',
							            'left','margin-top','margin-right','margin-bottom','margin-left',
							            'padding-top','padding-right','padding-bottom','padding-left',
							            'border-top-width','border-right-width','border-bottom-width',
							            'border-left-width','border-top-color','border-right-color',
							            'border-bottom-color','border-left-color','border-top-style',
							            'border-right-style','border-bottom-style','border-left-style','position',
							            'display','visibility','z-index','overflow-x','overflow-y','white-space',
							            'clip','float','clear','cursor','list-style-image','list-style-position',
							            'list-style-type','marker-offset'];
							        var len = attr.length, obj = {};
							        for (var i = 0; i < len; i++) {
							            obj[attr[i]] = css2.call(this, attr[i]);
							        }
							        return obj;
							    };
							})(jQuery.fn.css);
							var styles = jQuery('#shell').css();
							console.log(styles);
			                return styles;
			            });
			        });
			    })

			    .done(function (css) {
			        console.log(css);
			        nytcss = css;
			        next(null, nytcss);
			    }, function (err) {
			        // Don't forget to handle errors
			        throw err;
			    });
	    },
	    function(next) {
			phridge.spawn()
			    .then(function (phantom) {
			        return phantom.openPage("http://www.newyorker.com");
			    })
			    .then(function (page) {
			        return page.run(function () {
			            return this.evaluate(function () {
			            	var $ = jQuery;
							jQuery.fn.css = (function(css2) { 
							    return function() {
							        if (arguments.length) { return css2.apply(this, arguments); }
							        var attr = ['font-family','font-size','font-weight','font-style','color',
							            'text-transform','text-decoration','letter-spacing','word-spacing',
							            'line-height','text-align','vertical-align','direction','background-color',
							            'background-image','background-repeat','background-position',
							            'background-attachment','opacity','width','height','top','right','bottom',
							            'left','margin-top','margin-right','margin-bottom','margin-left',
							            'padding-top','padding-right','padding-bottom','padding-left',
							            'border-top-width','border-right-width','border-bottom-width',
							            'border-left-width','border-top-color','border-right-color',
							            'border-bottom-color','border-left-color','border-top-style',
							            'border-right-style','border-bottom-style','border-left-style','position',
							            'display','visibility','z-index','overflow-x','overflow-y','white-space',
							            'clip','float','clear','cursor','list-style-image','list-style-position',
							            'list-style-type','marker-offset'];
							        var len = attr.length, obj = {};
							        for (var i = 0; i < len; i++) {
							            obj[attr[i]] = css2.call(this, attr[i]);
							        }
							        return obj;
							    };
							})(jQuery.fn.css);
							var styles = jQuery('.primary-nav').css();
			                return styles;
			            });
			        });
			    })

			    // phridge.disposeAll() exits cleanly all previously created child processes.
			    .finally(phridge.disposeAll)

			    .done(function (css) {
			        console.log(css);
			        newyorkercss = css;
			        next(null, newyorkercss);
			    }, function (err) {
			        // Don't forget to handle errors
			        throw err;
			    });
			    
	    }], function(err, results) {
	        // results returned in format [firstData, secondData]
	        res.render('scrape', {title: 'Scraping Navigation Bars', npr: results[0], newyorker: results[1], nytimes: results[2], nprcss: JSON.stringify(results[3]), nytcss: JSON.stringify(results[4]), newyorkercss: JSON.stringify(results[5])});
    });
});

// set server port (http and https)
http.createServer(app).listen(4000);
https.createServer(options, app).listen(3000);

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// instruct express to server up static assets
app.use(express.static('public'));