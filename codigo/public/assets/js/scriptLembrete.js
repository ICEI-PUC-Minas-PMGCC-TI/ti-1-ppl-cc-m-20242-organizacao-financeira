document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();


    const dadosLembrete = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        valor: parseFloat(document.getElementById('valor').value),
        data: document.getElementById('data').value,
        status: document.getElementById('status').checked,
        frequencia: document.getElementById('frequencia').value
    };

   
    salvarLembrete(dadosLembrete);
    alert('Lembrete salvo');
    document.querySelector('form').reset();
});

async function salvarLembrete(dados) {
  
    let pagamentosSalvos = JSON.parse(localStorage.getItem('pagamentos')) || [];
    pagamentosSalvos.push(dados);
    localStorage.setItem('pagamentos', JSON.stringify(pagamentosSalvos));

    
    try {
        const resposta = await fetch('http://localhost:3001/lembretes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        if (!resposta.ok) {
            throw new Error('Erro ao salvar no servidor');
        }
        console.log('Lembrete salvo no servidor');
    } catch (erro) {
        console.error('Falha ao salvar no servidor:', erro);
    }
}

