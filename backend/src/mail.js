const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const makeNiceEmial = text => `
  <div>
    <h2>${text}<h2>
  </div>
`;

exports.transport = transport;
exports.makeNiceEmial = makeNiceEmial;