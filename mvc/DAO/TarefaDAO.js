const Tarefa = require('../model/TarefaModel');
const DatabaseMySQL = require('../../assets/DataBase/database')

class TarefaDAO{

    #db

    constructor(){
        this.#db = new DatabaseMySQL()
    }

    async consultarTodos(){
        let list_tarefa = []

        const query = await this.#db.selectTarefa()

        for (let index = 0; index < query.length; index++) {
            
            const tarefa = new Tarefa()
     
            tarefa.id = query[index].id_tarefa
            tarefa.nome = query[index].nome_tarefa
            tarefa.objetivo = query[index].obj_tarefa
            tarefa.data_conc = query[index].data_conclusao

            list_tarefa.push(tarefa.toJson())
        }

        return list_tarefa

    }

    async consultarUm(id){

        const query = await this.#db.selectTarefa(id)

        const tarefa = new Tarefa()

        if(query){
            tarefa.id = query[0].id_tarefa
            tarefa.nome = query[0].nome_tarefa
            tarefa.objetivo = query[0].obj_tarefa
            tarefa.data_conc = query[0].data_conclusao
        }

        return tarefa.toJson()
    }

    async criarTarefa(
        nome, 
        objetivo,
        data_conc
    ){

            const tarefa = new Tarefa(nome, objetivo, data_conc);

            const sql = await this.#db.AddTarefa(tarefa.toJson())

            return sql.insertId;

    }

    async apagar(id){
        const linhasAfetadas = await this.#db.deleteTarefa(id)
        return linhasAfetadas.affectedRows
    }

    async atualizar(nome, objetivo, data_conc, id){
        const tarefa = new Tarefa(nome, objetivo, data_conc)
        tarefa.id = id

        const att = await this.#db.updateTarefa(
            tarefa.nome,
            tarefa.objetivo,
            tarefa.data_conc,
            tarefa.id
        )

        return att.affectedRows;
    }

}

module.exports = TarefaDAO