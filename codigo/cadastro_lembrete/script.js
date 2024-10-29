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

   //chama funcoes
    salvarLembrete(dadosLembrete);
    alert('Lembrete salvo');
    document.querySelector('form').reset();
});

function salvarLembrete(dados) {
    //salva dados no LocalServer, e reinicia para digitar lembrete novo
    let pagamentosSalvos = JSON.parse(localStorage.getItem('pagamentos')) || [];
    pagamentosSalvos.push(dados);
    localStorage.setItem('pagamentos', JSON.stringify(pagamentosSalvos));
}
