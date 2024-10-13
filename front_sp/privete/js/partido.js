//Esse arquivo será utilizado para armazenar código javascript
//que permitirá a comunicação com o backend.
const cadastro_partidos_form = document.getElementById('cadastro-partidos-form');
//passando uma função como parâmetro para outra função
//nesse momento é errado usar a seguinte sintaxe: validarCampos()
//só quando a submissão dos dados acontecer é que a função validarCampos será executada.


cadastro_partidos_form.onsubmit = validarCampos;
const enderecoAPI = 'http://localhost:4000/partido';


//buscarTodosPartidos();

console.log("teste se chegou")

var motivoAcao = "CADASTRAR";

    function gravarPartido(){
        const objetoCliente = {
            nome: document.getElementById('nome-partido').value,
            sigla: document.getElementById('sigla-partido').value,
            numero: document.getElementById('numero-registro').value,
        }

        fetch(enderecoAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objetoCliente)
        }).then((resposta) => {
            return resposta.json();
        }).then((respostaAPI) => {
            if (respostaAPI.status == true) {
                exibirMensagem(respostaAPI.mensagem, 'green');

                exibirTabela(objetoCliente);
            }
            else{
                exibirMensagem(respostaAPI.mensagem, 'red');
            }
        }).catch((erro) => {
            exibirMensagem(erro, '#D2691E');
        });

    }

    function validarCampos(evento){

            const nome     = document.getElementById('nome-partido').value;
            const sigla    = document.getElementById('sigla-partido').value;
            const numero   = document.getElementById('numero-registro').value;
            
        
            //impedem que o navegador continue o processo de submissão do formulário
            evento.stopPropagation();
            evento.preventDefault();
        
            if (nome && sigla && numero ) {
                if (motivoAcao == "CADASTRAR"){
                    gravarPartido();
                }
            
                
                cadastro_partidos_form.reset();
                //buscarTodosClientes();
                return true;
            }
            else{
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


    function exibirTabela(partido) {
        const tabelaPartidos = document.getElementById('tabela-partidos').getElementsByTagName('tbody')[0];
        const novaLinha = tabelaPartidos.insertRow();
        novaLinha.insertCell(0).innerText = partido.nome;
        novaLinha.insertCell(1).innerText = partido.sigla;
        novaLinha.insertCell(2).innerText = partido.numero;
    }
    



