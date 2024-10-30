window.onload = () => {
    const pageTitle = document.title.toLowerCase();
    const type = pageTitle.includes("receitas") ? "receitas" : "despesas";
    showData(type);
};

function validateForm(type) {
    const descricao = document.getElementById("exampleInputDescricao").value;
    const valor = document.getElementById("exampleInputValor").value;
    const categoria = document.getElementById("exampleInputCategoria").value;
    const conta = document.getElementById("exampleInputConta").value;
    const foiRecebidoOuPago = document.getElementById("exampleCheck1").checked;

    if (descricao === "") {
        alert("Descrição é obrigatória");
        return false;
    }
    if (valor === "") {
        alert("Valor é obrigatório");
        return false;
    }
    if (categoria === "") {
        alert("Categoria é obrigatória");
        return false;
    }
    if (conta === "") {
        alert("Conta é obrigatória");
        return false;
    }

    return { descricao, valor, categoria, conta, foiRecebidoOuPago };
}

function showData(type) {
    const endpoint = type === "receitas" ? "/receitasList.json" : "/despesasList.json";

    fetch(endpoint)
        .then(response => response.json())
        .then(dataList => {
            let html = "";

            dataList.forEach((element, index) => {
                html += "<tr>";
                html += "<td>" + element.descricao + "</td>";
                html += "<td>" + element.valor + "</td>";
                html += "<td>" + element.categoria + "</td>";
                html += "<td>" + element.conta + "</td>";
                html += "<td>" + (element.foiRecebidoOuPago ? "Sim" : "Não") + "</td>";
                html += `<td><button onclick="deleteData(${index}, '${type}')" class="btn btn-danger">Deletar</button></td>`;
                html += `<td><button onclick="updateData(${index}, '${type}')" class="btn btn-warning">Editar</button></td>`;
                html += "</tr>";
            });

            document.querySelector("#crudTable tbody").innerHTML = html;
        })
        .catch(error => console.error("Erro ao carregar dados:", error));
}

function addData(type) {
    const validatedData = validateForm(type);

    if (validatedData) {
        const endpoint = type === "receitas" ? "/addReceita" : "/addDespesa";

        fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validatedData)
        })
            .then(response => response.text())
            .then(data => {
                alert(data);
                showData(type);
                clearForm();
            })
            .catch(error => console.error("Erro:", error));
    }
}

function deleteData(index, type) {
    const endpoint = type === "receitas" ? "/deleteReceita" : "/deleteDespesa";

    fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index })
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            showData(type);
        })
        .catch(error => console.error("Erro ao deletar item:", error));
}

function updateData(index, type) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    const endpoint = type === "receitas" ? "/receitasList.json" : "/despesasList.json";

    fetch(endpoint)
        .then(response => response.json())
        .then(dataList => {
            const data = dataList[index];
            document.getElementById("exampleInputDescricao").value = data.descricao;
            document.getElementById("exampleInputValor").value = data.valor;
            document.getElementById("exampleInputCategoria").value = data.categoria;
            document.getElementById("exampleInputConta").value = data.conta;
            document.getElementById("exampleCheck1").checked = data.foiRecebidoOuPago;

            document.querySelector("#Update").onclick = function () {
                const updatedData = validateForm(type);

                if (updatedData) {
                    const updateEndpoint = type === "receitas" ? "/updateReceita" : "/updateDespesa";

                    fetch(updateEndpoint, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ index, data: updatedData })
                    })
                        .then(response => response.text())
                        .then(data => {
                            alert(data);
                            showData(type);
                            clearForm();
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
