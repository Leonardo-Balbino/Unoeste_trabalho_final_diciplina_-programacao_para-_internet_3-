import CandidatoDAO from "../DAO/candidatoDao.js";
import Candidato from "../model/Candidato.js";

export default class CandidatoControl {
    constructor() {
        this.candidatoDao = new CandidatoDAO(); // Inicialize CandidatoDAO aqui
    }

    gravar = (request, response) => {
        if (request.method === "POST" && request.is("application/json")) {
            const { nome, partido, numero } = request.body;

            if (nome && partido && numero) {
                const candidato = new Candidato(nome, partido, numero);
                this.candidatoDao.gravar(candidato).then(() => {
                    response.status(201).json({
                        "status": true,
                        "mensagem": "Candidato incluído com sucesso!"
                    });
                }).catch((erro) => {
                    response.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao incluir o candidato: " + erro.message
                    });
                });
            }
        } else {
            response.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API"
            });
        }
    };

    consultar = (request, response) => {
        let termoBusca = request.params.termoBusca || "";

        if (request.method === "GET") {
            this.candidatoDao.consultar(termoBusca).then((candidatos) => {
                response.status(200).json({
                    "status": true,
                    "lista candidato": candidatos
                });
            }).catch((erro) => {
                response.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar o candidato: " + erro.message
                });
            });
        }
    };
}
