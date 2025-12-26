const express = require('express');
const cors = require('cors');
require('dotenv').config();
const palpiteRoutes = require('./routes/palpites');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/palpites', palpiteRoutes);

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API Palpite Certo' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
