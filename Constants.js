import * as Assert from 'assert';

export const contactEmail = process.env.CONTACT_EMAIL;
Assert.ok(contactEmail, 'ENV variable: CONTACT_EMAIL is not set!');
