export default class Caravan {
    constructor(config) {
        this.crew = config.crew || 5;
        this.food = config.food || 200; // in kg
        this.oxen = config.oxen || 2;
        this.money = config.money || 500;
        this.distance = 0; // in km
    }

    consumeFood() {
        // Each crew member consumes 1kg of food per day
        this.food -= this.crew * 1;
        if (this.food < 0) {
            this.food = 0;
        }
    }
}

