const nodemailer = require("nodemailer");
const path = require('path')
const { MAIL_USER, MAIL_PASSWORD} = process.env

// create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD, 
    },
  });

  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

async function sendNewEntrega(gestor, entrega) {
    let info = await transporter.sendMail({
        from: `"Formacion TECHO" <${MAIL_USER}>`, // sender address
      to: gestor.email, 
      subject: "Formacion TECHO | Nueva entrega", // Subject line
      text: "Formacion TECHO | Nueva entrega", // plain textbody
      attachments: [{
        filename: 'logoCeleste.png',
        path: path.resolve(__dirname, '../../client/src/assets/logoCeleste.png'),
        cid: 'logo'
    }],
      html: `
              <img src="cid:logo" alt='techoLogo' style="width:300px; height:100px;" />
              <h1>${gestor.full_name}, tenes una nueva entrega para revisar</h1>
              <h3>Voluntario:</h3> <p>${entrega.user.full_name}</p>
              <h3>Bloque:</h3> <p>${entrega.bloque.titulo}</p>
              <h3>Pregunta del bloque:</h3> <p>${entrega.bloque.pregunta}</p>
              <h3>Contenido</h3>
              <p>${entrega.contenido}</p>`,
})}

async function sendEntregaCompletada(voluntario, entrega) {
    let info = await transporter.sendMail({
        from: `"Formacion TECHO" <${MAIL_USER}>`, // sender address
      to: voluntario.email, 
      subject: "Formacion TECHO | Entrega completada", // Subject line
      text: "Formacion TECHO | Entrega completada", // plain textbody
      attachments: [{
        filename: 'logoCeleste.png',
        path: path.resolve(__dirname, '../../client/src/assets/logoCeleste.png'),
        cid: 'logo'
    }],
      html: `
              <img src="cid:logo" alt='techoLogo' style="width:300px; height:100px;" />
              <h1>${voluntario.full_name}, ¡tu entrega fue completada!</h1>
              <h3>Bloque:</h3> <p>${entrega.bloque.titulo}</p>
              <h3>Pregunta de bloque:</h3> <p>${entrega.bloque.pregunta}</p>
              <h2>Contenido</h2>
              <p>${entrega.contenido}</p>`,
})}

module.exports = { sendNewEntrega, sendEntregaCompletada }