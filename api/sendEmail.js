var nodemailer = require('nodemailer');

function sendEmail(message) {
    return new Promise(function (resolve, reject) {
        console.log("starting email");
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'alexbiegspersonalsite@gmail.com',
                pass: '47nq2LJmt4GM'
            }
        });

        var html = `
            <h1>` + message.name + ` says:</h1>
            <p>` + message.body + `</p>
            <p> To respond click <a href="mailto:` + message.email + `">` + message.email + `</a></p>
        `;

        var mailOptions = {
            to: "alexbieg95@gmail.com",
            subject: message.subject,
            html: html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            console.log(error);
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
