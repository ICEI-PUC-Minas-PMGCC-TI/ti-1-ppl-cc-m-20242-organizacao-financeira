const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.listen(PORT, () => {
    console.log('{Servidor rodando na porta ${PORT}');
});