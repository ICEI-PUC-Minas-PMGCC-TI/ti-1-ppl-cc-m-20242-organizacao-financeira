const baseUrl = "http://localhost:3001/objetivos";

let currentAction = null; // Variável para armazenar a ação atual
let currentId = null; // ID do objetivo associado à ação

// Exibe o modal de confirmação
function showConfirmationModal(action, id) {
    currentAction = action;
    currentId = id;

    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (action === 'delete') {
        confirmationMessage.textContent = 'Você realmente deseja deletar esse objetivo?';
        document.getElementById('confirmationModalLabel').textContent = 'Deletar objetivo';
    } else if (action === 'complete') {
        confirmationMessage.textContent = 'Você realmente deseja concluir esse objetivo?';
        document.getElementById('confirmationModalLabel').textContent = 'Concluir objetivo';
    }

    confirmationModal.show();
}

document.getElementById('confirmActionBtn').addEventListener('click', () => {
    const confirmationModal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));

    if (currentAction === 'delete') {
        removerObjetivo(currentId);
    } else if (currentAction === 'complete') {
        concluirObjetivo(currentId);
    }

    confirmationModal.hide(); // Fecha o modal após a ação
});

// Função para exibir notificações
function showNotification(type, message) {
    const notification = document.getElementById('notification');
    const icon = notification.querySelector('i');
    const messageSpan = notification.querySelector('.message');

    // Configura o tipo de mensagem
    notification.className = `notification ${type} visible`;
    messageSpan.textContent = message;

    // Define o ícone com base no tipo
    switch (type) {
        case 'success':
            icon.className = 'bi bi-check-circle';
            break;
        case 'success-delete':
            icon.className = 'bi bi-check-circle';
            break;
        case 'error':
            icon.className = 'bi bi-exclamation-circle';
            break;
        case 'info':
            icon.className = 'bi bi-info-circle';
            break;
        default:
            icon.className = '';
    }

    // Remove a notificação após 3 segundos
    setTimeout(() => {
        notification.className = `notification ${type} hidden`;
    }, 3000);
}

// Seleciona o botão de salvar e define o comportamento com base no modo (add/edit)
document.querySelector('.btn-save').addEventListener('click', () => {
    const btnSalvar = document.querySelector('.btn-save');
    const mode = btnSalvar.getAttribute('data-mode');
    const id = btnSalvar.getAttribute('data-id');

    if (mode === 'edit' && id) {
        salvarEdicao(id);
    } else {
        salvarNovoObjetivo();
    }
});

// Função para salvar um novo objetivo
function salvarNovoObjetivo() {
    const nomeObjetivo = document.querySelector('input[placeholder="Novo objetivo"]').value.trim();
    const dataObjetivo = document.querySelector('input[type="date"]').value;
    const inputsValor = document.querySelectorAll('input.text-primary');
    const valorObjetivo = parseFloat(inputsValor[0]?.value.trim());
    const valorInicial = parseFloat(inputsValor[1]?.value.trim());
    const descricao = document.querySelector('textarea')?.value.trim();
    const corSelecionada = document.querySelector('.btn-color.active')?.style.backgroundColor || '#4caf50';
    const iconeSelecionado = document.querySelector('.icone-selecionado')?.dataset.icon || 'fas fa-question-circle';

    if (!nomeObjetivo || !dataObjetivo || isNaN(valorObjetivo)) {
        showNotification('error', 'Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Novo objetivo com a estrutura completa
    const novoObjetivo = {
        nome: nomeObjetivo,
        valor: valorObjetivo,
        valorInicial: valorInicial || 0,
        data: dataObjetivo,
        cor: corSelecionada,
        descricao: descricao,
        icone: iconeSelecionado,
        depositos: [] // Inicia com um array vazio de depósitos
    };

    fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoObjetivo),
    })
        .then(response => {
            if (response.ok) {
                showNotification('success', 'Objetivo salvo com sucesso!');
                carregarObjetivos();
                fecharModal();
            } else {
                showNotification('error', 'Erro ao salvar o objetivo.');
            }
        })
        .catch(error => console.error('Erro:', error));
}

// Função para salvar as alterações de um objetivo existente
// Função para salvar as alterações de um objetivo existente
function salvarEdicao(id) {
    const nomeObjetivo = document.querySelector('input[placeholder="Novo objetivo"]').value.trim();
    const dataObjetivo = document.querySelector('input[type="date"]').value;
    const inputsValor = document.querySelectorAll('input.text-primary');
    const valorObjetivo = parseFloat(inputsValor[0]?.value.trim());
    const valorInicial = parseFloat(inputsValor[1]?.value.trim());
    const descricao = document.querySelector('textarea')?.value.trim();
    const corSelecionada = document.querySelector('.btn-color.active')?.style.backgroundColor || '#4caf50';
    const iconeSelecionado = document.querySelector('.icone-selecionado')?.dataset.icon || 'fas fa-question-circle';

    if (!nomeObjetivo || !dataObjetivo || isNaN(valorObjetivo)) {
        showNotification('error', 'Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Primeiro, obtenha o objetivo existente para preservar o array `depositos`
    fetch(`${baseUrl}/${id}`)
        .then(response => response.json())
        .then(objetivoExistente => {
            // Construir o objetivo atualizado, incluindo `descricao` e preservando `depositos`
            const objetivoAtualizado = {
                nome: nomeObjetivo,
                valor: valorObjetivo,
                valorInicial: valorInicial || 0,
                data: dataObjetivo,
                cor: corSelecionada,
                descricao: descricao || objetivoExistente.descricao, // Preserva a descrição existente, se não fornecida
                icone: iconeSelecionado,
                depositos: objetivoExistente.depositos || [] // Preserva o array de depósitos
            };

            // Fazer a requisição para atualizar o objetivo
            return fetch(`${baseUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objetivoAtualizado),
            });
        })
        .then(response => {
            if (response.ok) {
                showNotification('success', 'Objetivo atualizado com sucesso!');
                carregarObjetivos();
                fecharModal();
            } else {
                showNotification('error', 'Erro ao atualizar o objetivo.');
            }
        })
        .catch(error => console.error('Erro ao salvar as alterações:', error));
}


// Função para carregar os objetivos e renderizar os cartões
function carregarObjetivos() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('objetivos-container');
            container.innerHTML = ''; // Limpa o container

            // Adiciona o card para criar um novo objetivo
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

            // Filtra objetivos que não estão concluídos
            const objetivosNaoConcluidos = data.filter(objetivo => !objetivo.concluido);

            if (objetivosNaoConcluidos.length === 0) {
                container.innerHTML += '<p class="text-center text-muted">Nenhum objetivo encontrado.</p>';
                return;
            }

            // Renderiza os objetivos não concluídos
            objetivosNaoConcluidos.forEach(objetivo => {
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
                                    <i class="bi bi-check" style="cursor: pointer; color: green;" onclick="showConfirmationModal('complete', ${objetivo.id})"></i>
                                    <i class="bi bi-trash" style="cursor: pointer; color: red;" onclick="showConfirmationModal('delete', ${objetivo.id})"></i>
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


// Função para detalhar um objetivo
function detalharObjetivo(id) {
    window.location.href = `http://localhost:3001/objetivos/detalhes?id=${id}`;
}

// Função para remover um objetivo
function removerObjetivo(id) {
    fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                showNotification('success-delete', 'Objetivo excluído!');
                carregarObjetivos();
            } else {
                showNotification('error', 'Erro ao excluir o objetivo.');
            }
        })
        .catch(error => console.error('Erro ao excluir o objetivo:', error));
}


// Função para editar um objetivo
function editarObjetivo(id) {
    fetch(`${baseUrl}/${id}`)
        .then(response => response.json())
        .then(objetivo => {
            document.querySelector('input[placeholder="Novo objetivo"]').value = objetivo.nome;
            document.querySelector('input[type="date"]').value = objetivo.data;
            document.querySelectorAll('input.text-primary')[0].value = objetivo.valor;
            document.querySelectorAll('input.text-primary')[1].value = objetivo.valorInicial;
            document.querySelector('textarea').value = objetivo.descricao;

            document.querySelectorAll('.btn-color').forEach(btn => btn.classList.remove('active'));
            const corAtiva = document.querySelector(`.btn-color[style*="${objetivo.cor}"]`);
            if (corAtiva) corAtiva.classList.add('active');

            const btnSalvar = document.querySelector('.btn-save');
            btnSalvar.setAttribute('data-mode', 'edit');
            btnSalvar.setAttribute('data-id', id);
            btnSalvar.textContent = 'Salvar Alterações';

            const modal = new bootstrap.Modal(document.querySelector('#novoObjetivoModal'));
            modal.show();
        })
        .catch(error => console.error('Erro ao carregar dados para edição:', error));
}

function concluirObjetivo(id) {
    // Atualize o objetivo no backend, se necessário
    fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concluido: true }),
    })
        .then(response => {
            if (response.ok) {
                showNotification('success', 'Objetivo concluído!');
                carregarObjetivos();
            } else {
                showNotification('error', 'Erro ao concluir o objetivo.');
            }
        })
        .catch(error => console.error('Erro ao concluir o objetivo:', error));
}

// Função para fechar o modal e resetar o botão de salvar
function fecharModal() {
    const modal = bootstrap.Modal.getInstance(document.querySelector('#novoObjetivoModal'));
    modal.hide();

    const btnSalvar = document.querySelector('.btn-save');
    btnSalvar.setAttribute('data-mode', 'add');
    btnSalvar.setAttribute('data-id', '');
    btnSalvar.textContent = 'Salvar';
}


// Chama a função ao carregar a página
carregarObjetivos();
