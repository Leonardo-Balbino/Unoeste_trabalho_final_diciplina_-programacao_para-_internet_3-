import conectar from "./conexao.js";
import Partido from "../model/Partido.js";

export default class PartidoDAO {
    constructor() {
        console.log("teste");
        this.init(); // Inicializar o banco de dados
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS partido (
                pk INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(80) NOT NULL,
                sigla VARCHAR(10) NOT NULL,
                numero VARCHAR(100) NOT NULL
            );`;
            await conexao.execute(sql);
            await global.poolConexoes.releaseConnection(conexao);
            console.log("Banco de dados iniciado com sucesso!");
        } catch (erro) {
            console.log("O banco de dados não pode ser iniciado!");
            console.log(erro);
        }
    }

    async gravar(partido) {
        if (partido instanceof Partido) {
            const conexao = await conectar();
            const sql = `INSERT INTO partido (nome, sigla, numero)
                         VALUES (?, ?, ?);`;
            const parametros = [
                partido.nome,
                partido.sigla,
                partido.numero,
            ];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termoBusca) {
        let sql = "";
        let parametros = [];
        if (termoBusca) {
            sql = `SELECT * FROM partido WHERE nome = ? ORDER BY nome;`;
            parametros.push(termoBusca);
        } else {
            sql = `SELECT * FROM partido ORDER BY nome;`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        const listaPartido = [];

        for (const registro of registros) {
            const partido = new Partido(
                registro.nome,
                registro.sigla,
                registro.numero
            );
            listaPartido.push(partido);
        }

        await global.poolConexoes.releaseConnection(conexao);
        return listaPartido;
    }
}
