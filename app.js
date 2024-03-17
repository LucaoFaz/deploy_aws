const express = require('express'); //import do js. Pegando a biblioteca express
const port = 3000; //endereço para onde está enviando a informação
const app = express(); // criando uma instância. Instância é um objeto que assume as características de determinada classe.
                       // esse app vai ter tudo que a classe express define.
                       // express é uma biblioteca de tudo que uma api precisa.
//req = requisição
//res = resposta ao servidor

app.use(express.json());

//get é receber dados
app.get('/', (req, res) => {
    res.send('Hello');
});

//post é enviar dados
app.post('/', (req, res) => {
    const idempotencyId = req.body.idempotencyId;
    const amount = req.body.amount;
    const type = req.body.type;
    
    if(!idempotencyId || !amount || !type){
        return res.status(400).send("Ausência de dado(s) obrigatório(s) no payload da transação.");
        //status(400) indica que a solicitação feita não foi bem formada ou falta informações essenciais.
    }

    console.log("idempotencyId:",idempotencyId);
    console.log("amount:", amount);
    console.log("type:",type);
    res.send('Transacao recebida com sucesso'); 
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

