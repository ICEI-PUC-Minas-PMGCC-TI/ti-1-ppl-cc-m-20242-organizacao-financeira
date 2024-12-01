const API_URL = 'http://localhost:3000/lembretes';


async function carregarLembretes() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao carregar lembretes');
        const lembretes = await response.json();

        const listaLembretes = document.getElementById('listaLembretes');
        listaLembretes.innerHTML = '';

        lembretes.forEach((lembrete) => {
            const li = document.createElement('li');
            li.textContent = `${lembrete.titulo} - R$${lembrete.valor.toFixed(2)} - ${lembrete.data}`;

            const botaoExcluir = document.createElement('button');
            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.onclick = () => excluirLembrete(lembrete.id);
            li.appendChild(botaoExcluir);

            listaLembretes.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao carregar lembretes:', error);
    }
}




async function excluirLembrete(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro ao excluir lembrete');
        alert('Lembrete excluído com sucesso!');
        carregarLembretes(); 
    } catch (error) {
        console.error('Erro ao excluir lembrete:', error);
    }
}


window.onload = carregarLembretes;
