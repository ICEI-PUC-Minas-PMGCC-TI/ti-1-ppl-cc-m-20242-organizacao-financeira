window.onload = () => {
    const pageTitle = document.title.toLowerCase();
    const type = pageTitle.includes("receita") ? "receita" : "despesa";
    showData(type);
    fetchLancamentos();
};

function validateForm(type = null) {
    const descricao = document.getElementById("exampleInputDescricao").value;
    const valor = document.getElementById("exampleInputValor").value;
    const categoria = document.getElementById("exampleInputCategoria").value;
    const contaId = document.getElementById("exampleInputConta").value; // Pega o ID da conta
    const recorrente = document.getElementById("exampleCheck1").checked;

    if (!descricao || !valor || !categoria || !contaId) {
        alert("Todos os campos são obrigatórios!");
        return false;
    }

    return {
        descricao,
        valor: parseFloat(valor),
        categoria,
        id_carteira: contaId, // Salva o ID da carteira no lugar do nome
        recorrente,
        tipo: type || (categoria.includes("receita") ? "receita" : "despesa"),
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
                html += `<td>${element.recorrente ? "Sim" : "Não"}</td>`;
                html += `<td><button onclick="deleteData(${element.id})" class="btn btn-danger">Deletar</button></td>`;
                html += `<td><button onclick="updateData(${element.id})" class="btn btn-warning">Editar</button></td>`;
                html += "</tr>";
            });

            document.querySelector("#crudTable tbody").innerHTML = html;
        })
        .catch(error => console.error("Erro ao carregar dados:", error));
}

function addData(type) {
    const validatedData = validateForm(type);

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
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao deletar. Status: ${response.status}`);
            }
            alert("Registro deletado com sucesso!");
            window.location.reload();
        })
        .catch(error => {
            console.error("Erro ao deletar item:", error);
            alert("Erro ao deletar. Verifique o console para mais detalhes.");
        });
}

function updateData(id) {
    const endpoint = `http://localhost:3001/lancamentos/${id}`;

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar dados. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Preenche os campos do formulário com os dados recebidos
            document.getElementById("exampleInputDescricao").value = data.descricao;
            document.getElementById("exampleInputValor").value = data.valor;
            document.getElementById("exampleInputCategoria").value = data.categoria;
            document.getElementById("exampleInputConta").value = data.id_carteira;
            document.getElementById("exampleCheck1").checked = data.recorrente;

            // Mostra o botão de atualização e esconde o de criação
            document.getElementById("Submit").style.display = "none";
            document.getElementById("Update").style.display = "block";

            // Define a ação do botão de atualização
            document.getElementById("Update").onclick = () => {
                const updatedData = validateForm(data.tipo); // Valida o formulário e pega os novos dados

                if (updatedData) {
                    fetch(endpoint, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedData),
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Erro ao atualizar. Status: ${response.status}`);
                            }
                            alert("Registro atualizado com sucesso!");
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error("Erro ao atualizar item:", error);
                            alert("Erro ao atualizar. Verifique o console para mais detalhes.");
                        });
                }
            };
        })
        .catch(error => {
            console.error("Erro ao carregar dados para edição:", error);
            alert("Erro ao carregar dados para edição.");
        });
}

function populateContas() {
    const contaSelect = document.getElementById("exampleInputConta");
    fetch("http://localhost:3001/carteiras")
        .then(response => response.json())
        .then(contas => {
            contas.forEach(conta => {
                const option = document.createElement("option");
                option.value = conta.id; // Define o id como valor
                option.textContent = conta.nomeConta; // Mostra o nomeConta no dropdown
                contaSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Erro ao carregar contas:", error));
}

// Chame a função no carregamento da página
window.onload = () => {
    const pageTitle = document.title.toLowerCase();
    const type = pageTitle.includes("receita") ? "receita" : "despesa";
    showData(type);    
    populateContas(); // Adicionando o carregamento das contas
    fetchLancamentos();
};



function fetchLancamentos() {
    const endpoints = [
        "http://localhost:3001/lancamentos?tipo=receita",
        "http://localhost:3001/lancamentos?tipo=despesa"
    ];

    const lancamentosTableBody = document.getElementById("lancamentosTableBody");
    lancamentosTableBody.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

    endpoints.forEach(endpoint => {
        fetch(endpoint)
            .then(response => response.json())
            .then(dataList => {
                dataList.forEach(lancamento => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${lancamento.descricao}</td>
                        <td>${lancamento.valor}</td>
                        <td>${lancamento.categoria}</td>
                        <td>${lancamento.conta}</td>
                        <td>${lancamento.recorrente ? "Sim" : "Não"}</td>
                        <td>${lancamento.tipo}</td>
                    `;
                    lancamentosTableBody.appendChild(row);
                });
            })
            .catch(error => console.error(`Erro ao carregar ${endpoint}:`, error));
    });
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