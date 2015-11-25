// // node_modules/.bin/phantomjs screencapture.js
// var page = require('webpage').create();

// page.onConsoleMessage = function(msg) {
//     console.log(msg);
// };

// page.open("http://npr.org", function(status) {
//     if ( status === "success" ) {
//         page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
//             page.evaluate(function() {
//                 console.log($('#globalheader').css('height'));
//             });
//             phantom.exit();
//         });
//     }
// });

var page = require('webpage').create();
//viewportSize being the actual size of the headless browser
page.viewportSize = { width: 1280, height: 768 };
//the clipRect is the portion of the page you are taking a screenshot of
page.clipRect = { top: 0, left: 0, width: 1280, height: 768 };
page.open('http://www.theatlantic.com/', function() {
	window.document.body.scrollTop = 500;
	setTimeout(function() {
		page.render('public/img/atlantic.png');
  		phantom.exit();
	}, 5000);
});