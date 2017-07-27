const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const fs = require('fs');
const homeDir = require("os").homedir();
const path = require("path");

function sendEmail(message) {
    return new Promise(function (resolve, reject) {
        let auth = {};
        if (process.env.mail_gun_api_key && process.env.mail_gun_domain) {
            auth.auth = {
                api_key: process.env.mail_gun_api_key,
                domain: process.env.mail_gun_domain
            }
        } else {
            try {
                let jsonString = fs.readFileSync(path.join(homeDir, "personal-site-config.json"));
                let config = JSON.parse(jsonString);

                console.log(config);

                auth.auth = {
                    api_key: config.api_key,
                    domain: config.domain
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        }

        var transporter = nodemailer.createTransport(mg(auth));

        var html = `
            <h2>` + message.name + ` says:</h2>
            <p>` + message.body + `</p>
        `;

        var mailOptions = {
            from: message.email,
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
