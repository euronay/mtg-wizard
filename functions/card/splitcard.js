var Card = require('./card.js');

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
            this.rarity = cardData.rarity.substring(0, 1).toUpperCase() + cardData.rarity.substring(1);

            this.face1 = {
                "name" : cardData.card_faces[0].name,
                "mana_cost" : cardData.card_faces[0].mana_cost,
                "type_line" :cardData.card_faces[0].type_line,
                "oracle_text" :cardData.card_faces[0].oracle_text
            }

            this.face2 = {
                "name" : cardData.card_faces[1].name,
                "mana_cost" : cardData.card_faces[1].mana_cost,
                "type_line" :cardData.card_faces[1].type_line,
                "oracle_text" :cardData.card_faces[1].oracle_text
            }

            this.usd = cardData.prices.usd;
            this.usd_foil = cardData.prices.usd_foil;
            this.eur = cardData.prices.eur;
            
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
        return `**${this.face1.name}**\n  \n${this.face1.oracle_text.replace(/\n/g, '\n  \n')}\n  \n  \n` + 
               `**${this.face2.name}**\n  \n${this.face2.oracle_text.replace(/\n/g, '\n  \n')}`;
    }

    getManaCostAndType(){
        return `${this.face1.mana_cost} ${this.face1.type_line} // ${this.face2.mana_cost} ${this.face1.type_line}`;
    }

}