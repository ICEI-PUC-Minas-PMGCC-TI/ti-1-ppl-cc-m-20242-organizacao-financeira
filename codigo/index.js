const express = require("express");
const path = require("path");
const app = express();
const jsonServer = require("json-server");

app.use(express.static(path.join(__dirname, "db")));

const router = jsonServer.router(path.join(__dirname, "db", "db.json"));
const middlewares = jsonServer.defaults();

// Configurações do JSON Server
app.use(middlewares);
app.use(router); // Rotas para a API JSON

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rota para servir a página HTML
app.get("/cadastro/lancamento", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "lancamento/Lancamentos.html"));
});

app.get("/cadastro/despesas", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "lancamento/Despesas.html"));
});

app.get("/cadastro/receitas", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "lancamento/Receitas.html"));
});

// Inicializando o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});