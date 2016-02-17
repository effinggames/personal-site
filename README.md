Personal-Site
=================

Personal landing page using Node, Express.js, Stylus.

### Usage:

```
git clone https://github.com/effinggames/personal-site.git && cd personal-site
npm install && bower install
gulp build
npm start
```
Env variables:  
`CONTACT_EMAIL`: Email to send contact form messages 

Gulp Tasks:  
`gulp clean`: Cleans the /public folder and all compiled assets  
`gulp default`: Compiles + Watches the js, css, and image files for changes to recompile
`gulp build`: Compiles, minifies, and compresses the assets (for production)  
