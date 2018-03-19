var Api = require('../api/api.js');
var DualCard = require('../card/dualcard.js');
var Renderer = require('./renderer.js');

module.exports = class CommandCallback {

    constructor(app){
        this.app = app;
    }

    searchForACard(query) {
        console.log(`Searching for card: ${query}`);

        Api.searchCards(query)
        .then(cards => {
            if(cards.length === 1){
                this.app.data.card = cards[0];
                this.app.ask(Renderer.renderCard(this.app, cards[0]));
            }
            else {
                this.app.data.card = null;
                var list = this.app.buildList("Results");
                
                cards.forEach(card => {
                    list.addItems(Renderer.renderListItem(this.app, card));    
                });

                this.app.askWithList("I found a few cards. Which one are you interested in?", list);
            }
        })
        .catch(error => {
            if(error.code === 'not_found'){
                this.app.ask("Sorry, I couldn't find any cards that match that name. Find another?");
            }
            else{
                console.log(error);
                this.app.tell("Sorry an error occurred");
            }
        });

    }

    getCard(cardId) {
        console.log(`Getting card: ${cardId}`);
        Api.getCard(cardId).then(card => {
            this.app.data.card = card;
            this.app.ask(Renderer.renderCard(this.app, card));
            return;
        })
        .catch(error => {
            console.error(error);
            this.app.tell("Sorry, I encountered an error. Please try later.");
            return;
        });
    }

    findPrints(card) {
        console.log(`Finding reprints: ${card.name}`);

        Api.findPrints(this.app.data.card)
        .then(reprints => {
            var list = this.app.buildList("Results");
            
            if(reprints.length === 1){
                this.app.ask(`The only printing of ${this.app.data.card.name} is in ${this.app.data.card.set_name}. Find another card?`);
            }
            else {
                reprints.forEach(card => {
                    list.addItems(Renderer.renderListItem(this.app, card, true));    
                });

                this.app.askWithList(`I found these reprints of ${this.app.data.card.name}. Which one are you interested in?`, list);
                this.app.data.card = null;
            }               
        })
        .catch(error => {
            console.log(error);
            this.app.tell("Sorry an error occurred");
        });
    }

    flip(card){
        console.log(`Flip: ${card.name}`);

        var dualCard = new DualCard();
        Object.assign(dualCard, card);
        dualCard.flip();
        this.app.data.card = dualCard;
        this.app.ask(Renderer.renderCard(this.app, dualCard));
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