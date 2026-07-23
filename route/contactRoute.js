const router = require('express').Router()
const { Resend } = require("resend");
require('dotenv').config();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/contact', async (req,res)=>{
    let data = req.body
    if (!data.name || !data.email || !data.message) {
        return res.status(400).json({ msg: "Please fill all the fields" });
    }
    try {
    const response = await resend.emails.send({
        from: "Portfolio Contact <noreply@yugalkishore.tech>",
        to: "nandakumaryugalkishore@gmail.com",
        replyTo: data.email,
        subject: `Message from ${data.name}`,
        html: `
            <h2>Portfolio Contact Form</h2>

            <p><strong>Name:</strong> ${data.name}</p>

            <p><strong>Email:</strong> ${data.email}</p>

            <p><strong>Message:</strong></p>

            <p>${data.message}</p>
        `
    });

    console.log(response);

    return res.status(200).json({
        msg: "Message sent successfully"
    });

} catch (err) {

    console.error(err);

    return res.status(500).json({
        msg: "Unable to send email"
    });

}
})
module.exports=router
