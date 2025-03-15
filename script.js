const canvas = document.getElementById('cobrinhaCanvas');
const ctx = canvas.getContext('2d');
const pontuacaoDisplay = document.getElementById('pontuacao');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

const tamanhoBloco = 20;
const blocosX = canvas.width / tamanhoBloco;
const blocosY = canvas.height / tamanhoBloco;

let cobrinha = [{ x: 10, y: 10 }];
let direcaoX = 1;
let direcaoY = 0;
let comida = { x: 5, y: 5 };
let velocidade = 100;
let jogoAcabou = false;
let pontuacao = 0;
const appleImage = new Image();
appleImage.src = 'apple.png'; // Garanta que a imagem esteja na mesma pasta

function desenharCobrinha() {
    cobrinha.forEach((bloco, index) => {
        if (index === 0) {
            ctx.fillStyle = '#00FF00'; // Cabeça verde neon
            ctx.beginPath();
            ctx.arc(bloco.x * tamanhoBloco + tamanhoBloco / 2, bloco.y * tamanhoBloco + tamanhoBloco / 2, tamanhoBloco / 2, 0, 2 * Math.PI);
            ctx.fill();
            // Olhos
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(bloco.x * tamanhoBloco + tamanhoBloco / 4, bloco.y * tamanhoBloco + tamanhoBloco / 3, 2, 0, 2 * Math.PI);
            ctx.arc(bloco.x * tamanhoBloco + tamanhoBloco * 3 / 4, bloco.y * tamanhoBloco + tamanhoBloco / 3, 2, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            ctx.fillStyle = '#00CC00'; // Corpo verde escuro
            ctx.beginPath();
            ctx.arc(bloco.x * tamanhoBloco + tamanhoBloco / 2, bloco.y * tamanhoBloco + tamanhoBloco / 2, tamanhoBloco / 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    });
}

function desenharComida() {
    ctx.drawImage(appleImage, comida.x * tamanhoBloco, comida.y * tamanhoBloco, tamanhoBloco, tamanhoBloco);
}

function atualizar() {
    if (jogoAcabou) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let cabecaX = cobrinha[0].x + direcaoX;
    let cabecaY = cobrinha[0].y + direcaoY;

    if (cabecaX < 0 || cabecaX >= blocosX || cabecaY < 0 || cabecaY >= blocosY || verificarColisao()) {
        jogoAcabou = true;
        alert('Fim de jogo! Pontuação: ' + pontuacao);
        return;
    }

    cobrinha.unshift({ x: cabecaX, y: cabecaY });

    if (cabecaX === comida.x && cabecaY === comida.y) {
        comida = {
            x: Math.floor(Math.random() * blocosX),
            y: Math.floor(Math.random() * blocosY)
        };
        pontuacao += 10;
        pontuacaoDisplay.textContent = 'Pontuação: ' + pontuacao;
    } else {
        cobrinha.pop();
    }

    desenharComida();
    desenharCobrinha();
}

function verificarColisao() {
    for (let i = 1; i < cobrinha.length; i++) {
        if (cobrinha[i].x === cobrinha[0].x && cobrinha[i].y === cobrinha[0].y) {
            return true;
        }
    }
    return false;
}

setInterval(atualizar, velocidade);

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': if (direcaoY !== 1) { direcaoX = 0; direcaoY = -1; } break;
        case 'ArrowDown': if (direcaoY !== -1) { direcaoX = 0; direcaoY = 1; } break;
        case 'ArrowLeft': if (direcaoX !== 1) { direcaoX = -1; direcaoY = 0; } break;
        case 'ArrowRight': if (direcaoX !== -1) { direcaoX = 1; direcaoY = 0; } break;
    }
});