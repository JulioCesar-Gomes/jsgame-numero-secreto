// Cria listas/arrays []
let listaNumeroSorteado = [];

//Números aleatórios serão de até o máximo 10
let numeroLimite = 10;

let numeroSecreto = gerarNumeroAleatorio();
let numeroDeTentativas = 1;

//Função para acessar e escolher algum campo dentro do HTML que será editado.
function exibirTextoNaTela(tag, texto) {
    let selecionarCampo = document.querySelector(tag);
    selecionarCampo.innerHTML = texto;

    //Código para colocar voz citando os textos do jogo.
    responsiveVoice.speak(texto, `Brazilian Portuguese Female`, { rate: 1.1 });
}

function exibirMensagensIniciaisDoJogo() {
    //Efetua a alteração no campo escolhido do HTML
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

/*Necessário colocar também fora do escopo da função reiniciarJogo
para também exibir as mensagens antes de reiniciar as jogadas*/
exibirMensagensIniciaisDoJogo();

function verificarChute() {
    let chute = document.querySelector('input').value;

    /*Console.log é uma ferramenta para o desenvolvedor
    console.log(chute == numeroSecreto);*/
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Merece um prêmio!');
        let palavraTentativa = numeroDeTentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número com ${numeroDeTentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', `${mensagemTentativas}`);

        /*Acessa através do getElementaryByID o Botton ID reiniciar no HTML 
        e por meio do removeAttribute habilita o botão NOVO JOGO*/
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto) {
            let prenda = 'Chupar cana e assoviar ao mesmo tempo';
            exibirTextoNaTela('h1', `O número secreto é menor que ${chute}`);
            exibirTextoNaTela('p', `Pagar prenda: ${prenda}`);

        } else {
            prenda = 'Chupar cana e assoviar ao mesmo tempo';
            exibirTextoNaTela('h1', `O número secreto é maior que ${chute}`);
            exibirTextoNaTela('p', `Pagar prenda: ${prenda}`);
        }
        // É o mesmo que numeroDeTentativas = numeroDeTentativas + numeroDeTentativas; 
        numeroDeTentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroGerado = parseInt(Math.random() * numeroLimite + 1);

    //Verifica os números sorteados da lista
    let qtdDeElementosNaLista = listaNumeroSorteado.length;

    //Se os elementos contidos na lista chegou a quantidade limite, esvazie a lista.
    if (qtdDeElementosNaLista == numeroLimite) {
        listaNumeroSorteado = [];
    }

    //Se o número gerado está incluso na lista, então gere outro número.
    if (listaNumeroSorteado.includes(numeroGerado)) {
        return gerarNumeroAleatorio();
    }

    //Se o número gerado ainda não está na lista, então inclua na lista.
    else {
        listaNumeroSorteado.push(numeroGerado);
        console.log(listaNumeroSorteado);
        return numeroGerado;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    //Value deve receber uma string (vazio).
    chute.value = '';
}

//Função utilizada para clicar no botão Novo Jogo e reiniciar 
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    numeroDeTentativas = 1;
    exibirMensagensIniciaisDoJogo();

    /*Acessa através do getElementaryByID o Botton ID reiniciar no HTML 
    e por meio do setAttribute desabilita o botão NOVO JOGO para a primeira jogada 
    após reiniciar*/
    document.getElementById('reiniciar').setAttribute('disabled', true);
}