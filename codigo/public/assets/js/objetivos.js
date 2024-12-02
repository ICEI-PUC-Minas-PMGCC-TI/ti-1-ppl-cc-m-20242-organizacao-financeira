const baseUrl = "http://localhost:3001/objetivos";

// Seleciona o botão de salvar
document.querySelector('.btn-save').addEventListener('click', () => {
    // Captura os dados do modal
    const nomeObjetivo = document.querySelector('input[placeholder="Novo objetivo"]')?.value.trim();
    const dataObjetivo = document.querySelector('input[type="date"]')?.value;
    const inputsValor = document.querySelectorAll('input.text-primary');
    const valorObjetivo = inputsValor[0]?.value.trim();
    const valorInicial = inputsValor[1]?.value.trim();
    const descricao = document.querySelector('textarea')?.value.trim();
    const corSelecionada = document.querySelector('.btn-color.active')?.style.backgroundColor || '#000000'; // Cor padrão
    const iconeSelecionado = document.querySelector('.icone-selecionado')?.dataset.icon || 'bi-question-circle'; // Ícone padrão

    // Valida os campos obrigatórios
    if (!nomeObjetivo || !dataObjetivo || !valorObjetivo || isNaN(parseFloat(valorObjetivo))) {
        alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        return;
    }

    // Estrutura JSON para enviar ao servidor
    const novoObjetivo = {
        nome: nomeObjetivo,
        data: dataObjetivo,
        valor: parseFloat(valorObjetivo),
        valorInicial: parseFloat(valorInicial) || 0, // Valor inicial padrão é 0
        descricao: descricao,
        cor: corSelecionada,
        icone: iconeSelecionado
    };

    // Envia os dados ao JSON Server
    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoObjetivo)
    })
    .then(response => {
        if (response.ok) {
            alert('Objetivo salvo com sucesso!');
            // Fecha o modal
            const modal = bootstrap.Modal.getInstance(document.querySelector('#novoObjetivoModal'));
            if (modal) modal.hide();
            // Atualiza a lista de objetivos
            carregarObjetivos();
        } else {
            alert('Erro ao salvar o objetivo.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao salvar o objetivo.');
    });
});

// Função para buscar os dados do JSON Server e renderizar os cartões
function carregarObjetivos() {
    fetch(baseUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do servidor.');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('objetivos-container');
            container.innerHTML = ''; // Limpa o container

            // Adiciona o card de "Novo Objetivo"
            const novoObjetivoCard = `
                <div class="col-md-4">
                    <div class="card custom-card text-center p-3" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#novoObjetivoModal">
                        <div>
                            <i class="bi bi-plus fs-1"></i>
                            <p class="mt-2">Novo objetivo</p>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += novoObjetivoCard;

            // Verifica se há objetivos no servidor
            if (data.length === 0) {
                container.innerHTML += '<p class="text-center text-muted">Nenhum objetivo encontrado.</p>';
                return;
            }

            // Renderiza os objetivos existentes
            data.forEach(objetivo => {
                const valor = parseFloat(objetivo.valor) || 0;
                const valorInicial = parseFloat(objetivo.valorInicial) || 0;
                const progresso = valor > 0 ? ((valorInicial / valor) * 100).toFixed(2) : 0;

                const card = `
                    <div class="col-md-4">
                        <div class="card p-3">
                            <div class="card-body">
                                <div class="d-flex align-items-center">
                                    <div class="rounded-circle" style="width: 40px; height: 40px; background-color: ${objetivo.cor}; display: flex; align-items: center; justify-content: center;">
                                        <i class="${objetivo.icone}" style="color: #fff; font-size: 20px;"></i>
                                    </div>
                                    <h5 class="card-title ms-3">${objetivo.nome}</h5>
                                </div>
                                <p class="card-text mt-3">
                                    <strong>Data final do objetivo</strong><br>
                                    ${new Date(objetivo.data).toLocaleDateString('pt-BR')}<br>
                                    <span class="fw-bold">${progresso}%</span>
                                </p>
                                <div class="progress" style="height: 10px; border-radius: 5px;">
                                    <div class="progress-bar" role="progressbar" style="width: ${progresso}%; background-color: ${objetivo.cor};" aria-valuenow="${progresso}" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <p class="mt-2 text-muted">R$ ${valorInicial.toFixed(2)} / R$ ${valor.toFixed(2)}</p>
                                <div class="d-flex justify-content-between mt-3">
                                    <i class="bi bi-pencil-square" style="cursor: pointer;" onclick="editarObjetivo(${objetivo.id})"></i>
                                    <i class="bi bi-trash" style="cursor: pointer; color: red;" onclick="removerObjetivo(${objetivo.id})"></i>
                                    <i class="bi bi-check" style="cursor: pointer; color: green;" onclick="removerObjetivo(${objetivo.id})"></i>
                                    <i class="bi bi-graph-up-arrow" style="cursor: pointer;" onclick="detalharObjetivo(${objetivo.id})"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.innerHTML += card;
            });
        })
        .catch(error => console.error('Erro ao carregar os objetivos:', error));
}

function detalharObjetivo(id) {
    // Redireciona para a página de detalhes com o ID do objetivo como parâmetro na URL
    window.location.href = `http://localhost:3000/objetivos/detalhes?id=${id}`;
}

// Função para remover objetivo
function removerObjetivo(id) {
    if (confirm('Tem certeza que deseja excluir este objetivo?')) {
        fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    carregarObjetivos();
                } else {
                    alert('Erro ao excluir o objetivo.');
                }
            })
            .catch(error => console.error('Erro ao excluir o objetivo:', error));
    }
}

function editarObjetivo(id) {
    // Faz uma requisição GET para obter os dados do objetivo selecionado
    fetch(`${baseUrl}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do objetivo.');
            }
            return response.json();
        })
        .then(objetivo => {
            // Preenche os campos do modal com os dados do objetivo
            document.querySelector('input[placeholder="Novo objetivo"]').value = objetivo.nome;
            document.querySelector('input[type="date"]').value = objetivo.data;
            document.querySelectorAll('input.text-primary')[0].value = objetivo.valor;
            document.querySelectorAll('input.text-primary')[1].value = objetivo.valorInicial;
            document.querySelector('textarea').value = objetivo.descricao;

            // Atualiza a cor ativa
            document.querySelectorAll('.btn-color').forEach(btn => {
                btn.classList.remove('active');
                if (btn.style.backgroundColor === objetivo.cor) {
                    btn.classList.add('active');
                }
            });

            // Abre o modal para edição
            const modal = new bootstrap.Modal(document.querySelector('#novoObjetivoModal'));
            modal.show();

            // Atualiza o botão de salvar para executar a edição
            const btnSalvar = document.querySelector('.btn-save');
            btnSalvar.textContent = 'Salvar Alterações'; // Muda o texto do botão
            btnSalvar.onclick = () => salvarEdicao(id);
        })
        .catch(error => console.error('Erro ao carregar os dados para edição:', error));
}

function salvarEdicao(id) {
    // Captura os dados atualizados do modal
    const nomeObjetivo = document.querySelector('input[placeholder="Novo objetivo"]').value;
    const dataObjetivo = document.querySelector('input[type="date"]').value;
    const valorObjetivo = document.querySelectorAll('input.formcontrol')[0].value;
    const valorInicial = document.querySelectorAll('input.formcontrol')[1].value;
    const descricao = document.querySelector('textarea').value;
    const corSelecionada = document.querySelector('.btn-color.active')?.style.backgroundColor || 'default';

    // Estrutura JSON para enviar ao servidor
    const objetivoAtualizado = {
        nome: nomeObjetivo,
        data: dataObjetivo,
        valor: valorObjetivo,
        valorInicial: valorInicial,
        descricao: descricao,
        cor: corSelecionada
    };

    // Faz uma requisição PUT para atualizar o objetivo
    fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetivoAtualizado)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar as alterações.');
            }
            return response.json();
        })
        .then(() => {
            alert('Objetivo atualizado com sucesso!');
            
            // Fecha o modal
            const modal = bootstrap.Modal.getInstance(document.querySelector('#novoObjetivoModal'));
            modal.hide();

            // Restaura o botão de salvar ao estado original
            const btnSalvar = document.querySelector('.btn-save');
            btnSalvar.textContent = 'Salvar';
            btnSalvar.onclick = () => salvarNovoObjetivo();

            // Atualiza os cartões na interface
            carregarObjetivos();
        })
        .catch(error => {
            console.error('Erro ao salvar as alterações:', error);
            alert('Erro ao salvar as alterações.');
        });
}


// Chama a função ao carregar a página
window.onload = carregarObjetivos;
