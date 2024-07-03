require( 'dotenv' ).config();
const nodemailer = require( 'nodemailer' );

console.log( 'EMAIL_HOST:', process.env.EMAIL_HOST );
console.log( 'EMAIL_PORT:', process.env.EMAIL_PORT );
console.log( 'EMAIL_USER:', process.env.EMAIL_USER );
console.log( 'EMAIL_PASS:', process.env.EMAIL_PASS );

async function sendTestEmail() {
    const transporter = nodemailer.createTransport( {
        // host: process.env.EMAIL_HOST,
        // port: process.env.EMAIL_PORT,
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true for port 465, false for port 587
        auth: {
            // user: process.env.EMAIL_USER,
            // pass: process.env.EMAIL_PASS,
            user: 'rokonuzzamantest@outlook.com',
            pass: 'strong_password'
        },
    } );

    const mailOptions = {
        // from: process.env.EMAIL_USER,
        from: 'rokonuzzamantest@outlook.com',
        to: 'rjrupom221@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email',
    };

    try {
        await transporter.sendMail( mailOptions );
        console.log( 'Test email sent successfully' );
    } catch ( error ) {
        console.error( 'Error sending test email:', error );
    }
}

sendTestEmail();