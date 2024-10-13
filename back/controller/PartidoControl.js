import Partido from "../model/Partido.js";
import PartidoDAO from "../DAO/partidoDao.js"; // Certifique-se de importar corretamente

export default class PartidoControl {
    constructor() {
        this.partidoDAO = new PartidoDAO(); // Inicialize PartidoDAO
    }

    // Método POST para gravar partido
    gravar = (request, response) => {
        if (request.method == "POST" && request.is("application/json")) {
            const { nome, sigla, numero } = request.body;

            if (nome && sigla && numero) {
                const partido = new Partido(nome, sigla, numero);
                this.partidoDAO.gravar(partido).then(() => { // Use partidoDAO aqui
                    response.status(201).json({
                        "status": true,
                        "mensagem": "Partido incluído com sucesso!"
                    });
                }).catch((erro) => {
                    response.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao incluir o partido: " + erro.message
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

    // Método GET para consultar partido
    consultar = (request, response) => {
        let termoBusca = request.params.termoBusca || "";

        if (request.method == "GET") {
            this.partidoDAO.consultar(termoBusca).then((partidos) => { // Use partidoDAO aqui
                response.status(200).json({
                    "status": true,
                    "lista partido": partidos
                });
            }).catch((erro) => {
                response.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar o partido: " + erro.message
                });
            });
        }
    };
}
