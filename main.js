import Caravan from './Caravan.js';
import UI from './UI.js';
import { EVENTS } from './Events.js';

class Game {
    constructor() {
        this.caravan = new Caravan({
            crew: 5,
            food: 200,
            oxen: 2,
            money: 500
        });
        this.ui = new UI();
        this.distanceGoal = 1000;
        this.day = 0;
        
        this.travelBtn = document.getElementById('travel-btn');
        this.travelBtn.addEventListener('click', () => this.travel());

        this.updateDisplay();
    }

    updateDisplay() {
        this.ui.updateStats(this.caravan);
        this.ui.updateDistance(this.caravan.distance, this.distanceGoal);
    }

    travel() {
        // Each travel action is one "turn" or "day"
        this.day++;
        
        // Advance distance
        const travelSpeed = 5 + this.caravan.oxen * 2; // km per day
        this.caravan.distance += travelSpeed;

        // Consume food
        this.caravan.consumeFood();

        this.updateDisplay();

        // Check for game over or win conditions
        if (this.checkGameOver() || this.checkWin()) {
            return;
        }

        // Trigger a random event
        if (Math.random() < 0.3) { // 30% chance of an event each day
            this.triggerRandomEvent();
        } else {
            this.ui.showMessage(`Day ${this.day}: You traveled ${travelSpeed}km. The trail is quiet.`);
        }
    }

    triggerRandomEvent() {
        const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
        this.travelBtn.disabled = true;

        if (event.type === 'STAT-CHANGE') {
            this.handleStatChangeEvent(event);
        } else if (event.type === 'SHOP') {
            if(this.caravan.money < 20) {
                this.ui.showMessage(`Day ${this.day}: You see a trader, but you are too poor to shop.`);
                this.travelBtn.disabled = false;
                return;
            }
            this.handleShopEvent(event);
        } else if (event.type === 'ATTACK') {
             this.handleAttackEvent(event);
        }
    }
    
    handleStatChangeEvent(event) {
        this.caravan.food += event.food || 0;
        this.caravan.oxen += event.oxen || 0;
        this.caravan.money += event.money || 0;
        this.caravan.crew += event.crew || 0;

        this.ui.showMessage(`Day ${this.day}: ${event.notification}`);
        this.updateDisplay();
        this.travelBtn.disabled = false;
        this.checkGameOver();
    }
    
    handleShopEvent(event) {
        const items = [
            { id: 'food', name: 'Food (20kg)', cost: 20 },
            { id: 'oxen', name: 'Ox', cost: 100 }
        ];

        const options = items.map(item => ({
            text: `Buy ${item.name} for $${item.cost}`,
            action: () => {
                if (this.caravan.money >= item.cost) {
                    this.caravan.money -= item.cost;
                    if (item.id === 'food') this.caravan.food += 20;
                    if (item.id === 'oxen') this.caravan.oxen += 1;
                    this.ui.showMessage(`You bought ${item.name.split(' ')[0]}.`);
                    this.updateDisplay();
                    this.ui.hideModal();
                    this.travelBtn.disabled = false;
                } else {
                    const tempText = document.getElementById('event-text').innerText;
                    this.ui.updateModalText("Not enough money!");
                    setTimeout(() => this.ui.updateModalText(tempText), 1000);
                }
            }
        }));
        
        options.push({
            text: 'Leave the shop',
            action: () => {
                this.ui.showMessage('You decided not to buy anything.');
                this.ui.hideModal();
                this.travelBtn.disabled = false;
            }
        });

        this.ui.showModal(event.notification, options);
    }

    handleAttackEvent(event) {
        const options = [
            {
                text: 'Fight!',
                action: () => {
                    const fightSuccess = Math.random() * this.caravan.crew > 2; // Better chance with more crew
                    if (fightSuccess) {
                        this.caravan.money += event.reward.money || 0;
                        this.ui.showMessage('You successfully fought them off and found some valuables!');
                    } else {
                        const crewLost = -1;
                        this.caravan.crew += crewLost;
                        this.caravan.money += event.penalty.money || 0;
                        this.ui.showMessage('You tried to fight but were overpowered. You lost 1 crew member and some money.');
                    }
                    this.ui.hideModal();
                    this.travelBtn.disabled = false;
                    this.updateDisplay();
                    this.checkGameOver();
                }
            },
            {
                text: 'Flee!',
                action: () => {
                    this.caravan.food = Math.max(0, this.caravan.food - 50);
                    this.ui.showMessage('You fled, but dropped 50kg of food in the panic.');
                    this.ui.hideModal();
                    this.travelBtn.disabled = false;
                    this.updateDisplay();
                    this.checkGameOver();
                }
            }
        ];
        this.ui.showModal(event.notification, options);
    }


    checkGameOver() {
        if (this.caravan.food <= 0) {
            this.ui.showMessage('Game Over: You ran out of food.');
            this.travelBtn.disabled = true;
            return true;
        }
        if (this.caravan.crew <= 0) {
            this.ui.showMessage('Game Over: Your entire crew has perished.');
            this.travelBtn.disabled = true;
            return true;
        }
        return false;
    }

    checkWin() {
        if (this.caravan.distance >= this.distanceGoal) {
            this.caravan.distance = this.distanceGoal;
            this.updateDisplay();
            this.ui.showMessage('Congratulations! You have reached Oregon!');
            this.travelBtn.disabled = true;
            return true;
        }
        return false;
    }
}

window.onload = () => new Game();

