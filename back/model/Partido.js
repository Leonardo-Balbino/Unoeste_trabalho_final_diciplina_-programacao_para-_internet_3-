import PartidoDao from "../DAO/partidoDao.js"

export default class Partido {
    //atributos Privados

    #nome
    #sigla
    #numero
    

    constructor(nome, sigla, numero) {
        this.#nome = nome;
        this.#sigla = sigla;
        this.#numero = numero;
        

    }

    get nome(){
        return this.#nome;
    }

    set nome(newNome){
        this.#nome = newNome;
    }



    get sigla(){
        return this.#sigla;
    }

    set sigla(newsigla){
        this.#sigla = newsigla;
    }

    get numero(){
        return this.#numero;
    }

    set numero(newnumero){
        this.#numero = newnumero;
    }

    




    toJSON(){
        return {
        nome: this. #nome,
        sigla: this. #sigla,
        numero: this.#numero,
       
        }
    }



    async incluir(){
        const partidoDao = new PartidoDao();
        await partidoDao.gravar(this);
    }

    async consultar(termoBusca){
        const partidoDao = new partidoDao();
        return await partidoDao.consultar(termoBusca);
    }


    
}
