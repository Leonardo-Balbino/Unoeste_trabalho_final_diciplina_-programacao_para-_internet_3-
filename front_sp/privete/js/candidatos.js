// Esse arquivo será utilizado para armazenar código javascript
// que permitirá a comunicação com o backend.
const cadastro_candidatos_form = document.getElementById('cadastro-candidatos-form');

// passando uma função como parâmetro para outra função
// nesse momento é errado usar a seguinte sintaxe: validarCampos()
// só quando a submissão dos dados acontecer é que a função validarCampos será executada.
cadastro_candidatos_form.onsubmit = validarCampos;

const enderecoAPI = 'http://localhost:4000/candidato';
const enderecoPartidoAPI = 'http://localhost:4000/partido';
var motivoAcao = "CADASTRAR";

function gravarCandidato() {
    const objetoCandidato = {
        nome: document.getElementById('nome-candidato').value,
        partido: document.getElementById('partido-candidato').value,
        numero: document.getElementById('numero-candidato').value,
    }

    fetch(enderecoAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoCandidato)
    }).then((resposta) => {
        return resposta.json();
    }).then((respostaAPI) => {
        if (respostaAPI.status == true) {
            exibirMensagem(respostaAPI.mensagem, 'green');
            exibirTabela(objetoCandidato);
        } else {
            exibirMensagem(respostaAPI.mensagem, 'red');
        }
    }).catch((erro) => {
        exibirMensagem(erro, '#D2691E');
    });
}

function validarCampos(evento) {
    const nome = document.getElementById('nome-candidato').value;
    const partido = document.getElementById('partido-candidato').value;
    const numero = document.getElementById('numero-candidato').value;

    // impedem que o navegador continue o processo de submissão do formulário
    evento.stopPropagation();
    evento.preventDefault();

    if (nome && partido && numero) {
        if (motivoAcao == "CADASTRAR") {
            gravarCandidato();
        }

        cadastro_candidatos_form.reset();
        return true;
    } else {
        exibirMensagem('Por favor, preencha todos os campos do formulário.');
        return false;
    }
}

function exibirMensagem(mensagem, cor = 'black') {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = "<p style='color: " + cor + ";'>" + mensagem + "</p>";
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}

function exibirTabela(candidato) {
    const tabelaCandidatos = document.getElementById('tabela-candidatos').getElementsByTagName('tbody')[0];
    const novaLinha = tabelaCandidatos.insertRow();
    novaLinha.insertCell(0).innerText = candidato.nome;
    novaLinha.insertCell(1).innerText = candidato.partido;
    novaLinha.insertCell(2).innerText = candidato.numero;
}

function carregarPartidos() {
    fetch(enderecoPartidoAPI, { // Certifique-se de que a URL está correta
        method: 'GET',
    })
    .then((resposta) => {
        return resposta.json();
    })
    .then((dados) => {
        const partidos = dados['lista partido']; // Ajuste para acessar a lista de partidos corretamente
        const selectPartidos = document.getElementById('partido-candidato');
       
        selectPartidos.innerHTML = '';
        
        const optionDefault = document.createElement('option');
        optionDefault.value = '';
        optionDefault.text = 'Selecione um partido';
        selectPartidos.appendChild(optionDefault);
        
        // Cria um Set para armazenar os partidos únicos
        const partidosUnicos = new Set();
        
        // Extrai os nomes dos partidos e adiciona ao Set
        partidos.forEach((partido) => {

            console.log(partido.nome)
            partidosUnicos.add(partido.nome);
        });

        // Preenche o select com os partidos únicos
        partidosUnicos.forEach((partido) => {
            const option = document.createElement('option');
            option.value = partido;
            option.text = partido;
            selectPartidos.appendChild(option);
        });
    })
    .catch((erro) => {
        console.error('Erro:', erro.message);
    });
}

// Carregar partidos quando a página é carregada
window.onload = carregarPartidos;

