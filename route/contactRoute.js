const router = require('express').Router()
const nodemailer = require('nodemailer')
require('dotenv').config();

router.post('/contact',(req,res)=>{
    let data = req.body
    if (!data.name || !data.email || !data.message) {
        return res.status(400).json({ msg: "Please fill all the fields" });
    }
    console.log("BODY:", req.body);
    console.log("HEADERS:", req.headers);
console.log("BODY:", req.body);
        let smtpTransporter = nodemailer.createTransport({
            service:'Gmail',
            port:465,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
            
        })
        console.log("ENV USER:", process.env.EMAIL_USER);
console.log("ENV PASS:", process.env.EMAIL_PASS);
        let mailOptions = {
            from: data.email,
            to: 'nandakumaryugalkishore@gmail.com',
            subject: `message from ${data.name}`,
            html:`
            <h3>Information</h3>
            <ul>
                <li>Name: ${data.name}</li>
                <li>Email: ${data.email}</li>
            </ul>    
            <h3>Message</h3>
            <p>${data.message}</p>
            `
        }

        smtpTransporter.sendMail(mailOptions,(error)=>{
            try {
                if (error) {
                    console.error("MAIL ERROR:", error);
                    return res.status(500).json({ msg: "Error sending email" });
                }
                res.status(200).json({msg:"Message sent Successfully"})
            } catch (error) {
                if(error) return res.status(500).json({msg:"There is server error"})
            }
        })

    
})
module.exports=router
