# Comparing Components

### Prereqs:

* Node v0.10.32

### Running locally:

* Run `npm install` (only needs to be run once)
* Once in the project directory, run `node app.js` and navigate to http://localhost:4000/scrape in your browser to see a prototype of comparing components (static navigation bars across 3 websites)
* If making changes to the Sass, open a new Terminal tab and run `grunt watch` which will automatically compile your Sass if it detects any changes that have been made

### File structure:

* /views: Jade templates
* app.js: scraping and page rendering
* /sass: CSS
* /public: static assets for CodeMirror, compiled stylesheets, and images