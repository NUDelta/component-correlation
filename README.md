# Comparing Components

### Prereqs:

* Node v0.10.32

### Running locally:

* Run `npm install` (only needs to be run once)
* Once in the project directory, run `node app.js` and navigate to http://localhost:4000/ in your browser to see a prototype of comparing components (static navigation bars across 6 websites, using a Firebase database and CodeMirror)
* If making changes to the Sass, open a new Terminal tab and run `grunt watch` which will automatically compile your Sass if it detects any changes that have been made

### File structure:

* /clustering: uses the node k-means module to run a k-means clustering on sample nav bar comparisons, results file
* /demo: HTML of different navigation bars on various Alexa Top 100 Websites used in a demo of DOM diff algorithm
* /dom-diff: DOM diff algorithm files
* /processing: files for simplifying HTML for comparison
* /public: static assets for CodeMirror, compiled JavaScript files and stylesheets, and images
* /sass: CSS
* /user-test: results of June 2016 user study where 6 users were asked to write the HTML for a navigation bar using this system
* /views: Jade templates
* app.js: scraping and page rendering
* gruntfile.js: grunt tasks that auto-compiles Sass
* screencapture.js: Phantom script that takes a screenshot of navigation bars appearing on real websites

### Running the DOM diff algorithm:

* Simplify the HTML into a string (use /processing/cleanhtml.js, pass in the DOM node you want to simplify an HTML file in /demo)
* Copy and paste the HTML string as a variable into jqgram.js with an appropriate label. Note that the HTML should be wrapped in <html><body>...</body></html> tags
* Add that variable to the htmDomSet array
* Run the script from the command line with: `node jqgram.js`
* The script returns a diff value from 0 to 1, with 0 being totally dissimilar and 1 being completely identical