const router = require("express").Router();
const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/contact", async (req, res) => {
  const data = req.body;

  if (!data.name || !data.email || !data.message) {
    return res.status(400).json({
      msg: "Please fill all the fields",
    });
  }

  try {

    const ownerEmail = await resend.emails.send({
      from: "Portfolio Contact <contact@yugalkishore.tech>",
      to: "nandakumaryugalkishore@gmail.com",
      replyTo: data.email,
      subject: `📩 Message from ${data.name}`,
      html: `
        <h2>Portfolio Contact Form</h2>

        <p><strong>Name:</strong> ${data.name}</p>

        <p><strong>Email:</strong> ${data.email}</p>

        <p><strong>Message:</strong></p>

        <div style="
          background:#f5f5f5;
          padding:15px;
          border-radius:8px;
          white-space:pre-wrap;
        ">
          ${data.message}
        </div>
      `,
    });

    if (ownerEmail.error) {
      throw new Error(ownerEmail.error.message);
    }

    const autoReply = await resend.emails.send({
      from: "Yugal Kishore <noreply@yugalkishore.tech>",
      to: data.email,
      subject: "Thank you for contacting me!",
      html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 650px;
        margin: auto;
        border: 1px solid #e5e5e5;
        border-radius: 10px;
        overflow: hidden;
      ">

        <div style="
          background:#1f1f1f;
          color:white;
          padding:25px;
          text-align:center;
        ">
          <h1 style="margin:0;">Thank You!</h1>
        </div>

        <div style="padding:30px;">

          <h2>Hello ${data.name}, 👋</h2>

          <p>
            Thank you for contacting me through my portfolio website.
          </p>

          <p>
            I have successfully received your message and will review it shortly.
            I usually respond within <strong>24–48 hours</strong>.
          </p>

          <h3>Your Message</h3>

          <div style="
            background:#fafafa;
            border-left:4px solid #ff5823;
            padding:15px;
            border-radius:6px;
            white-space:pre-wrap;
          ">
            ${data.message}
          </div>

          <br>

          <p>
            Meanwhile, feel free to connect with me:
          </p>

          <p>
            🌐 <a href="https://www.yugalkishore.tech">Portfolio</a><br>
            💼 <a href="https://www.linkedin.com/in/nyugalk/">LinkedIn</a><br>
            📧 <a href="mailto:nandakumaryugalkishore@gmail.com" content="Email Address"> Email </a>
          </p>

          <br>

          <p>
            Best Regards,
          </p>

          <strong>
            Yugal Kishore Nandakumar
          </strong><br>
          Software Engineer<br>
          Java • Spring Boot • Microservices • AWS

        </div>

        <div style="
          background:#f5f5f5;
          text-align:center;
          padding:15px;
          color:#666;
          font-size:13px;
        ">
          This is an automated confirmation email.<br>
          Please do not reply to this email.
        </div>

      </div>
      `,
    });

    if (autoReply.error) {
      throw new Error(autoReply.error.message);
    }

    return res.status(200).json({
      msg: "Message sent successfully. Thank you for reaching out!",
    });
  } catch (err) {
    console.error("Resend Error:", err);

    return res.status(500).json({
      msg: "Unable to send email",
    });
  }
});

module.exports = router;