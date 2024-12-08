const express = require("express");
const path = require("path");
const app = express();
const jsonServer = require("json-server");

app.use(express.static(path.join(__dirname, "db")));

const router = jsonServer.router(path.join(__dirname, "db", "db.json"));
const middlewares = jsonServer.defaults();

// Configurações do JSON Server
app.use(middlewares);
app.use("/api", router); // Rotas para a API JSON

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rota para servir a página HTML
app.get("/cadastro/lancamento", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Lançamento/Lancamentos.html"));
});

app.get("/cadastro/despesas", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Lançamento/Despesas.html"));
});

app.get("/cadastro/receitas", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Lançamento/Receitas.html"));
});

app.get("/cadastro/tutoriais", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modulos/tutoriais/tutorial.html"));
});

app.get("/tutoriais", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modulos/tutoriais/exibicaoTutorial.html"));
});

app.get("/carteiras", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modulos/carteiras/apresentacaoCarteira.html"));
});

app.get("/cadastro/carteiras", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modulos/carteiras/cadastroCarteira.html"));
});

app.get("/editar/carteiras", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modulos/carteiras/editarCarteira.html"));
});

app.get("/grafico/carteiras", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modulos/carteiras/graficoCarteira.html"));
});

app.get("/objetivos", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modulos/objetivos/objetivos.html"));
});

app.get("/objetivos/detalhes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modulos/objetivos/detalhesObjetivos.html"));
});

app.get("/calendario", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "calendario/calendario.html"));
});

app.get("/dashbord", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modulos/dashbord/dashbord.html"));
});

// Inicializando o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
