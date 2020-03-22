const nodemailer = require('nodemailer');
var {email,pass} = require('../config/mail');

module.exports.mailupdate = (to,otp)=>{
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            type: "login",
            user: email,
            pass: pass
        }
    });
    var mail = {
        from: email,
        to: to,
        subject: "change password",
         text: `Enter this otp to change your password, \nE-mail : ${to}\nOTP : ${otp}` 
    };
    transporter.sendMail(mail,function(err,info){
        if(err){
            console.log(err);
        }
        else {
            console.log('email sent to :'+ to);
        }

    });
}