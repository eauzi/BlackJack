class Card {
    color;
    nb;
    path;

    values = { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "A": 11, "J": 10, "K": 10, "Q": 10 };

    constructor(color, nb) {
        this.color = color;
        this.nb = nb;
        this.path = 'Flat-Playing-Cards-Set/' + this.color + '/' + this.nb + '.png';
    }

    value() {
        return this.values[this.nb];
    }
}