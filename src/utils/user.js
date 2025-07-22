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
  form.append('html', '<h1>Welcome!</h1><p>Thank you for signing up! We are excited to have you on board.</p>');

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