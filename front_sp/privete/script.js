document.addEventListener('DOMContentLoaded', function() {
    
    console.log("teste2")

    document.getElementById('cadastro-partidos-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome-partido').value;
        const sigla = document.getElementById('sigla-partido').value;
        const numeroRegistro = document.getElementById('numero-registro').value;

        // Adiciona o partido à tabela
        const tabelaPartidos = document.getElementById('tabela-partidos').getElementsByTagName('tbody')[0];
        const novaLinha = tabelaPartidos.insertRow();
        novaLinha.insertCell(0).innerText = nome;
        novaLinha.insertCell(1).innerText = sigla;
        novaLinha.insertCell(2).innerText = numeroRegistro;

        // Limpa o formulário
        document.getElementById('cadastro-partidos-form').reset();
    });
});

function carregarPartidos() {
    fetch('URL_DA_SUA_API/partidos')
        .then(response => response.json())
        .then(partidos => {
            const selectPartidos = document.getElementById('partido-candidato');
            selectPartidos.innerHTML = '<option value="">Selecione um partido</option>';
            partidos.forEach(partido => {
                const option = document.createElement('option');
                option.value = partido.nome;
                option.text = partido.nome;
                selectPartidos.appendChild(option);
            });
        })
        .catch(error => console.error('Erro:', error));
}
