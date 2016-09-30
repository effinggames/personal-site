import NamedRouter from 'named-router';
import * as MainController from './controllers/MainController';

/**
 * Singleton router for all frontend routes
 */
export default class extends NamedRouter {
    constructor() {
        super();
        this.get('/', 'index', MainController.getFrontPage);
        this.get('/about', 'about', MainController.getAboutPage);
        this.get('/contact', 'contact', MainController.getContactPage);
        this.post('/api/sendEmail', MainController.sendEmail);
    }
}
