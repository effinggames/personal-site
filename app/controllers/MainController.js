'use strict';
const Nodemailer = require('nodemailer');
const Constants = require('../../Constants');

var transporter = Nodemailer.createTransport();
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
        console.log(req.body);

        transporter.sendMail({
            from: req.body.senderName + ` <${req.body.email}>`,
            to: Constants.contactEmail,
            subject: 'Message from RobGraeber.com',
            text: getEmailBody(req);
        }, function(error, info){
            if(error){
                return console.log('err:',error);
            }
            console.log('Message sent: ' + JSON.stringify(info));

        });
        res.send({status: 'OK'});

    }
}

module.exports = new MainController();
