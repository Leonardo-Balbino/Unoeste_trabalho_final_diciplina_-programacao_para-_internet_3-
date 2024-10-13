import conectar from "./conexao.js";
import Candidato from "../model/Candidato.js";

export default class CandidatoDAO {
    constructor() {
        console.log("teste");
        this.init(); // Inicializar o banco de dados
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS candidato (
                pk INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(80) NOT NULL,
                partido VARCHAR(100) NOT NULL,
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

    async gravar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = `INSERT INTO candidato (nome, partido, numero)
                         VALUES (?, ?, ?);`;
            const parametros = [
                candidato.nome,
                candidato.partido,
                candidato.numero,
            ];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termoBusca) {
        let sql = "";
        let parametros = [];
        if (termoBusca) {
            sql = `SELECT * FROM candidato WHERE nome = ? ORDER BY nome;`;
            parametros.push(termoBusca);
        } else {
            sql = `SELECT * FROM candidato ORDER BY nome;`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        const listaCandidato = [];

        for (const registro of registros) {
            const candidato = new Candidato(
                registro.nome,
                registro.partido,
                registro.numero
            );
            listaCandidato.push(candidato);
        }

        await global.poolConexoes.releaseConnection(conexao);
        return listaCandidato;
    }
}
