'use strict';
const Nodemailer = require('nodemailer');
const Constants = require('../../Constants');
const Promise = require('bluebird');

var transporter = Promise.promisifyAll(Nodemailer.createTransport());
var getEmailBody = req => `
Subject: ${req.body.subject}

Message: ${req.body.message}

--
This mail is sent via contact form on Rob Graeber http://www.robgraeber.com
`

class MainController {
    getFrontPage(req, res) {
        res.render('pages/front-page', {
            title: 'Rob Graeber'
        });
    }
    getAboutPage(req, res) {
        res.render('pages/about-page', {
            title: 'About/Bio of Robert L. Graeber'
        });
    }
    getContactPage(req, res) {
        res.render('pages/contact-page', {
            title: 'Contact Rob Graeber'
        });
    }
    sendEmail(req, res) {
        var errRsp = {
            status: 'ERROR',
            results: 'An error occurred!'
        }
        if (req.body.senderName && req.body.email && req.body.subject && req.body.message) {
            transporter.sendMailAsync({
                from: req.body.senderName + ` <${req.body.email}>`,
                to: Constants.contactEmail,
                subject: 'Message from RobGraeber.com',
                text: getEmailBody(req)
            }).then(info => {
                if (info.pending.length > 0) {
                    throw new Error("Email must not be pending");
                    return;
                }
                res.send({
                    status: 'OK',
                    results: 'Message sent successfully!'
                });
            }).catch(err => res.send(errRsp));
        } else {
            res.send(errRsp);
        }
        
    }
}

module.exports = new MainController();
