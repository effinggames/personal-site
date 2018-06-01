# Personal-Site

Personal landing page using Node, Express.js, Stylus.

### Usage:

```
git clone https://github.com/effinggames/personal-site.git && cd personal-site
npm install
npm start
```

Env variables:  
`CONTACT_EMAIL`: Email to send contact form messages.  
`SENDGRID_API_KEY`: Sendgrid api key to send contact form emails.  
`NODE_ENV`: Set to 'production' for multi-core + template caching.

NPM Tasks:  
`npm start`: Runs npm build + starts server.  
`npm build`: Compiles, minifies, and compresses the assets (for production).  
`npm build-dev`: Compiles + Watches the js, css, and image files for changes to recompile.
