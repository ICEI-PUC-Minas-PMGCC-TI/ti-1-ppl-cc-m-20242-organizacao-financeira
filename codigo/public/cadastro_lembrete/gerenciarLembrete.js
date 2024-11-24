function carregarLembretes() {

    const lembretes = JSON.parse(localStorage.getItem('pagamentos')) || [];

    const listaLembretes = document.getElementById('listaLembretes');
    listaLembretes.innerHTML = ''; 

    lembretes.forEach((lembrete, index) => {
  
        const li = document.createElement('li');
        li.textContent = `${lembrete.titulo} - R$${lembrete.valor.toFixed(2)} - ${lembrete.data}`;
        
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.onclick = function() {
            excluirLembrete(index);
        };
        li.appendChild(botaoExcluir);
        listaLembretes.appendChild(li);
    });
}

function excluirLembrete(index) {
    let lembretes = JSON.parse(localStorage.getItem('pagamentos')) || [];
    lembretes.splice(index, 1); 
    localStorage.setItem('pagamentos', JSON.stringify(lembretes)); 
    carregarLembretes(); 
}

window.onload = carregarLembretes;
