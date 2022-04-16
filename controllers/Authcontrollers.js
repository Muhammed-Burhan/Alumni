//Packages
const jwt = require("jsonwebtoken");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

//Error Handling
const { BadRequestError, UnauthenticatedError } = require("../errors/index");

//Nodemailer
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",

  auth: {
    user: process.env.GMAIL_ADD,
    pass: process.env.GMAIL_PASS,
  },
});
//handlebars options
const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".handlebars",
};

//Attaching handlebars to nodemailer
transporter.use("compile", hbs(handlebarOptions));

var emailV;

//Controllers for Authentication
const login = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("You must enter email address");
  }
  if (/@student.su.edu.krd\s*$/.test(email)) {
    const user = email.split("@")[0];
    emailV = email;
    ///email sending
    const otpCode = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otpCode);
    //expiration for otp ( 5 min )
    const ttl = 5 * 60 * 1000;
    const expire = Date.now() + ttl;
    const data = `${email}.${otpCode}.${expire}`;
    const hash = crypto
      .createHmac("sha256", process.env.HASH_KY)
      .update(data)
      .digest("hex");
    const fullHash = `${hash}.${expire}`;
    await transporter.sendMail(
      {
        from: `Alumni <${process.env.GMAIL_ADD}>`,
        to: `${email}`,
        subject: "Email Verification",
        template: "email",
        context: {
          email: user,
          otp: otpCode,
        },
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("sucess");
        }
      }
    );
    return res.status(200).json({
      msg: "Enter the otp to verifiy you'r email",
      useHashCode: `${fullHash}`,
    });
  }

  throw new UnauthenticatedError("Not Supported");
};

const verify = async (req, res) => {
  const { code, userHashCode } = req.body;
  const [hashValue, expire] = userHashCode.split(".");
  const newData = `${emailV}.${code}.${expire}`;
  if (!code || !userHashCode) {
    throw new BadRequestError("you must provide credintails code ");
  }
  const calculatedHash = crypto
    .createHmac("sha256", process.env.HASH_KY)
    .update(newData)
    .digest("hex");

  if (Date.now() > parseInt(expire)) {
    throw new BadRequestError("OTP Expired");
  } else {
    if (hashValue === calculatedHash) {
      //we create token for the user
      const token = jwt.sign({ useremail: emailV }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      return res.status(200).json({ msg: "succes", token });
    } else {
      throw new BadRequestError("OTP Invalid");
    }
  }
};

module.exports = { login, verify };
