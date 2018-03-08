var Card = require('./card.js');
var SplitCard = require('./splitcard.js');
var DualCard = require('./dualcard.js');

module.exports = class CardFactory{

    static createCard(cardData){
        switch(cardData.layout){
            case "normal":
                console.log(`Returning normal card ${cardData.name}`);
                return new Card(cardData);
            case "split":
                console.log(`Returning split card ${cardData.name}`);
                return new SplitCard(cardData);
            case "transform":
                console.log(`Returning transform card ${cardData.name}`);
                return new DualCard(cardData);
            default:
                throw new Error(`Card type ${cardData.layout} is not supported`);
        }
    }

}