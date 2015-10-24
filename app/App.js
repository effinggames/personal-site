'use strict';
const Fs = require('fs');
const Express = require('express');
const Compress = require('compression');
const BodyParser = require('body-parser')
const AppRouter = require('./AppRouter');
const Nunjucks = require('nunjucks');

const productionMode = process.env.NODE_ENV === 'production';
const viewDir = __dirname + '/views';
const publicDir = __dirname + '/../public';

let hashJson = productionMode ? require('../.hashes.json') : null;
/**
 * Main express app setup/configuration class
 */
class App extends Express {
    constructor() {
        super();
        this.use(Compress());
        this.use(BodyParser.json());
        this.use(AppRouter);
        this.use(Express.static(publicDir, { maxAge: productionMode ? 31536000000 : 0 })); //1 year caching

        this.set('view engine', 'html');
        this.set('views', viewDir);
        this.set('port', process.env.PORT || 8000);

        var env = Nunjucks.configure(viewDir, {
            autoescape: true,
            trimBlocks: true,
            lstripBlocks: true,
            express: this,
            tags: {
                variableStart: '[[',
                variableEnd: ']]'
            }
        });

        env.addGlobal('linkTo', (name, params) =>
            AppRouter.build(name, params)
        );
        env.addGlobal('getVersionedAsset', fileName =>
            productionMode ? fileName + '?v=' + hashJson[fileName] : fileName
        );
        env.addGlobal('getCurrentYear', () =>
            new Date().getFullYear()
        );
        env.addFilter('stringify', (value) =>
            JSON.stringify(value)
        );
    }
}

module.exports = App;