// Trabalho Interdisciplinar 1 - Aplicações Web
//
// Esse módulo implementa uma API RESTful baseada no JSONServer
// O servidor JSONServer fica hospedado na seguinte URL
// https://jsonserver.rommelpuc.repl.co/contatos
//
// Para montar um servidor para o seu projeto, acesse o projeto 
// do JSONServer no Replit, faça o FORK do projeto e altere o 
// arquivo db.json para incluir os dados do seu projeto.
//
// URL Projeto JSONServer: https://replit.com/@rommelpuc/JSONServer
//
// Autor: Rommel Vieira Carneiro
// Data: 03/10/2023

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('codigo/db/db.json')

const path = require("path")

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
const tutorial = require("/Users/loona/Documents/TI/organizacaoFinanceira/codigo/public/routes/tutorialRoute")

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
  
// Para permitir que os dados sejam alterados, altere a linha abaixo
// colocando o atributo readOnly como false.
const middlewares = jsonServer.defaults({ noCors: true, readOnly: false })
server.use(middlewares)
server.use(router)

//Rotas
app.use('/tutorial', tutorial)


app.listen(PORT, () => {
  console.log(`JSON Server is running em http://localhost:3000`)
})