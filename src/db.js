const fs = require('fs');
const path = require('path');

const DB_FILE = process.env.DATABASE_FILE || path.join(__dirname, '..', 'data', 'palpites.json');

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDir(DB_FILE);

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ palpites: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function getAll() {
  const db = readDB();
  return db.palpites.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function getById(id) {
  const db = readDB();
  return db.palpites.find(p => p.id === id) || null;
}

function insert({ usuario = null, texto, valor = null }) {
  const db = readDB();
  const nextId = (db.palpites.reduce((m, p) => Math.max(m, p.id || 0), 0) || 0) + 1;
  const item = { id: nextId, usuario, texto, valor, created_at: new Date().toISOString() };
  db.palpites.push(item);
  writeDB(db);
  return item;
}

function update(id, { usuario, texto, valor }) {
  const db = readDB();
  const idx = db.palpites.findIndex(p => p.id === id);
  if (idx === -1) return null;
  const existing = db.palpites[idx];
  const updated = {
    ...existing,
    usuario: usuario !== undefined ? usuario : existing.usuario,
    texto: texto !== undefined ? texto : existing.texto,
    valor: valor !== undefined ? valor : existing.valor
  };
  db.palpites[idx] = updated;
  writeDB(db);
  return updated;
}

function remove(id) {
  const db = readDB();
  const idx = db.palpites.findIndex(p => p.id === id);
  if (idx === -1) return false;
  db.palpites.splice(idx, 1);
  writeDB(db);
  return true;
}

module.exports = { getAll, getById, insert, update, remove };
