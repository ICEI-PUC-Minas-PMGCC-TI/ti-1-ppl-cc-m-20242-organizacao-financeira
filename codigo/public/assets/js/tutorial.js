// Base URL do JSON Server
const baseUrl = "http://localhost:3001/tutoriais"; // Substitua pela URL do seu JSON Server

// Função para validar o formulário
function validateForm() {
    const url = document.getElementById("inputUrl").value;
    const titulo = document.getElementById("inputTitulo").value;
    const descricao = document.getElementById("inputDescricao").value;
    const youtubeId = document.getElementById("inputYoutubeId").value;
    const duracao = document.getElementById("inputDuracao").value;

    if (!url || !titulo || !descricao || !youtubeId || !duracao) {
        alert("Todos os campos são obrigatórios");
        return false;
    }
    return true;
}


// Exibir dados na tabela
function showData() {
    fetch(baseUrl)
        .then((response) => response.json())
        .then((videoList) => {
            let html = "";
            videoList.forEach((element) => {
                html += "<tr>";
                html += `<td>${element.url}</td>`;
                html += `<td>${element.titulo}</td>`;
                html += `<td>${element.descricao}</td>`;
                html += `<td>${element.youtubeId}</td>`;
                html += `<td>${element.duracao}</td>`;
                html += `<td><button onclick="deleteData(${element.id})" class="btn btn-danger">Deletar</button></td>`;
                html += `<td><button onclick="updateData(${element.id})" class="btn btn-warning">Editar</button></td>`;
                html += "</tr>";
            });
            document.querySelector("#crudTable tbody").innerHTML = html;
        })
        .catch((error) => console.error("Erro ao buscar dados:", error));
}


// Adicionar novo vídeo
function addData() {
    if (validateForm()) {
        const url = document.getElementById("inputUrl").value;
        const titulo = document.getElementById("inputTitulo").value;
        const descricao = document.getElementById("inputDescricao").value;
        const youtubeId = document.getElementById("inputYoutubeId").value;
        const duracao = document.getElementById("inputDuracao").value;

        const newVideo = { url, titulo, descricao, youtubeId, duracao };

        fetch(baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newVideo),
        })
            .then(() => {
                showData();
                document.getElementById("inputUrl").value = "";
                document.getElementById("inputTitulo").value = "";
                document.getElementById("inputDescricao").value = "";
                document.getElementById("inputYoutubeId").value = "";
                document.getElementById("inputDuracao").value = "";
            })
            .catch((error) => console.error("Erro ao adicionar dados:", error));
    }
}


// Deletar vídeo
function deleteData(id) {
    fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    })
        .then(() => showData())
        .catch((error) => console.error("Erro ao deletar dados:", error));
}

// Atualizar vídeo
function updateData(id) {
    fetch(`${baseUrl}/${id}`)
        .then((response) => response.json())
        .then((video) => {
            document.getElementById("inputUrl").value = video.url;
            document.getElementById("inputTitulo").value = video.titulo;
            document.getElementById("inputDescricao").value = video.descricao;
            document.getElementById("inputYoutubeId").value = video.youtubeId;
            document.getElementById("inputDuracao").value = video.duracao;

            document.getElementById("Update").onclick = function (event) {
                event.preventDefault();
                if (validateForm()) {
                    const updatedVideo = {
                        url: document.getElementById("inputUrl").value,
                        titulo: document.getElementById("inputTitulo").value,
                        descricao: document.getElementById("inputDescricao").value,
                        youtubeId: document.getElementById("inputYoutubeId").value,
                        duracao: document.getElementById("inputDuracao").value,
                    };

                    fetch(`${baseUrl}/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedVideo),
                    })
                        .then(() => {
                            showData();
                            document.getElementById("inputUrl").value = "";
                            document.getElementById("inputTitulo").value = "";
                            document.getElementById("inputDescricao").value = "";
                            document.getElementById("inputYoutubeId").value = "";
                            document.getElementById("inputDuracao").value = "";
                        })
                        .catch((error) => console.error("Erro ao atualizar dados:", error));
                }
            };
        })
        .catch((error) => console.error("Erro ao carregar vídeo para edição:", error));
}

// Inicializar
window.onload = showData;
