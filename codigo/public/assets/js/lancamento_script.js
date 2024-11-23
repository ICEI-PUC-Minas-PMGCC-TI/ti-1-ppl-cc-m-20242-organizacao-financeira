window.onload = () => {
    const pageTitle = document.title.toLowerCase();
    const type = pageTitle.includes("receita") ? "receita" : "despesa";
    showData(type);
};

function validateForm() {
    const descricao = document.getElementById("exampleInputDescricao").value;
    const valor = document.getElementById("exampleInputValor").value;
    const categoria = document.getElementById("exampleInputCategoria").value;
    const conta = document.getElementById("exampleInputConta").value;
    const foiRecebidoOuPago = document.getElementById("exampleCheck1").checked;

    if (!descricao || !valor || !categoria || !conta) {
        alert("Todos os campos são obrigatórios!");
        return false;
    }

    return {
        descricao,
        valor: parseFloat(valor),
        categoria,
        conta,
        foiRecebidoOuPago,
        tipo: categoria.includes("receita") ? "receita" : "despesa",
    };
}

function showData(type) {
    const endpoint = `http://localhost:3001/lancamentos?tipo=${type}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(dataList => {
            let html = "";

            dataList.forEach(element => {
                html += "<tr>";
                html += `<td>${element.descricao}</td>`;
                html += `<td>${element.valor}</td>`;
                html += `<td>${element.categoria}</td>`;
                html += `<td>${element.conta}</td>`;
                html += `<td>${element.foiRecebidoOuPago ? "Sim" : "Não"}</td>`;
                html += `<td><button onclick="deleteData(${element.id})" class="btn btn-danger">Deletar</button></td>`;
                html += `<td><button onclick="updateData(${element.id})" class="btn btn-warning">Editar</button></td>`;
                html += "</tr>";
            });

            document.querySelector("#crudTable tbody").innerHTML = html;
        })
        .catch(error => console.error("Erro ao carregar dados:", error));
}

function addData(type) {
    const validatedData = validateForm();

    if (validatedData) {
        const endpoint = "http://localhost:3001/lancamentos";

        fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validatedData),
        })
            .then(() => {
                alert("Registro adicionado com sucesso!");
                showData(type);
                clearForm();
            })
            .catch(error => console.error("Erro:", error));
    }
}

function deleteData(id) {
    const endpoint = `http://localhost:3001/lancamentos/${id}`;

    fetch(endpoint, { method: "DELETE" })
        .then(() => {
            alert("Registro deletado com sucesso!");
            window.location.reload();
        })
        .catch(error => console.error("Erro ao deletar item:", error));
}

function updateData(id) {
    const endpoint = `http://localhost:3001/lancamentos/${id}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            document.getElementById("exampleInputDescricao").value = data.descricao;
            document.getElementById("exampleInputValor").value = data.valor;
            document.getElementById("exampleInputCategoria").value = data.categoria;
            document.getElementById("exampleInputConta").value = data.conta;
            document.getElementById("exampleCheck1").checked = data.foiRecebidoOuPago;

            document.getElementById("Submit").style.display = "none";
            document.getElementById("Update").style.display = "block";

            document.getElementById("Update").onclick = () => {
                const updatedData = validateForm();

                if (updatedData) {
                    fetch(endpoint, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedData),
                    })
                        .then(() => {
                            alert("Registro atualizado com sucesso!");
                            window.location.reload();
                        })
                        .catch(error => console.error("Erro ao atualizar item:", error));
                }
            };
        })
        .catch(error => console.error("Erro ao carregar dados para edição:", error));
}

function clearForm() {
    document.getElementById("exampleInputDescricao").value = "";
    document.getElementById("exampleInputValor").value = "";
    document.getElementById("exampleInputCategoria").value = "";
    document.getElementById("exampleInputConta").value = "";
    document.getElementById("exampleCheck1").checked = false;
    document.getElementById("Submit").style.display = "block";
    document.getElementById("Update").style.display = "none";
}
