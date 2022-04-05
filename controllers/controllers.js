const jwt = require("jsonwebtoken");
const otp = require("otp-generator");
const nodemailer = require("nodemailer");
const login = async (req, res) => {
  const { email } = req.body;

  if (/@student.su.edu.krd\s*$/.test(email)) {
    const user = email.split("@")[0];
    console.log(email, user);
    let rNumber = Math.floor(Math.random() * 99999);
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "jadfonyg6sgmixdk@ethereal.email",
        pass: "K9EDEmXGmex849xra9",
      },
    });
    let info = await transporter.sendMail({
      from: '"mba" <muhammadburhan964@gmail.com>',
      to: `${email}`,
      subject: "Test",
      html: `<h3>Your OTP code is ${rNumber}</h3>`,
    });

    return res.status(200).json({
      msg: `user email ${email} and username is ${user} e send otp to you `,
    });
  }
  return res.status(400).json({ msg: "not authorized" });
};

const verify = async (req, res) => {
  console.log(req.body.otp);
  res.status(200).json({ msg: "verify test" });
};

module.exports = { login, verify };
