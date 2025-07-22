const bycript = require('bcryptjs');

const api_url = 'https://smtp.maileroo.com/send';
const api_key = process.env.MAILER_API_KEY;

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bycript.genSalt(10, (errSalt, salt) => {
      if (errSalt) {
        reject(errSalt);
      } else {
        bycript.hash(password, salt, (errHash, hash) => {
          errHash ? reject(errHash) : resolve(hash);
        })
      }
    });
  });
}

async function sendWelcomeEmail(email){
  const form = new FormData();

  form.append('from', 'Inventory App <inventoryappmx@5e0f9e1ed8ce0c89.maileroo.org>');
  form.append('to', `To Name <${email}>`);
  form.append('subject', 'Bienvenid@ a Inventory App');
  form.append('html', `
  <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 40px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h1 style="color: #2c3e50; text-align: center;">¡Bienvenid@ a Inventory App!</h1>
      <p style="font-size: 16px; color: #34495e;">Hola 👋,</p>
      <p style="font-size: 16px; color: #34495e;">
        Gracias por registrarte en <strong>Inventory App</strong>. Estamos emocionados de tenerte con nosotros.
      </p>
      <p style="font-size: 16px; color: #34495e;">
        Desde ahora podrás gestionar tu inventario de manera sencilla, rápida y eficiente.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://inventory-dashboard-rho.vercel.app/" style="background-color: #27ae60; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">Comenzar ahora</a>
      </div>
      <p style="font-size: 14px; color: #7f8c8d;">
        Si tienes alguna duda, no dudes en responder a este correo.
      </p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ecf0f1;" />
      <p style="font-size: 12px; color: #bdc3c7; text-align: center;">
        &copy; ${new Date().getFullYear()} Inventory App. Todos los derechos reservados.
      </p>
    </div>
  </div>
`);


  const response = await fetch(api_url, {
    method: 'POST',
    headers: {'X-API-Key': api_key},
    body: form,
  });

  const result = await response.json();
  console.log('Email sent:', result);
}


module.exports = {
  hashPassword,
  sendWelcomeEmail,
}