class Tarefa{

    #id
    #nome
    #objetivo
    #data_conc

    constructor(nome, objetivo, data_conc){
        this.#nome = nome
        this.#objetivo = objetivo
        this.#data_conc = data_conc
    }


    get id(){
        return this.#id
    }
    set id(value){
        this.#id = value
    }

    get nome(){
        return this.#nome
    }
    set nome(value){
        this.#nome = value
    }

    get objetivo(){
        return this.#objetivo
    }
    set objetivo(value){
        this.#objetivo = value
    }

    get data_conc(){
        return this.#data_conc
    }
    set data_conc(value){
        this.#data_conc = value
    }


    toJson(){

        return {
            "id": this.#id,
            "nome": this.#nome,
            "objetivo": this.#objetivo,
            "data_conc": this.#data_conc,
        }
    }
}

module.exports = Tarefa