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
var jQuery = require('jquery');
var async = require('async');
var app = express();
// var beautify_js = require('js-beautify'); // also available under "js" export
// var beautify_css = require('js-beautify').css;
var beautify_html = require('js-beautify').html;

// set routes
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/compare', function(req, res) {
	res.render('compare');
});

app.get('/scrape', function(req, res){
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
	    }], function(err, results) {
	        // results is [firstData, secondData]
	        res.render('scrape', {title: 'Scraping Navigation Bars', npr: results[0], newyorker: results[1], nytimes: results[2]});
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