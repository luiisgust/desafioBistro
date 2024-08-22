const TarefaDAO = require('../DAO/TarefaDAO')
const path = require('path')

const tarefaDAO = new TarefaDAO();


module.exports = (app) => {


    app.get("/tarefas", async (req, res) => {        
        const tarefaDAO = new TarefaDAO()
        
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await tarefaDAO.consultarTodos())        
    })
    app.get("/tarefa", async (req, res) => {        
        res.render("index") 
    })
    app.get("/altertarefa/:id", async (req, res) =>{
        
        const tarefa = new TarefaDAO()        
        const r = await tarefa.consultarUm(req.params.id)
        console.log(r)
        res.render('attTarefa', { r })
    })
 

    app.post('/registerTarefa', async (req, res) => {
        
        const { 
            id,
            nome, 
            objetivo,
            data_conc  } = req.body;

            res.setHeader("Access-Control-Allow-Origin","*")
                
            let status;

            if(!id){
               status = await tarefaDAO.criarTarefa(nome, objetivo, data_conc) 
            }
            else{
                status = await tarefaDAO.atualizar(id, nome,  objetivo, data_conc)
            }
       
            res.redirect("/tarefa")
            
            }
    )


    // Delete
    app.delete("/tarefas/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const tarefaDAO = new TarefaDAO();

        const status = await tarefaDAO.apagar(req.params.id)

        res.json({
            status
        })
    })


    // Update
    app.put("/tarefa/:id", async (req, res) =>{
        const tarefaDAO = new TarefaDAO();
        
        const {
            nome,
            objetivo,
            data_conc,
            id
        } = req.body;

        console.log({nome, objetivo, data_conc, id})
      
        if(id == req.params.id){
          const r =  await tarefaDAO.atualizar(nome, objetivo, data_conc, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."}) 
        }         
    })    








}
