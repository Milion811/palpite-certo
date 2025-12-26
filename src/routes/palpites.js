const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const rows = db.getAll();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const row = db.getById(id);
  if (!row) return res.status(404).json({ error: 'Não encontrado' });
  res.json(row);
});

router.post('/', (req, res) => {
  const { usuario, texto, valor } = req.body;
  if (!texto) return res.status(400).json({ error: 'campo texto é obrigatório' });
  const created = db.insert({ usuario: usuario || null, texto, valor: valor || null });
  res.status(201).json(created);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { usuario, texto, valor } = req.body;
  const updated = db.update(id, { usuario, texto, valor });
  if (!updated) return res.status(404).json({ error: 'Não encontrado' });
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const ok = db.remove(id);
  if (!ok) return res.status(404).json({ error: 'Não encontrado' });
  res.status(204).end();
});

module.exports = router;
