const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Exibe a página HTML para o formulário de tutorial
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../modules/tutoriais/tutorial.html"));
});

// Exibe o conteúdo do JSON com os tutoriais
router.get("/db", (req, res) => {
  fs.readFile(path.join(__dirname, "../../codigo/db/db.json"), (err, data) => {
    if (err) {
      return res.status(500).send("Erro ao ler o arquivo de tutoriais.");
    }
    res.json(JSON.parse(data));
  });
});

// Adicionar um novo tutorial
router.post("/addVideo", (req, res) => {
  const newVideo = req.body;

  fs.readFile(path.join(__dirname, "../../codigo/db/db.json"), (err, data) => {
    let videoData = { tutoriais: [] };
    if (!err) {
      videoData = JSON.parse(data);
    }

    // Gerar um novo ID
    const newId =
      videoData.tutoriais.length > 0
        ? videoData.tutoriais[videoData.tutoriais.length - 1].id + 1
        : 1;

    const tutorial = { id: newId, ...newVideo };
    videoData.tutoriais.push(tutorial);

    // Escreve no arquivo JSON atualizado
    fs.writeFile(
      path.join(__dirname, "../../codigo/db/db.json"),
      JSON.stringify(videoData, null, 2),
      (err) => {
        if (err) {
          return res.status(500).send("Erro ao salvar o tutorial.");
        }
        res.status(200).send("Tutorial salvo com sucesso.");
      }
    );
  });
});

// Deletar um tutorial 
router.delete("/deleteVideo", (req, res) => {
  const index = req.body.index;

  fs.readFile(path.join(__dirname, "../../codigo/db/db.json"), (err, data) => {
    if (err) {
      return res.status(500).send("Erro ao ler o arquivo de tutoriais.");
    }

    let videoData = JSON.parse(data);
    if (index >= 0 && index < videoData.tutoriais.length) {
      videoData.tutoriais.splice(index, 1);
      fs.writeFile(
        path.join(__dirname, "../../codigo/db/db.json"),
        JSON.stringify(videoData, null, 2),
        (err) => {
          if (err) {
            return res.status(500).send("Erro ao deletar o tutorial.");
          }
          res.send("Tutorial deletado com sucesso.");
        }
      );
    } else {
      res.status(400).send("Índice inválido.");
    }
  });
});

// Atualizar um tutorial 
router.put("/updateVideo", (req, res) => {
  const { index, video } = req.body;

  fs.readFile(path.join(__dirname, "../../codigo/db/db.json"), (err, data) => {
    if (err) {
      return res.status(500).send("Erro ao ler o arquivo de tutoriais.");
    }

    let videoData = JSON.parse(data);
    if (index >= 0 && index < videoData.tutoriais.length) {
      videoData.tutoriais[index] = { ...videoData.tutoriais[index], ...video };
      fs.writeFile(
        path.join(__dirname, "../../codigo/db/db.json"),
        JSON.stringify(videoData, null, 2),
        (err) => {
          if (err) {
            return res.status(500).send("Erro ao atualizar o tutorial.");
          }
          res.send("Tutorial atualizado com sucesso.");
        }
      );
    } else {
      res.status(400).send("Índice inválido.");
    }
  });
});

module.exports = router;
