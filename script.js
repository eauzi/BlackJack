let game = new Game();

let round = 1;
document.getElementById("startButton").addEventListener("click", start);

function initializeButtons() {
    document.getElementById("startButton").disabled = true;
    document.getElementById("restartButton").disabled = false;
    document.getElementById("addCardButton").disabled = false;
    document.getElementById("doubleBetButton").disabled = false;
    document.getElementById("confirmButton").disabled = false;


    if (round === 1) {
        document.getElementById("addCardButton").addEventListener("click", function () { game.addCard() });
        document.getElementById("doubleBetButton").addEventListener("click", function () { game.doubleBet() });
        document.getElementById("restartButton").addEventListener("click", function () { game.init() });
        document.getElementById("confirmButton").addEventListener("click", function () { game.confirm() });
    }
}

function createPlayersHand() {
    for (let i = 0; i < 2; i++) { // 2 cartes pour le joueur
        let nextCard = game.deck.draw();
        let cards = document.getElementById("myCards");
        cards.innerHTML += '<img class="card ' + nextCard.color + '" src="' + nextCard.path + '">';
        let score = parseInt(document.getElementById("score").innerHTML);
        score += nextCard.value();
        document.getElementById("score").innerHTML = score;
        if(game.checkBlackJack(score)){
            swal("BLACKJACK", "Vous avez gagné ! ", "success");
            setTimeout(game.win.bind(game), 1000);
        }
    }
}

function start() {
    initializeButtons();
    round++;
    console.log(round);
    if (game.checkBet() === 0) { // Si mise possible on commence une nouvelle partie
        createPlayersHand();
        // Pour le croupier
        createBanksHand();
    }
}

function createBanksHand() {
    let nextCard = game.deck.draw();
    let bankCards = document.getElementById("bankCards");
    let hiddenCardDiv = document.getElementById("hiddenCardDiv");
    hiddenCardDiv.innerHTML = '<img class="card Clubs" src="Flat-Playing-Cards-Set/Back Covers/Pomegranate.png"></img>';
    bankCards.innerHTML += '<img class="card ' + nextCard.color + '" src="' + nextCard.path + '">';
    let scoreBank = parseInt(document.getElementById("bankScore").innerHTML);
    scoreBank += nextCard.value();
    game.hiddenCard = game.deck.draw();
    //scoreBank += game.hiddenCard.value();
    document.getElementById("bankScore").innerHTML = scoreBank;
}

