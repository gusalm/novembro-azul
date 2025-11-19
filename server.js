const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '.')));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para sintomas
app.get('/sintomas', (req, res) => {
  res.sendFile(path.join(__dirname, 'sintomas.html'));
});

// Rota para prevenção
app.get('/prevencao', (req, res) => {
  res.sendFile(path.join(__dirname, 'prevencao.html'));
});

// Servir o arquivo de traduções
app.get('/translations.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'translations.json'));
});

app.listen(PORT, () => {
  console.log(`🟦 Novembro Azul rodando em http://localhost:${PORT}`);
});
