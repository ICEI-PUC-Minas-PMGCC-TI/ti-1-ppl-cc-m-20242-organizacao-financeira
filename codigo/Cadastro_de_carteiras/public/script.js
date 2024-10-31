function validateForm() {
    const fields = ["nomeConta", "saldo", "descricaoConta", "meta", "detalhes", "tipo"];
    
    for (const field of fields) {
        if (document.getElementById(field).value === "") {
            alert(`${field} é obrigatório`);
            return false;
        }
    }

    const iconSelected = document.querySelector('.icon-picker input:checked');
    if (!iconSelected) {
        alert("Por favor, selecione um ícone.");
        return false;
    }

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

function updatePreview() {
    const iconPreview = document.getElementById("icon-preview");
    const selectedIcon = document.querySelector('.icon-picker input:checked');
    const selectedColor = document.querySelector('.color-picker input:checked');

    if (selectedIcon) {
        iconPreview.textContent = selectedIcon.value;
    }

    if (selectedColor) {
        const colorValue = selectedColor.value;
        document.querySelector('.preview-box').style.backgroundColor = colorValue;
    }
}

const iconInputs = document.querySelectorAll('.icon-picker input');
const colorInputs = document.querySelectorAll('.color-picker input');

iconInputs.forEach(input => {
    input.addEventListener('change', updatePreview);
});

colorInputs.forEach(input => {
    input.addEventListener('change', updatePreview);
});
