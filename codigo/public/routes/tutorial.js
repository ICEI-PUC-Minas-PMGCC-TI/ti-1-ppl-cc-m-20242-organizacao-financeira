const express = require("express")
const router = express.Router()
const fs = require('fs');

app.get('/../db/db.json', (req, res) => {
    fs.readFile('../db/db.json', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo de tutoriais.');
        }
        res.json(JSON.parse(data));
    });
});

// Adicionar um novo tutorial
app.post('/addVideo', (req, res) => {
    const newVideo = req.body;

    fs.readFile('../db/db.json', (err, data) => {
        let videoData = { tutoriais: [] };
        if (!err) {
            videoData = JSON.parse(data);
        }

        // Definir um novo ID para o tutorial com base no último ID do array
        const newId = videoData.tutoriais.length > 0 
            ? videoData.tutoriais[videoData.tutoriais.length - 1].id + 1 
            : 1;

        // Adicionar o ID ao novo vídeo
        const tutorial = { id: newId, ...newVideo };
        videoData.tutoriais.push(tutorial);

        // Salvar o arquivo JSON com o novo tutorial
        fs.writeFile('../db/db.json', JSON.stringify(videoData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Erro ao salvar o tutorial.');
            }
            res.status(200).send('Tutorial salvo com sucesso.');
        });
    });
});

// Deletar um tutorial
app.delete('/deleteVideo', (req, res) => {
    const index = req.body.index;

    fs.readFile('../db/db.json', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo de tutoriais.');
        }

        let videoData = JSON.parse(data);
        if (index >= 0 && index < videoData.tutoriais.length) {
            videoData.tutoriais.splice(index, 1);
            fs.writeFile('../db/db.json', JSON.stringify(videoData, null, 2), (err) => {
                if (err) {
                    return res.status(500).send('Erro ao deletar o tutorial.');
                }
                res.send('Tutorial deletado com sucesso.');
            });
        } else {
            res.status(400).send('Índice inválido.');
        }
    });
});

// Atualizar um tutorial
app.put('/updateVideo', (req, res) => {
    const { index, video } = req.body;

    fs.readFile('../db/db.json', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo de tutoriais.');
        }

        let videoData = JSON.parse(data);
        if (index >= 0 && index < videoData.tutoriais.length) {
            videoData.tutoriais[index] = { ...videoData.tutoriais[index], ...video };
            fs.writeFile('../db/db.json', JSON.stringify(videoData, null, 2), (err) => {
                if (err) {
                    return res.status(500).send('Erro ao atualizar o tutorial.');
                }
                res.send('Tutorial atualizado com sucesso.');
            });
        } else {
            res.status(400).send('Índice inválido.');
        }
    });
});


module.exports = router