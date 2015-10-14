'use strict';
const NamedRouter = require('named-router');
const MainController = require('./controllers/MainController');

/**
 * Singleton router for all the frontend routes
 */
class AppRouter extends NamedRouter {
    constructor() {
        super();
        this.get('/', 'index', MainController.getFrontPage);
        this.get('/about', 'about', MainController.getAboutPage);
        this.get('/contact', 'contact', MainController.getContactPage);
    }
}

module.exports = new AppRouter();
