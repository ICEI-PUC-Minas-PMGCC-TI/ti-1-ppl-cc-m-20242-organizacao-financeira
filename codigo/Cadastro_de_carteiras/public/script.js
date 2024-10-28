const colorPreview = document.getElementById('preview-box');
const iconPreview = document.getElementById('icon-preview');

document.querySelectorAll('.color-picker input').forEach(input => {
    input.addEventListener('change', (event) => {
        const color = event.target.value;
        colorPreview.style.backgroundColor = color;
    });
});

document.querySelectorAll('.icon-picker input').forEach(input => {
    input.addEventListener('change', (event) => {
        const icon = event.target.value;
        iconPreview.textContent = icon;
    });
});


function validateForm() {
    const fields = ["nomeConta", "saldo", "descricaoConta", "meta", "detalhes", "tipo"];
    
    // Verifica se todos os campos obrigatórios estão preenchidos
    for (const field of fields) {
        if (document.getElementById(field).value === "") {
            alert(`${field} é obrigatório`);
            return false;
        }
    }
    
    // Verifica se um ícone foi selecionado
    const iconSelected = document.querySelector('.icon-picker input:checked');
    if (!iconSelected) {
        alert("Por favor, selecione um ícone.");
        return false;
    }

    // Verifica se uma cor foi selecionada
    const colorSelected = document.querySelector('.color-picker input:checked');
    if (!colorSelected) {
        alert("Por favor, selecione uma cor.");
        return false;
    }


    return true;
}

function addData() {
    if (validateForm()) {
        const data = {
            nomeConta: document.getElementById("nomeConta").value,
            saldo: document.getElementById("saldo").value,
            descricaoConta: document.getElementById("descricaoConta").value,
            meta: document.getElementById("meta").value,
            detalhes: document.getElementById("detalhes").value,
            tipo: document.getElementById("tipo").value,
            id_icone: document.querySelector('.icon-picker input:checked').value,
            id_cor: document.querySelector('.color-picker input:checked').value
        };

        fetch('/addContas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(message => alert(message))
        .catch(error => alert("Erro: " + error));
    }
}


