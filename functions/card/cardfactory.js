var Card = require('./card.js');
var SplitCard = require('./splitcard.js');
var DualCard = require('./dualcard.js');

module.exports = class CardFactory{

    static createCard(cardData){
        switch(cardData.layout){
            case "normal":
            case "meld": // meh, meld is clsoe enough to a normal card - TODO, command to find corresponding card
            case "leveler": 
                console.log(`Returning normal card ${cardData.name} (${cardData.set})`);
                return new Card(cardData);
            case "split":
            case "flip":
                console.log(`Returning split card ${cardData.name} (${cardData.set})`);
                return new SplitCard(cardData);
            case "transform":
                console.log(`Returning transform card ${cardData.name} (${cardData.set})`);
                return new DualCard(cardData);
            default:
                console.log(`ERROR Card type ${cardData.layout} is not supported`);
                return undefined;
        }
    }

}