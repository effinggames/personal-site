import Express from 'express';
import Compress from 'compression';
import AppRouter from './AppRouter';
import * as BodyParser from 'body-parser';
import * as Nunjucks from 'nunjucks';

const productionMode = process.env.NODE_ENV === 'production';
const viewDir = __dirname + '/views';
const publicDir = __dirname + '/../../public';

const hashJson = productionMode ? require('../../hashes.json') : null;
const appRouter = new AppRouter();

/**
 * Main express app setup/configuration class
 */
export default class extends Express {
    constructor() {
        super();

        this.use(Compress());
        this.use(BodyParser.json());
        this.use(appRouter);
        this.use(Express.static(publicDir, { maxAge: productionMode ? 31536000000 : 0 })); //1 year caching

        this.set('view engine', 'twig');
        this.set('views', viewDir);
        this.set('port', process.env.PORT || 8000);

        const env = Nunjucks.configure(viewDir, {
            autoescape: true,
            trimBlocks: true,
            lstripBlocks: true,
            express: this,
            tags: {
                variableStart: '{{',
                variableEnd: '}}'
            }
        });

        env.addGlobal('linkTo', function(name, params) {
            return appRouter.build(name, params);
        });
        env.addGlobal('getVersionedAsset', function(fileName) {
            return productionMode ? fileName + '?v=' + hashJson[fileName] : fileName;
        });
        env.addGlobal('getCurrentYear', function() {
            return new Date().getFullYear();
        });
        env.addFilter('stringify', function(value) {
            return JSON.stringify(value);
        });
    }
}
