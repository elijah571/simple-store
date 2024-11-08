import nodemailer from 'nodemailer';

// Create the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD, 
    },
});

// Function to send email

export const sendVerificationEmail = async (email, name, verificationToken) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Please Verify Your Email Address',
            html: `
                <h3>Welcome to Our Platform, ${name}!</h3>
                <p>Please click the link below to verify your email address:</p>
                <a href="${process.env.BASE_URL}/verify?token=${verificationToken}" style="text-decoration:none; color:white; background-color:#4CAF50; padding:8px 12px; border-radius:5px;">Verify Email</a>
                <p style=" font-weigth: bold; color:white; font-size:20px;" >${verificationToken} </p>
                <p>If you did not request this, please ignore this email.</p>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};

// Account verify sucessfullty


export const sendSuccessfulVerificationEmail = async (email) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Email Verify Successfully',
            html: `
                <h3>Welcome to Our Platform!</h3>
                <p> Your email successfully verified </p> 
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};
// forgot  password token
export const forgotPasswordResetEmail = async (email, resetToken) => {
     try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Forgot password Token',
            html: `
                <h3>Welcome to Our Platform!</h3>
                <p> Your email successfully verified </p>
                <h2 styles="background-color:red; color:white; padding:12px 15px;"> ${resetToken}</h2>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
    
}

// Password reset successful
export const passwordSuccessfulEmail = async (email) => {
     try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Forgot password Token',
            html: `
                <h3>Welcome to Our Platform!</h3>
                <p> Your password is successfully reset </p>
                
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
    
}