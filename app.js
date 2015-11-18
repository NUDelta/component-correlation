// set variables for environment
var express = require('express');
var path = require('path');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var jQuery = require('jquery');
var async = require('async');
var app = express();

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
		            var firstData = $('#globalheader');
		        }
	            next(null, firstData);
	        });
	    },
	    function(next) {
	        request("http://www.newyorker.com", function(error, response, html) {
	            var $ = cheerio.load(html);
		        var secondData = $('.primary-nav');
	            next(null, secondData);
	        });
	    }], function(err, results) {
	    	console.log(results);
	        // results is [firstData, secondData]
	        res.render('scrape', {npr: results[0], newyorker: results[1]});
    });

    // // url = 'http://www.newyorker.com/';
    // url = 'http://www.npr.org';

    // // The structure of our request call
    // // The first parameter is our URL
    // // The callback function takes 3 parameters, an error, response status code and the html

    // request(url, function(error, response, html){

    //     // First we'll check to make sure no errors occurred when making the request

    //     if(!error){
    //         // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
    //         var $ = cheerio.load(html);
    //         var page_source = $.html();
    //         var nav = $('.primary-nav');
    //         var nav = $('#globalheader');
    //         // var nav_css = nav.css(attr);
    //         // console.log(nav_css);

    //         res.render('scrape', {navbar: nav});
    //     }
    // });
});

// set server port
app.listen(4000);
console.log('server is running');

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// instruct express to server up static assets
app.use(express.static('public'));