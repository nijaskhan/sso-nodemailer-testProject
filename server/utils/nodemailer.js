const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: text
        })
        console.log("email verifcation link sent to your email");
        return true;
    } catch (err) {
        console.log("error occured, kindly try after some time !!!");
        console.log(err.message);
        return false;
    }
}
