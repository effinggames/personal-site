Personal-Site
=================

[![CI Build](https://codeship.com/projects/0819a420-b4d7-0133-0f2e-3e023a4cadff/status?branch=master)] (https://codeship.com/projects/134012)  

Personal landing page using Node, Express.js, Stylus.

### Usage:

```
git clone https://github.com/effinggames/personal-site.git && cd personal-site
npm install && bower install
gulp build
npm start
```

Gulp Tasks:  
`gulp clean`: Cleans the /public folder and all compiled assets  
`gulp default`: Compiles the js / css without minifying / compressing  
`gulp watch`: Watches the js, css, and image files for changes to recompile  
`gulp build`: Compiles, minifies, and compresses the assets (for production)  
