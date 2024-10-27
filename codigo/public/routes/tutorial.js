const express = require("express")
const router = express.Router()
const fs = require('fs');

router.get('/videoList.json', (req, res) => {
    fs.readFile('../db/db.json', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo de vídeo.');
        }
        res.json(JSON.parse(data));
    });
});

// Adicionar um novo vídeo
router.post('/addVideo', (req, res) => {
    const newVideo = req.body;

    fs.readFile('../db/db.json', (err, data) => {
        let videoList = [];
        if (!err) {
            videoList = JSON.parse(data);
        }

        videoList.push(newVideo);
        fs.writeFile('../db/db.json', JSON.stringify(videoList, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Erro ao salvar os dados.');
            }
            res.status(200).send('Dados salvos com sucesso.');
        });
    });
});

// Deletar um vídeo
app.delete('/deleteVideo', (req, res) => {
    const index = req.body.index;

    fs.readFile('../db/db.json', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo de vídeo.');
        }

        let videoList = JSON.parse(data);
        if (index >= 0 && index < videoList.length) {
            videoList.splice(index, 1);
            fs.writeFile('../db/db.json', JSON.stringify(videoList, null, 2), (err) => {
                if (err) {
                    return res.status(500).send('Erro ao deletar o vídeo.');
                }
                res.send('Vídeo deletado com sucesso.');
            });
        } else {
            res.status(400).send('Índice inválido.');
        }
    });
});

// Atualizar um vídeo
router.put('/updateVideo', (req, res) => {
    const { index, video } = req.body;

    fs.readFile('../db/db.json', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo de vídeo.');
        }

        let videoList = JSON.parse(data);
        if (index >= 0 && index < videoList.length) {
            videoList[index] = video;
            fs.writeFile('../db/db.json', JSON.stringify(videoList, null, 2), (err) => {
                if (err) {
                    return res.status(500).send('Erro ao atualizar o vídeo.');
                }
                res.send('Vídeo atualizado com sucesso.');
            });
        } else {
            res.status(400).send('Índice inválido.');
        }
    });
});

module.exports = router