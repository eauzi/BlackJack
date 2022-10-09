class Deck {
    cards = [];

    constructor() {
        for (let i = 2; i <= 10; i++) {
            this.cards.push(new Card("Spades", i.toString()));
            this.cards.push(new Card("Clubs", i.toString()));
            this.cards.push(new Card("Diamonds", i.toString()));
            this.cards.push(new Card("Hearts", i.toString()));
        }
        ["A", "J", "K", "Q"].forEach(fig => this.addFigures(fig));
    }

    addFigures(fig) {
        this.cards.push(new Card("Spades", fig));
        this.cards.push(new Card("Clubs", fig));
        this.cards.push(new Card("Diamonds", fig));
        this.cards.push(new Card("Hearts", fig));
    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    draw() {
        this.shuffle(this.cards);
        let card = this.cards.shift();
        return card;
    }
}