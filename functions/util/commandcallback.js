const Api = require('mtg-wizard-core');
const Renderer = require('./renderer.js');

module.exports = class CommandCallback {

    constructor(app){
        this.app = app;
    }

    async searchForACard(query) {
        console.log(`Searching for card: ${query}`);

        try{
            var cards = await Api.searchCards(query)

            if(cards.length === 1){
                console.log(`Saving card to context '${cards[0].name}'`);
                this.app.data.card = cards[0];
                this.app.ask(Renderer.renderCard(this.app, cards[0]));
            }
            else {
                console.log(`Clearing context`);
                this.app.data.card = null;
                var list = this.app.buildList("Results");
                
                var cardsCount = 0;
                var cardsToSpeak = "\n";

                cards.forEach(card => {
                    cardsCount ++;
                    list.addItems(Renderer.renderListItem(this.app, card));  
                    cardsToSpeak += `${card.name} from ${card.setName},\n`;  
                });

                if(cardsCount <= 5){
                    this.app.askWithList({speech: `I found ${cardsToSpeak}. Which one are you interested in?`,
                        displayText: "Which card are you interested in?"
                    }, list);
                } else {
                    this.app.askWithList({speech: `I found ${cardsCount} cards. Which card are you interested in?`,
                        displayText: `I found ${cardsCount} cards. Which card are you interested in?`
                    }, list);
                }
            }
        }
        catch(error) {
            if(error.code === 'not_found'){
                this.app.ask("Sorry, I couldn't find any cards that match that name. Find another?");
            }
            else{
                console.log(error);
                this.app.tell("Sorry an error occurred");
            }
        }

    }

    async getCard(cardId) {
        console.log(`Getting card: ${cardId}`);
        try {
            var card = await Api.getCard(cardId);
            this.app.data.card = card;
            this.app.ask(Renderer.renderCard(this.app, card));
            return;
        }
        catch(error){
            console.error(error);
            this.app.tell("Sorry, I encountered an error. Please try later.");
            return;
        }
    }

    async findReprints(card) {
        console.log(`Finding reprints: ${card.name}`);

        try{
            var reprints = await Api.findPrints(this.app.data.card);

            var list = this.app.buildList("Results");
            
            if(reprints.length === 1){
                this.app.ask(`The only printing of ${this.app.data.card.name} is in ${this.app.data.card.setName}. Find another card?`);
            }
            else {
                reprints.forEach(card => {
                    list.addItems(Renderer.renderListItem(this.app, card, true));    
                });

                this.app.askWithList(`I found these reprints of ${this.app.data.card.name}. Which one are you interested in?`, list);
                this.app.data.card = null;
            }               
        }
        catch(error){
            console.log(error);
            this.app.tell("Sorry an error occurred");
        }
    }

    flip(card){
        console.log(`Flip: ${card.name}`);

        card.flip();
        this.app.ask(Renderer.renderCard(this.app, card));
    }

    askResponse(text, suggestions) {
        console.log(`Ask response: ${text}`);
        if (suggestions) {
            console.log(`With suggestions: ${suggestions}`);

            let talk = this.app.buildRichResponse()
            .addSimpleResponse(text)
            .addSuggestions(suggestions);

            this.app.ask(talk);
        } else{
            this.app.ask(text);
        }
    }

    tellResponse(text) {
        console.log(`Tell response: ${text}`);
        this.app.tell(text);
    }

}