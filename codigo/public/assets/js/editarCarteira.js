const apiUrl = 'http://localhost:3000/contas';

function getAccountIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
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

async function updateData(id) {

    const nomeConta = document.getElementById('nomeConta').value;
    const saldo = document.getElementById('saldo').value;
    const descricaoConta = document.getElementById('descricaoConta').value;
    const meta = document.getElementById('meta').value;
    const tipo = document.getElementById('tipo').value;
    const detalhes = document.getElementById('detalhes').value;


    const iconeSelecionado = document.querySelector('input[name="id_icone"]:checked');
    const id_icone = iconeSelecionado ? iconeSelecionado.value : null;


    const corSelecionada = document.querySelector('input[name="id_cor"]:checked');
    const id_cor = corSelecionada ? corSelecionada.value : null;


    if (!nomeConta || !saldo || !descricaoConta || !meta || !tipo || !id_icone || !id_cor) {
        alert('Por favor, preencha todos os campos!');
        return;
    }


    const contaAtualizada = {
        nomeConta,
        saldo: parseFloat(saldo),
        descricaoConta,
        meta: parseFloat(meta),
        tipo,
        detalhes,
        id_icone,
        id_cor
    };

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contaAtualizada)
        });

        if (!response.ok) throw new Error('Erro ao atualizar a conta.');

        alert('Conta atualizada com sucesso!');
    
        window.location.href = "apresentacaoCarteira.html";
    } catch (error) {
        console.error('Erro:', error);
    }
}

function updatePreview() {
    const iconPreview = document.getElementById("icon-preview");
    const selectedIcon = document.querySelector('.icon-picker input:checked');
    const selectedColor = document.querySelector('.color-picker input:checked');

    if (selectedIcon) {
        iconPreview.textContent = selectedIcon.value;
    } else {
        iconPreview.textContent = "";
    }

    if (selectedColor) {
        const colorValue = selectedColor.value;
        document.querySelector('.preview-box').style.backgroundColor = colorValue;
    } else {
        document.querySelector('.preview-box').style.backgroundColor = "#fff";
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const id = getAccountIdFromUrl();
    
    if (id) {
    
        loadData(id);

    
        document.querySelectorAll('.icon-picker input').forEach(input => {
            input.addEventListener('change', updatePreview);
        });
        document.querySelectorAll('.color-picker input').forEach(input => {
            input.addEventListener('change', updatePreview);
        });

    
        document.querySelector('button[type="submit"]').addEventListener('click', () => updateData(id));
    } else {
        alert("ID da conta não encontrado.");
        window.location.href = "apresentacaoCarteira.html";
    }
});
