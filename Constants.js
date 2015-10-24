'use strict';
const Assert = require('assert');

class Constants {
    constructor() {
        this.contactEmail = process.env.CONTACT_EMAIL;
        Assert(process.env.CONTACT_EMAIL, 'ENV variable: CONTACT_EMAIL is not set!');
    }
}

module.exports = new Constants();
