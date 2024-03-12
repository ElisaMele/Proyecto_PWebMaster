var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var contactoModel = require('../models/contactoModel');

router.get('/', function (req, res, next) {
  res.render('about', {
    isAbout: true
  });
});

router.post('/', async (req, res, next) => {

  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var message = req.body.message;

  var obj = {
    to: 'elisamele08@gmail.com',
    subject: 'CONTACTO WEB',
    html: firstname + " " + lastname + " se contacto a través de la web y quiere más información a este correo : " + email +
      ". <br> Además, hizo este comentario: " + message
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);
  var contacto = await contactoModel.insertContacto(req.body);

  res.render('about', {
    message: 'Your message was sent successfully.'
  });
});

module.exports = router;
