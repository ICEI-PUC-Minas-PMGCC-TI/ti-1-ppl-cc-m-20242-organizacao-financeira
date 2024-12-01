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
            // Remove todos os elementos, exceto o card de "Novo Objetivo"
            container.innerHTML = container.innerHTML.split('</div>')[0] + '</div>';

            if (data.length === 0) {
                container.innerHTML += '<p class="text-center text-muted">Nenhum objetivo encontrado.</p>';
                return;
            }

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
                                    <i class="bi bi-pencil-square" style="cursor: pointer;"></i>
                                    <i class="bi bi-trash" style="cursor: pointer; color: red;" onclick="removerObjetivo(${objetivo.id})"></i>
                                    <i class="bi bi-check" style="cursor: pointer; color: green;"></i>
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


// Função para remover objetivo
function removerObjetivo(id) {
    if (confirm('Tem certeza que deseja excluir este objetivo?')) {
        fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('Objetivo excluído com sucesso!');
                    carregarObjetivos();
                } else {
                    alert('Erro ao excluir o objetivo.');
                }
            })
            .catch(error => console.error('Erro ao excluir o objetivo:', error));
    }
}

// Chama a função ao carregar a página
window.onload = carregarObjetivos;
