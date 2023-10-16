const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        vidas: document.querySelector("#vidas"),
        resultado: document.querySelector("#resultado"),

        pontos: document.querySelector("#pontos"),
        erros: document.querySelector("#erros"),
        vidasRestantes: document.querySelector("#vidasRestantes")


    },
    values: {
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        resultErro: 0,
        currenteTime: 15,
        vidas: 5
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
      },
}

function countDown() {
    state.values.currenteTime--;
    state.view.timeLeft.textContent = state.values.currenteTime;

    if (state.values.currenteTime <= 0) {
        playSound("game-over");
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);

       state.view.pontos.textContent = state.values.result;
       state.view.erros.textContent = state.values.resultErro;
       state.view.vidasRestantes.textContent = state.values.vidas;
       state.view.resultado.style.display="flex";
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNuber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNuber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(state.values.vidas === 0 || state.values.currenteTime <= 0){
                return;
            }
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else {
                state.values.resultErro++;
                state.values.vidas--;
                state.view.vidas.textContent = state.values.vidas;
                if(state.values.vidas <= 0){
                    state.values.currenteTime = 0;
                }
                playSound("erro");
            }
        })
    })
}

function inicializarDados(){
    state.view.vidas.textContent = state.values.vidas;
    state.view.timeLeft.textContent = state.values.currenteTime;

}

function init() {
    inicializarDados();
    addListenerHitBox();
}

init();
