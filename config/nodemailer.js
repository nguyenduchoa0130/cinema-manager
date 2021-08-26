const nodemailer = require('nodemailer');
exports.send = async function (to, subject, content) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL || 'cinejungroup@gmail.com',
            pass: process.env.EMAIL_PASSWORD || 'cinejun18K1@',
        },
    });

    const info = await transporter.sendMail({
        from: process.env.EMAIL || 'cinejungroup@gmail.com',
        to,
        subject,
        text: content,
    });
    return info;
};
