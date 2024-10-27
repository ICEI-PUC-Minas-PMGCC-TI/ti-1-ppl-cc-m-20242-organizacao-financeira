function validateForm() {
    var descricao = document.getElementById("inputDescrição").value;
    var valor = document.getElementById("inputvalor").value;        
    var categoria = document.getElementById("inputcategoria").value;
    var conta = document.getElementById("inputconta").value;

    if (descricao == "") {
        alert("Descrição é obrigatória");
        return false;
    }

    if (valor == "") {
        alert("Valor é obrigatório");
        return false;
    }

    if (categoria == "") {
        alert("Categoria é obrigatório");
        return false;
    }   

    if (conta == "") {
        alert("Conta é obrigatória");
        return false;
    }

    return true;
}

/*function showData() {
    fetch('/lancamentoList.json') // Obter o arquivo JSON do servidor
        .then(response => response.json())
        .then(lancamentoList => {
            var html = "";

            lancamentoList.forEach(function (element, index) {
                html += "<tr>";
                html += '<td><a href="'+ element.url +'" target="_blank" class="link-style"rel="noopener noreferrer"> '+ element.url +'</a></td>';
                html += "<td>" + element.titulo + "</td>";
                html += "<td>" + element.descricao + "</td>";
                html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Deletar</button></td>';
                html += '<td><button onclick="updateData(' + index + ')" class="btn btn-warning">Editar</button></td>';
                html += "</tr>";
            });

            document.querySelector("#crudTable tbody").innerHTML = html;
        })
        .catch(error => console.error('Erro ao carregar dados:', error));
}*/

document.onload = showData();

function addData() {
    if (validateForm() == true) {
        var descricao = document.getElementById("inputDescricao").value;
        var valor = document.getElementById("inputValor").value;
        var categoria = document.getElementById("inputCategoria").value;
        var conta = document.getElementById("inputConta").value;

        var newLancamento = {
            descricao: descricao,
            valor: valor,
            categoria: categoria,
            conta: conta
        };

        fetch('/addLancamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newLancamento)
        })
            .then(response => response.text())
            .then(data => {
                alert(data); // Mensagem de sucesso
                showData(); // Atualizar a tabela
                clearForm(); // Limpar os campos do formulário
            })
            .catch(error => console.error('Erro:', error));
    }
}

function deleteData(index) {
    fetch('/deleteLancamento', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ index: index }) // Enviando o índice do lancamento a ser deletado
    })
        .then(response => response.text())
        .then(data => {
            alert(data); // Mensagem de confirmação
            showData(); // Atualizar a tabela
        })
        .catch(error => console.error('Erro ao deletar Lançamento:', error));
}

function updateData(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    fetch('/lancamentoList.json') // Obter a lista de Lançamento
        .then(response => response.json())
        .then(lancamentoList => {
            document.getElementById("inputDescricao").value = lancamentoList[index].descricao;
            document.getElementById("inputValor").value = lancamentoList[index].valor;
            document.getElementById("inputCategoria").value = lancamentoList[index].categoria; 
            document.getElementById("inputConta").value = lancamentoList[index].conta;

            document.querySelector("#Update").onclick = function () {
                if (validateForm() == true) {
                    const updatedVideo = {
                        descricao: document.getElementById("inputDescricao").value,
                        valor: document.getElementById("inputValor").value,
                        categoria: document.getElementById("inputCategoria").value, 
                        conta: document.getElementById("inputConta").value
                    };

                    fetch('/updateLancamento', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ index: index, lancamento: updatedLancamento })
                    })
                        .then(response => response.text())
                        .then(data => {
                            alert(data); // Mensagem de confirmação
                            showData(); // Atualizar a tabela
                            clearForm(); // Limpar os campos
                        })
                        .catch(error => console.error('Erro ao atualizar lançamento:', error));
                }
            };
        })
        .catch(error => console.error('Erro ao carregar dados para edição:', error));
}

function clearForm() {
    document.getElementById("inputDescricao").value = "";
    document.getElementById("inputValor").value = "";
    document.getElementById("inputCategoria").value = "";  
    document.getElementById("inputConta").value = "";
    document.getElementById("Submit").style.display = "block";
    document.getElementById("Update").style.display = "none";
}
