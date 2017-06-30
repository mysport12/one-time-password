const twilio = require('twilio');
const twilio_account = require('./twilio_account.json');

const accountSid = twilio_account.accountSid;
const authToken = twilio_account.authToken;

module.exports = new twilio.Twilio(accountSid, authToken);