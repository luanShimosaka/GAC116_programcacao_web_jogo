const buracos = document.querySelectorAll('.buraco');
const displayTempo = document.querySelector('#tempo');
const displayPontuacao = document.querySelector('#pontuacao');
const mensagemFinal = document.querySelector('#mensagem-final');
const btnIniciar = document.querySelector('#btn-iniciar');


let resultado = 0;
let tempoAtual = 15;
let posicaoAlvo = null;
let pontosDoAlvoAtual = 1;
let timerId = null;
let countdownTimerId = null;
let jogando = false;
const metaVitoria = 20;

function buracoAleatorio() {
    if (!jogando) return;

    buracos.forEach(buraco => {
        buraco.innerHTML = '';
    });

    let posicaoAleatoria = buracos[Math.floor(Math.random() * 9)];
    
    let divAlvo = document.createElement('div');
    
    let chanceBolaAzul = Math.random() < 0.25;

    let chanceBolaPreta = Math.random() < 0.1;
    
    let tempoDeExibicao;

    if (chanceBolaAzul) {
        divAlvo.classList.add('alvo-azul');
        pontosDoAlvoAtual = 3; 
        tempoDeExibicao = 400;
    } else if (chanceBolaPreta) {
        divAlvo.classList.add('alvo-preto');
        pontosDoAlvoAtual = -5; 
        tempoDeExibicao = 600;
    } else {
        divAlvo.classList.add('alvo');
        pontosDoAlvoAtual = 1; 
        tempoDeExibicao = 800; 
    }

    posicaoAleatoria.appendChild(divAlvo);
    posicaoAlvo = posicaoAleatoria.id;

    timerId = setTimeout(buracoAleatorio, tempoDeExibicao);
}

buracos.forEach(buraco => {
    buraco.addEventListener('mousedown', () => {
        if (jogando && buraco.id === posicaoAlvo) {
            resultado += pontosDoAlvoAtual;
            displayPontuacao.textContent = resultado;
            posicaoAlvo = null;
            buraco.innerHTML = '';
        }
    });
});

function contagemRegressiva() {
    tempoAtual--;
    displayTempo.textContent = tempoAtual;

    if (tempoAtual === 0) {
        clearInterval(countdownTimerId);
        clearTimeout(timerId);
        jogando = false;
        btnIniciar.disabled = false;
        btnIniciar.textContent = "Reiniciar Jogo";
        
        buracos.forEach(buraco => buraco.innerHTML = '');

        if (resultado >= metaVitoria) {
            mensagemFinal.textContent = `🏆 VITÓRIA! Você fez ${resultado} pontos!`;
            mensagemFinal.style.color = "green";
        } else {
            mensagemFinal.textContent = `💥 DERROTA! Faltaram ${metaVitoria - resultado} pontos.`;
            mensagemFinal.style.color = "red";
        }
    }
}

function iniciarJogo() {
    resultado = 0;
    tempoAtual = 15;
    jogando = true;
    displayPontuacao.textContent = resultado;
    displayTempo.textContent = tempoAtual;
    mensagemFinal.textContent = '';
    btnIniciar.disabled = true;

    buracos.forEach(buraco => buraco.innerHTML = '');

    buracoAleatorio();
    countdownTimerId = setInterval(contagemRegressiva, 1000);
}

btnIniciar.addEventListener('click', iniciarJogo);