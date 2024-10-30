const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Função para garantir que os arquivos JSON existem e, se não, criá-los
function ensureFileExists(filePath) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]'); // Cria o arquivo com um array vazio
    }
}

// Caminhos dos arquivos JSON
const receitasFilePath = path.join(__dirname, 'public', 'receitasList.json');
const despesasFilePath = path.join(__dirname, 'public', 'despesasList.json');

// Garante que os arquivos existam ao iniciar o servidor
ensureFileExists(receitasFilePath);
ensureFileExists(despesasFilePath);

// Rotas para servir os arquivos HTML
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'Lancamentos.html')));
app.get('/receitas', (req, res) => res.sendFile(path.join(__dirname, 'public', 'Receitas.html')));
app.get('/despesas', (req, res) => res.sendFile(path.join(__dirname, 'public', 'Despesas.html')));

// Rota para obter lista de receitas
app.get('/receitasList.json', (req, res) => {
    fs.readFile(receitasFilePath, (err, data) => {
        if (err) return res.status(500).send('Erro ao ler o arquivo de receitas.');
        res.json(JSON.parse(data));
    });
});

// Rota para obter lista de despesas
app.get('/despesasList.json', (req, res) => {
    fs.readFile(despesasFilePath, (err, data) => {
        if (err) return res.status(500).send('Erro ao ler o arquivo de despesas.');
        res.json(JSON.parse(data));
    });
});

// Adicionar uma nova receita
app.post('/addReceita', (req, res) => {
    const newReceita = req.body;
    fs.readFile(receitasFilePath, (err, data) => {
        let receitasList = [];
        if (!err) {
            receitasList = JSON.parse(data);
        }
        receitasList.push(newReceita);
        fs.writeFile(receitasFilePath, JSON.stringify(receitasList, null, 2), err => {
            if (err) {
                console.error('Erro ao salvar a receita:', err);
                return res.status(500).send('Erro ao salvar a receita.');
            }
            res.status(200).send('Receita salva com sucesso.');
        });
    });
});

// Adicionar uma nova despesa
app.post('/addDespesa', (req, res) => {
    const newDespesa = req.body;
    fs.readFile(despesasFilePath, (err, data) => {
        let despesasList = [];
        if (!err) {
            despesasList = JSON.parse(data);
        }
        despesasList.push(newDespesa);
        fs.writeFile(despesasFilePath, JSON.stringify(despesasList, null, 2), err => {
            if (err) {
                console.error('Erro ao salvar a despesa:', err);
                return res.status(500).send('Erro ao salvar a despesa.');
            }
            res.status(200).send('Despesa salva com sucesso.');
        });
    });
});

// Deletar uma receita
app.delete('/deleteReceita', (req, res) => {
    const index = req.body.index;
    fs.readFile(receitasFilePath, (err, data) => {
        if (err) return res.status(500).send('Erro ao ler o arquivo de receitas.');
        let receitasList = JSON.parse(data);
        if (index >= 0 && index < receitasList.length) {
            receitasList.splice(index, 1);
            fs.writeFile(receitasFilePath, JSON.stringify(receitasList, null, 2), err => {
                if (err) return res.status(500).send('Erro ao deletar a receita.');
                res.send('Receita deletada com sucesso.');
            });
        } else {
            res.status(400).send('Índice inválido.');
        }
    });
});

// Deletar uma despesa
app.delete('/deleteDespesa', (req, res) => {
    const index = req.body.index;
    fs.readFile(despesasFilePath, (err, data) => {
        if (err) return res.status(500).send('Erro ao ler o arquivo de despesas.');
        let despesasList = JSON.parse(data);
        if (index >= 0 && index < despesasList.length) {
            despesasList.splice(index, 1);
            fs.writeFile(despesasFilePath, JSON.stringify(despesasList, null, 2), err => {
                if (err) return res.status(500).send('Erro ao deletar a despesa.');
                res.send('Despesa deletada com sucesso.');
            });
        } else {
            res.status(400).send('Índice inválido.');
        }
    });
});

// Atualizar uma receita
app.put('/updateReceita', (req, res) => {
    const { index, data: updatedData } = req.body;
    fs.readFile(receitasFilePath, (err, data) => {
        if (err) return res.status(500).send('Erro ao ler o arquivo de receitas.');
        let receitasList = JSON.parse(data);
        if (index >= 0 && index < receitasList.length) {
            receitasList[index] = updatedData;
            fs.writeFile(receitasFilePath, JSON.stringify(receitasList, null, 2), err => {
                if (err) return res.status(500).send('Erro ao atualizar a receita.');
                res.send('Receita atualizada com sucesso.');
            });
        } else {
            res.status(400).send('Índice inválido.');
        }
    });
});

// Atualizar uma despesa
app.put('/updateDespesa', (req, res) => {
    const { index, data: updatedData } = req.body;
    fs.readFile(despesasFilePath, (err, data) => {
        if (err) return res.status(500).send('Erro ao ler o arquivo de despesas.');
        let despesasList = JSON.parse(data);
        if (index >= 0 && index < despesasList.length) {
            despesasList[index] = updatedData;
            fs.writeFile(despesasFilePath, JSON.stringify(despesasList, null, 2), err => {
                if (err) return res.status(500).send('Erro ao atualizar a despesa.');
                res.send('Despesa atualizada com sucesso.');
            });
        } else {
            res.status(400).send('Índice inválido.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
