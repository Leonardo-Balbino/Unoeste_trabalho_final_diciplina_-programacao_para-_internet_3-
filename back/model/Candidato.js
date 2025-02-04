import CandidatoDao from "../DAO/candidatoDao.js"

export default class Candidato {
    //atributos Privados

    #nome
    #partido
    #numero
    

    constructor(nome, partido, numero) {
        this.#nome = nome;
        this.#partido = partido;
        this.#numero = numero;
        

    }

    get nome(){
        return this.#nome;
    }

    set nome(newNome){
        this.#nome = newNome;
    }



    get partido(){
        return this.#partido;
    }

    set partido(newpartido){
        this.#partido = newpartido;
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
        partido: this. #partido,
        numero: this.#numero,
       
        }
    }



    async incluir(){
        const candidatoDao = new CandidatoDao();
        await candidatoDao.gravar(this);
    }

    async consultar(termoBusca){
        const candidatoDao = new candidatoDao();
        return await candidatoDao.consultar(termoBusca);
    }

    
}
