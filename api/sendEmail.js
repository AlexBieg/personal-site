var nodemailer = require('nodemailer');

function sendEmail(message) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alexbiegspersonalsite@gmail.com',
            pass: '47nq2LJmt4GM'
        }
    });

    var mailOptions = {
        from: message.from,
        to: "alexbieg95@gmail.com",
        subject: message.subject,
        text: message.body
    };

    return new Promise(function(resolve, reject) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                console.log('sent email');
                resolve();
            }
        });
    });

}

module.exports = sendEmail;
