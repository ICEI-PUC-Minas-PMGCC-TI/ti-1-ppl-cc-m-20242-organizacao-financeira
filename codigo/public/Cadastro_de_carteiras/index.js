const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 8080;
const path = require('path');

// Configurando o caminho para arquivos estáticos (CSS e JS na pasta public)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Carregando o HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Adicionando uma nova conta
app.post('/addContas', (req, res) => {
    const newConta = req.body;

    fs.readFile('contas.json', (err, data) => {
        let contaList = [];
        if (!err && data.length) {
            contaList = JSON.parse(data);
        }

        // Adiciona a nova conta e salva no arquivo JSON
        contaList.push(newConta);
        fs.writeFile('contas.json', JSON.stringify(contaList, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Erro ao salvar os dados.');
            }
            res.status(200).send('Dados salvos com sucesso.');
        });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
