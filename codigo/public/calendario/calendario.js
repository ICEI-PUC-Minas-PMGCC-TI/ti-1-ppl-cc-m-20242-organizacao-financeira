const API_URL = 'http://localhost:3000/lembretes';

async function gerarCalendario() {
    const calendarioDiv = document.getElementById('calendario');
    const detalhesDiv = document.getElementById('lembreteDetalhes');
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    const lembretes = await buscarLembretes();
    const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0).getDate();

    calendarioDiv.innerHTML = '';
    detalhesDiv.style.display = 'none'; 

    
    for (let i = 0; i < primeiroDia; i++) {
        const divVazia = document.createElement('div');
        divVazia.classList.add('dia');
        calendarioDiv.appendChild(divVazia);
    }

   
    for (let dia = 1; dia <= ultimoDia; dia++) {
        const divDia = document.createElement('div');
        divDia.classList.add('dia');
        const dataAtual = new Date(anoAtual, mesAtual, dia).toISOString().split('T')[0];

        if (hoje.toISOString().split('T')[0] === dataAtual) {
            divDia.classList.add('atual');
        }

        divDia.innerHTML = `<span>${dia}</span>`;
        const lembretesDoDia = lembretes.filter(lembrete => lembrete.data === dataAtual);

        if (lembretesDoDia.length > 0) {
            const lembretesDiv = document.createElement('div');
            lembretesDiv.classList.add('lembretes');

            lembretesDoDia.forEach(lembrete => {
                const lembreteDiv = document.createElement('div');
                lembreteDiv.textContent = lembrete.titulo;
                lembreteDiv.classList.add('lembrete-item');
                lembreteDiv.onclick = () => exibirDetalhesLembrete(lembrete); 
                lembretesDiv.appendChild(lembreteDiv);
            });

            divDia.appendChild(lembretesDiv);
        }

        calendarioDiv.appendChild(divDia);
    }
}

function exibirDetalhesLembrete(lembrete) {
    const detalhesDiv = document.getElementById('lembreteDetalhes');
    detalhesDiv.innerHTML = `
        <h2>Detalhes do Lembrete</h2>
        <p><strong>Nome:</strong> ${lembrete.titulo}</p>
        <p><strong>Descrição:</strong> ${lembrete.descricao}</p>
        <p><strong>Valor:</strong> R$${lembrete.valor.toFixed(2)}</p>
        <p><strong>Data:</strong> ${lembrete.data}</p>
        <p><strong>Pago:</strong> ${lembrete.status ? 'Sim' : 'Não'}</p>
        <p><strong>Frequência:</strong> ${lembrete.frequencia}</p>
    `;
    detalhesDiv.style.display = 'block'; 
}

async function buscarLembretes() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao buscar lembretes');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados do db.json:', error);
        return [];
    }
}

window.onload = gerarCalendario;
