const apiUrl = 'http://localhost:3000/lembretes'; 

document.querySelector('form').addEventListener('submit', async function (event) {
  event.preventDefault(); 

  
  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const valor = parseFloat(document.getElementById('valor').value);
  const data = document.getElementById('data').value;
  const status = document.getElementById('status').checked;
  const frequencia = document.getElementById('frequencia').value;

  
  if (!titulo || !descricao || isNaN(valor) || !data || !frequencia) {
    alert('Por favor, preencha todos os campos obrigatórios!');
    return;
  }


  const novoLembrete = {
    titulo,
    descricao,
    valor,
    data,
    status,
    frequencia,
  };

  try {
   
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoLembrete),
    });

    if (!response.ok) throw new Error('Erro ao salvar o lembrete no servidor.');

    alert('Lembrete cadastrado com sucesso!');
    document.querySelector('form').reset(); 
  } catch (error) {
    console.error('Erro:', error);
    alert('Falha ao cadastrar o lembrete. Tente novamente.');
  }
});
