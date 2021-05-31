const nodemailer = require('nodemailer');
exports.send = async function (to, subject, content) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL || 'cinejun0130@gmail.com',
            pass: process.env.EMAIL_PASSWORD || 'nguyenduchoa0130',
        },
    });

    const info = await transporter.sendMail({
        from: process.env.EMAIL || 'cinejun0130@gmail.com',
        to,
        subject,
        text: content,
    });
    return info;
};
