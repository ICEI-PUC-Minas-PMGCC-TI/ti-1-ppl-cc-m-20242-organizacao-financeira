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
app.get("/cadastro/tutoriais", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modules/tutoriais/tutorial.html"));
});

app.get("/tutoriais", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modules/tutoriais/exibicaoTutorial.html"));
});

app.get("/objetivos", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "modules/objetivos/objetivos.html"));
});


// Inicializando o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
