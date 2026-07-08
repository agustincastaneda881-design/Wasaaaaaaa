const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode');
const express = require('express');

const app = express();
let ultimoQR = null;
let estado = 'Esperando QR...';

app.get('/', async (req, res) => {
  if (estado === 'Conectado!') {
    return res.send('<h1>✅ Bot conectado a WhatsApp</h1>');
  }
  if (!ultimoQR) {
    return res.send('<h1>Generando QR, esperá unos segundos y refrescá...</h1>');
  }
  const qrImagen = await qrcode.toDataURL(ultimoQR);
  res.send(`
    <h1>Escaneá este QR con WhatsApp</h1>
    <img src="${qrImagen}" />
    <p>Dispositivos vinculados → Vincular un dispositivo</p>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor web arriba en puerto ' + PORT));

async function iniciarBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');
  const sock = makeWASocket({ auth: state });

  sock.ev.on('connection.update', (update) => {
    const { qr, connection } = update;
    if (qr) ultimoQR = qr;
    if (connection === 'open') {
      estado = 'Conectado!';
      console.log('Conectado!');
    }
  });

  sock.ev.on('creds.update', saveCreds);

  return sock;
}

iniciarBot();
