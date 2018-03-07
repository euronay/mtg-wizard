var Card = require('./card2.js');

module.exports = class SplitCard extends Card {

    constructor(cardData){
        super(cardData);
    }

    initialise(cardData){
        try{
            this.id = cardData.id
            this.name = cardData.name;
            this.set = cardData.set.toUpperCase();
            this.set_name = cardData.set_name;
            this.layout = cardData.layout;
            this.rarity = cardData.rarity.substring(0, 1).toUpperCase();
            this.mana_cost = cardData.mana_cost;
            this.type_line = cardData.type_line;

            this.usd = cardData.usd;
            this.eur = cardData.eur;
            this.image = cardData.image_uris.large;
            this.thumbnail = cardData.image_uris.small;
            this.reprint = cardData.reprint;
            this.prints_uri = cardData.prints_search_uri;
            this.scryfall_uri = cardData.scryfall_uri;
        }
        catch(ex){
            console.error(ex);
        }
    }

    getBodyText(){
        // TODO maximum of 8 lines before we run out of room
        return 'TODO Split Card';
    }

}