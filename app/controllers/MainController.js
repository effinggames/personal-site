'use strict';
const Promise = require('bluebird');

class MainController {
    getFrontPage(req, res) {
        res.render('pages/front-page', {
            title: 'Rob Graeber',
            data: {}
        });
    }
    getAboutPage(req, res) {
        res.render('pages/about-page', {
            title: 'About/Bio of Robert L. Graeber',
            data: {}
        });
    }
    getContactPage(req, res) {
        res.render('pages/contact-page', {
            title: 'Contact Rob Graeber',
            data: {}
        });
    }

}

module.exports = new MainController();
