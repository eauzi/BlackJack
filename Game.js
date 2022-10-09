class Game {
    deck = new Deck();
    hiddenCard;
    bet = 50;
    playerWin = 0;
    bankWin = 0;

    init() {
        this.deck = new Deck();

        // Bank set
        document.getElementById("bankScore").innerHTML = 0;
        document.getElementById("hiddenCardDiv").innerHTML = "";
        document.getElementById("bankCards").innerHTML = "";
        document.getElementById("bankWin").innerHTML = this.bankWin;
        document.getElementById("bet").innerHTML = this.bet;

        // Player set
        document.getElementById("score").innerHTML = "0";
        document.getElementById("myCards").innerHTML = "";
        document.getElementById("playerWin").innerHTML = this.playerWin;

        // Button 
        document.getElementById("startButton").disabled = false;
        document.getElementById("restartButton").disabled = true;
        document.getElementById("addCardButton").disabled = true;
        document.getElementById("doubleBetButton").disabled = true;
        document.getElementById("confirmButton").disabled = true;
    }

    win() {
        this.playerWin++;
        this.bet = parseInt(document.getElementById("bet").innerHTML);
        let money = parseInt(document.getElementById("myMoney").innerHTML);
        let bankMoney = parseInt(document.getElementById("bankMoney").innerHTML);

        document.getElementById("myMoney").innerHTML = money + this.bet;
        document.getElementById("bankMoney").innerHTML = bankMoney - this.bet;
        this.init();
    }

    loose() {
        this.bankWin++;
        this.bet = parseInt(document.getElementById("bet").innerHTML);
        let money = parseInt(document.getElementById("myMoney").innerHTML);
        let bankMoney = parseInt(document.getElementById("bankMoney").innerHTML);

        document.getElementById("bankMoney").innerHTML = bankMoney + this.bet;
        document.getElementById("myMoney").innerHTML = money - this.bet;
        swal("PERDU", "", "error");
        setTimeout(game.init.bind(game), 1500);
    }

    checkBlackJack(score){
        return (score === 21);
    }

    addCard() {
        let nextCard = this.deck.draw();
        console.log("Carte : " + nextCard.nb + " - " + nextCard.color);
        let cards = document.getElementById("myCards");
        cards.innerHTML += '<img class="card ' + nextCard.color + '" src="' + nextCard.path + '">';

        let score = parseInt(document.getElementById("score").innerHTML);
        score += nextCard.value();
        document.getElementById("score").innerHTML = score;
        if (score > 21) {
            this.loose();
        }
    }

    checkBet() {
        let money = parseInt(document.getElementById("myMoney").innerHTML);
        let bankMoney = parseInt(document.getElementById("bankMoney").innerHTML);

        if (this.bet > money || this.bet > bankMoney) {
            swal("", "Mise impossible, un des joueurs n'a pas assez !", "error", {button: "Rejouer !"});
            document.getElementById("myMoney").innerHTML = 500;
            document.getElementById("bankMoney").innerHTML = 500;
            this.bet = 50;
            this.playerWin = 0;
            this.bankWin = 0;
            this.init();
            return 1;
        }
        return 0;
    }

    doubleBet() {
        this.bet = this.bet * 2;
        if (this.checkBet() === 0) {
            document.getElementById("bet").innerHTML = this.bet;
            setTimeout(game.addCard.bind(game), 1500);
        }
    }

    update() {
        let scoreBank = document.getElementById("bankScore").innerHTML;
        let playerScore = document.getElementById("score").innerHTML;
        if (scoreBank >= playerScore && scoreBank <= 21) {
            this.loose();
        } else {
            this.win();
            swal("Bien joué!", "C'est gagné !", "success");
        }
    }

    confirm() {
        let scoreBank = parseInt(document.getElementById("bankScore").innerHTML);
        scoreBank += this.hiddenCard.value();
        document.getElementById("bankScore").innerHTML = scoreBank;
        if(this.checkBlackJack()){
            swal("BLACKJACK de la banque", "Vous avez perdu ! ", "error");
            setTimeout(this.game.loose.bind(game), 1000);
        }
        let hiddenCardDiv = document.getElementById("hiddenCardDiv");
        hiddenCardDiv.innerHTML = '<img class="card ' + this.hiddenCard.color + '" src="' + this.hiddenCard.path + '">';
        while (scoreBank < 16) {
            let nextCard = this.deck.draw();
            let bankCards = document.getElementById("bankCards").innerHTML += '<img class="card ' + nextCard.color + '" src="' + nextCard.path + '">';
            scoreBank += nextCard.value();
            document.getElementById("bankScore").innerHTML = scoreBank;
        }
        
        setTimeout(game.update.bind(game), 1500);
    }

}