const cards = document.querySelectorAll('.card');
let temCartaVirada = false;
let primeiraCarta, segundaCarta;
let bloqueioTabuleiro;

function vireCarta() {
    if(bloqueioTabuleiro) return
    if(this === primeiraCarta) return

    this.classList.add('vire');
    if(!temCartaVirada) {
        temCartaVirada = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    temCartaVirada = false;
    verifica();
}

function verifica() {
    if(primeiraCarta.dataset.card === segundaCarta.dataset.card) {
        desativaCartas();
        return;
    }

    inverteCarta();
}

function desativaCartas() {
    primeiraCarta.removeEventListener('click', vireCarta);
    segundaCarta.removeEventListener('click', vireCarta);

    reseteTabuleiro();
}

function inverteCarta() {
    bloqueioTabuleiro = true;
    setTimeout(() => {
        primeiraCarta.classList.remove('vire');
        segundaCarta.classList.remove('vire');
        reseteTabuleiro();
    }, 1500);
}

function reseteTabuleiro() {
    [temCartaVirada, bloqueioTabuleiro] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

(function embaralha() {
    cards.forEach(card => {
        let randomPosicao = Math.floor(Math.random() * 12);
        card.style.order = randomPosicao;
    })
})();

cards.forEach(card => {
    card.addEventListener('click', vireCarta);
});