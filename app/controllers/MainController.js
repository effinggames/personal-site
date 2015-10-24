'use strict';
const Nodemailer = require('nodemailer');
const Constants = require('../../Constants');
var transporter = Nodemailer.createTransport();

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
            html: `
                Subject: ${req.body.subject}
                <br><br>
                Message: ${req.body.message}
                <br><br>
                --
                <br><br>
                This mail is sent via contact form on Rob Graeber http://www.robgraeber.com
            `
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
