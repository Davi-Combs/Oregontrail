export default class UI {
    constructor() {
        this.stats = {
            distance: document.getElementById('distance'),
            crew: document.getElementById('crew'),
            oxen: document.getElementById('oxen'),
            food: document.getElementById('food'),
            money: document.getElementById('money'),
        };
        this.messages = document.getElementById('messages');
        
        this.modal = document.getElementById('event-modal');
        this.modalTitle = document.getElementById('event-title');
        this.modalText = document.getElementById('event-text');
        this.modalOptions = document.getElementById('event-options');
    }

    updateStats(caravan) {
        this.stats.crew.textContent = caravan.crew;
        this.stats.oxen.textContent = caravan.oxen;
        this.stats.food.textContent = Math.ceil(caravan.food);
        this.stats.money.textContent = caravan.money;
    }

    updateDistance(distance, goal) {
         this.stats.distance.textContent = Math.min(Math.floor(distance), goal);
    }
    
    showMessage(message) {
        this.messages.textContent = message;
    }
    
    showModal(text, options) {
        this.modalText.textContent = text;
        this.modalOptions.innerHTML = ''; // Clear previous options
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('event-btn');
            button.textContent = option.text;
            button.addEventListener('click', option.action);
            this.modalOptions.appendChild(button);
        });
        
        this.modal.classList.remove('hidden');
    }
    
    updateModalText(text) {
        this.modalText.textContent = text;
    }

    hideModal() {
        this.modal.classList.add('hidden');
    }
}

