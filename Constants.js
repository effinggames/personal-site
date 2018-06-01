import * as Assert from 'assert';

export const contactEmail = process.env.CONTACT_EMAIL;
Assert.ok(contactEmail, 'ENV variable: CONTACT_EMAIL is not set!');

export const sendGridAPIKey = process.env.SENDGRID_API_KEY;
Assert.ok(sendGridAPIKey, 'ENV variable: SENDGRID_API_KEY is not set!');
