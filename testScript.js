//é uma biblioteca JavaScript que é amplamente utilizada para 
//fazer requisições HTTP (como GET, POST, PUT, DELETE, etc.) de forma assíncrona
const axios = require('axios');

//biblioteca para gerar números aleatórios
const { v4: uuidv4 } = require('uuid');
//O v4 é um dos métodos disponíveis na biblioteca uuid para gerar UUIDs.
//A sintaxe { v4: uuidv4 } está atribuindo o método v4() à variável uuidv4. 
//Isso significa que, quando usamos uuidv4, estamos nos referindo ao método v4() da biblioteca uuid. 

//url da minha api post
const apiUrl = 'http://localhost:3000';

//função para criar transação
//async significa que é uma função assíncrona, que é um tipo de função que permite a utilização do 'await'
//o que simplifica a escrita de código que envolve operações assíncronas, como requisições de rede ou acesso a bancos de dados.
async function createTransaction(idempotencyId, amount, type) {
    try{
        // Faz uma requisição POST (uma requisição para enviar dados ao servidor) para a sua API com os dados da transação
        //"servidor" se refere à aplicação que está escutando requisições na porta 3000 do computador onde está sendo executada.
        

        //axios.post é um método específico do axios que permite fazer uma requisição HTTP do tipo POST. 
        //Ele aceita dois parâmetros: o primeiro é a URL para onde a requisição será enviada, 
        //e o segundo é um objeto contendo os dados que serão enviados no corpo da requisição.
        const response = await axios.post(apiUrl, {
            idempotencyId: idempotencyId,
            amount: amount,
            type: type
            //dentro das {} é o nosso objeto.
        });
        //A resposta da API será armazenada na variável 'response'.
        //Portanto, essa linha de código está fazendo uma requisição POST para a sua API, enviando os dados da transação (idempotencyId, amount, type) no corpo da requisição, e aguardando a resposta da API. 

        console.log(response.data);
        //response é um objeto com a resposta da requisição HTTP do tipo POST. Nele, há várias informações, como: 
        //Se a requisição foi bem-sucedida, Se a requisição não pôde ser processada devido a erros, Se ocorreu um erro interno no servidor...
        //e data pegará exatamente os dados dessa resposta do servidor. Ou seja, pegará somente a parte necessária, e não o amontoado de informações.
    } catch(error){
        //em caso de erro...
        console.error('Erro ao criar transação:', error.message);
    }
}

function generateIdempotencyId() {
    return uuidv4();
}

async function sendTransactions(){

    for (let i=0; i<100; i++){
        const idempotencyId = generateIdempotencyId();

        //gera um valor aleatório entre 1 e 1000
        const amount = Math.floor(Math.random()*1000)+1;

        // Define o tipo da transação aleatoriamente entre 'credit' e 'debit'
        const type = Math.random() < 0.5 ? 'credit' : 'debit';
        //math.random() gera um valor decimal aleatório entre 0 e 1.
        //? 'credit' : 'debit'; define o seguinte: Se a expressão antes de ? for verdadeira, o valor antes dos dois pontos será retornado. do contrário,
        // o valor depois dos dois pontos será retornado.
        
        // Cria a transação com os dados gerados
        await createTransaction(idempotencyId, amount, type);
    }
}

//chama a função para enviar as transações
sendTransactions();
