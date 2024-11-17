const apiUrl = 'http://localhost:3000/contas';

let selectedAccountId = null;

async function loadCarteiras() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Erro ao carregar as carteiras.');

        const contas = await response.json();

    
        const valorTotal = contas.reduce((total, conta) => total + (conta.saldo || 0), 0);
        document.getElementById('total-valor').textContent = `R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    
        const carteirasContainer = document.getElementById('carteiras-container');
        carteirasContainer.innerHTML = '';

        contas.forEach(conta => {
            const itemCarteira = document.createElement('div');
            itemCarteira.className = 'carteira-item';
            itemCarteira.setAttribute('data-id', conta.id);

            itemCarteira.style.backgroundColor = conta.id_cor;

            itemCarteira.innerHTML = `
                <h3>${conta.nomeConta}</h3>
                <p>R$ ${conta.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <div class="carteira-icone" style="background-color: ${conta.id_cor}">
                    ${conta.id_icone} <!-- Insira o ícone diretamente ou use <img src="..."> se necessário -->
                </div>
                <p class="meta">Meta: R$ ${conta.meta.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || 'Não definida'}</p>
                <p class="tipo">Tipo: ${conta.tipo || 'Não definido'}</p>
                <p class="descricao">Descrição: ${conta.descricaoConta || 'Não disponível'}</p>
            `;

        
            itemCarteira.addEventListener('click', () => selectAccount(conta.id));

            carteirasContainer.appendChild(itemCarteira);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

function selectAccount(accountId) {
    selectedAccountId = accountId;

    const allItems = document.querySelectorAll('.carteira-item');
    allItems.forEach(item => {
        item.classList.remove('selected');
    });

    const selectedItem = document.querySelector(`.carteira-item[data-id="${accountId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
    }
}

async function deleteSelectedAccount() {
    if (selectedAccountId === null) {
        alert('Selecione uma conta para deletar.');
        return;
    }

    const confirmation = confirm('Tem certeza de que deseja deletar esta conta?');
    if (!confirmation) return;

    try {
        const response = await fetch(`${apiUrl}/${selectedAccountId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro ao deletar a conta.');

        alert('Conta deletada com sucesso!');
    
        const selectedItem = document.querySelector(`.carteira-item[data-id="${selectedAccountId}"]`);
        if (selectedItem) selectedItem.remove();

    
        selectedAccountId = null;

    
        loadCarteiras();
    } catch (error) {
        console.error('Erro ao deletar a conta:', error);
    }
}

async function loadData(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar os dados da conta.');

        const conta = await response.json();
    
        document.getElementById('nomeConta').value = conta.nomeConta;
        document.getElementById('saldo').value = conta.saldo;
        document.getElementById('descricaoConta').value = conta.descricaoConta;
        document.getElementById('meta').value = conta.meta;
        document.getElementById('tipo').value = conta.tipo;
        document.getElementById('detalhes').value = conta.detalhes;

    
        document.querySelector(`input[name="id_icone"][value="${conta.id_icone}"]`).checked = true;
        document.querySelector(`input[name="id_cor"][value="${conta.id_cor}"]`).checked = true;

    
        updatePreview();
    } catch (error) {
        console.error('Erro:', error);
    }
}

function editSelectedAccount() {
    if (selectedAccountId === null) {
        alert('Selecione uma conta para editar.');
        return;
    }

    window.location.href = `editarCarteira.html?id=${selectedAccountId}`;
}

document.addEventListener('DOMContentLoaded', loadCarteiras);

document.getElementById('edit-carteira').addEventListener('click', editSelectedAccount);

document.getElementById('delete-carteira').addEventListener('click', deleteSelectedAccount);
