const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: 'santikundera',
        pass: 'juanroman378', 
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
        from: '"Formacion TECHO" <santikundera@gmail.com>', // sender address
      to: gestor.email, 
      subject: "Formacion TECHO | Nueva entrega", // Subject line
      text: "Formacion TECHO | Nueva entrega", // plain textbody
      html: `<div className='checkoutDiv'>
              <h1>${gestor.full_name}, tenes una nueva entrega para revisar</h1>
              <h2>Voluntario: ${entrega.user.full_name}</h2>
              <h2>Bloque: ${entrega.bloque.titulo}</h2>
              <h2>Pregunta del bloque: ${entrega.bloque.pregunta}
              <h2>Contenido</h2>
              <p>${entrega.contenido}
              
          </div>`,
})}

async function sendEntregaCompletada(voluntario, entrega) {
    let info = await transporter.sendMail({
        from: '"Formacion TECHO" <santikundera@gmail.com>', // sender address
      to: voluntario.email, 
      subject: "Formacion TECHO | Entrega completada", // Subject line
      text: "Formacion TECHO | Entrega completada", // plain textbody
      html: `<div className='checkoutDiv'>
              <h1>${voluntario.full_name}, ¡tu entrega fue completada!</h1>
              <h2>Bloque: ${entrega.bloque.titulo}</h2>
              <h2>Pregunta de bloque: ${entrega.bloque.pregunta}
              <h2>Contenido</h2>
              <p>${entrega.contenido}
          </div>`,
})}

module.exports = { sendNewEntrega, sendEntregaCompletada }