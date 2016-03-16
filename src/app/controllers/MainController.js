import * as Nodemailer from 'nodemailer';
import * as Constants from '../../Constants';
import * as Promise from 'bluebird';
import * as Logger from 'winston2';

const transporter = Promise.promisifyAll(Nodemailer.createTransport());
const getEmailBody = req =>`
Subject: ${req.body.subject}

Message: ${req.body.message}

--
This mail is sent via contact form on Rob Graeber http://www.robgraeber.com
`;

export const getFrontPage = function(req, res) {
    res.render('pages/front-page', {
        title: 'Rob Graeber'
    });
};

export const getAboutPage = function(req, res) {
    res.render('pages/about-page', {
        title: 'About/Bio of Robert L. Graeber'
    });
};

export const getContactPage = function(req, res) {
    res.render('pages/contact-page', {
        title: 'Contact Rob Graeber'
    });
};

export const sendEmail = async function(req, res) {
    Logger.info('Attempting to send mail:');

    const errRsp = {
        status: 'ERROR',
        results: 'An error occurred!'
    };

    if (req.body.senderName && req.body.email && req.body.subject && req.body.message) {
        Logger.info('Request valid, sending email');

        try {
            const info = await transporter.sendMailAsync({
                from: req.body.senderName + ` <${req.body.email}>`,
                to: Constants.contactEmail,
                subject: 'Message from RobGraeber.com',
                text: getEmailBody(req)
            });

            if (info.pending.length > 0) {
                Logger.info('Email pending:', info);
                throw new Error("Email must not be pending");
            } else {
                Logger.info('Email sent successfully!');
                res.send({
                    status: 'OK',
                    results: 'Message sent successfully!'
                });
            }
        } catch(err) {
            Logger.info('Err:', err);
            res.send(errRsp)
        }
    } else {
        Logger.info('Err: Missing fields -', req.body);
        res.send(errRsp);
    }
};
