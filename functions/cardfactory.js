var Card = require('./card2.js');
var SplitCard = require('./splitcard.js');

module.exports = class CardFactory{

    static createCard(cardData){
        switch(cardData.layout){
            case "normal":
                console.log(`Returning normal card ${cardData.name}`);
                return new Card(cardData);
            case "split":
                console.log(`Returning split card ${cardData.name}`);
                return new SplitCard(cardData);
            default:
                throw new Error(`Card type ${cardData.layout} is not supported`);
        }
    }

}