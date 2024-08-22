var mysql = require('mysql2');

class DatabaseMySQL {

    #connection

    constructor() {
        this.#connection = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'mydb'
        }).promise(); 
    }



    async selectTarefa() {
        const query = await this.#connection.query('select * from tarefas')
        return query[0]
      }
      async selectTarefaId(id) {
        const query = await this.#connection.query('select * from tarefas where id_tarefa =' + id)
        return query[0]
      }
      async AddTarefa(param) {
        const sql = `insert into tarefas (nome_tarefa, obj_tarefa, data_conclusao)
       values ('${param.nome}','${param.objetivo}','${param.data_conc}')`
    
        const query = await this.#connection.execute(sql)
        return query[0]
      }
      async deleteTarefa(id) {
        const sql = 'delete from tarefas where id_tarefa =' + id
    
        const query = await this.#connection.execute(sql)
        return query[0]
      }
      async updateTarefa(nome, objetivo, data_conc, id) {
        const sql = `update tarefas 
        set nome_tarefa = "${nome}",
            obj_tarefa = "${objetivo}",
            data_conclusao = "${data_conc}"
            where id_tarefa = ${id}
      `
        console.log(sql)
        const r = await this.#connection.execute(sql)
        return r[0]
      }

}

module.exports = DatabaseMySQL