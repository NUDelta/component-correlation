(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
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
var app = express();
var beautify_html = require('js-beautify').html;
var phridge = require('phridge');
// var beautify_js = require('js-beautify'); // also available under "js" export
// var beautify_css = require('js-beautify').css;

// set routes
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/compare', function(req, res) {
	res.render('compare');
});

app.get('/scrape', function(req, res){
	var newyorkercss;
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
				    // console.log($(this));
				    // console.log($(this).html());
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
	    	// phridge.spawn() creates a new PhantomJS process
			phridge.spawn()
			    .then(function (phantom) {
			        // phantom.openPage(url) loads a page with the given url
			        return phantom.openPage("http://www.newyorker.com");
			    })
			    .then(function (page) {
			        // page.run(fn) runs fn inside PhantomJS
			        return page.run(function () {
			            // Here we're inside PhantomJS, so we can't reference variables in the scope
			            // 'this' is an instance of PhantomJS' WebPage as returned by require("webpage").create()
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
			    // This should be called in any case to clean up everything.
			    .finally(phridge.disposeAll)

			    .done(function (css) {
			        console.log(css);
			        newyorkercss = css;
			        // return newyorkercss;
			        next(null, newyorkercss);
			    }, function (err) {
			        // Don't forget to handle errors
			        // In this case we're just throwing it
			        throw err;
			    });
			    
	    }], function(err, results) {
	        // results is [firstData, secondData]
	        res.render('scrape', {title: 'Scraping Navigation Bars', npr: results[0], newyorker: results[1], nytimes: results[2], json: JSON.stringify(results[3])});
    });
});

// set server port
app.listen(4000);
console.log('server is running on port 4000');

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// instruct express to server up static assets
app.use(express.static('public'));