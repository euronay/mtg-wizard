const Card = require('./card.js');

module.exports = class DualCard extends Card {

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
                "index" : 0,
                "name" : cardData.card_faces[0].name,
                "mana_cost" : cardData.card_faces[0].mana_cost,
                "type_line" :cardData.card_faces[0].type_line,
                "oracle_text" :cardData.card_faces[0].oracle_text,
                "image" :cardData.card_faces[0].image_uris.large,
                "thumbnail" :cardData.card_faces[0].image_uris.small,
                "loyalty": cardData.card_faces[0].loyalty || null,
                "power": cardData.card_faces[0].power || null,
                "toughness": cardData.card_faces[0].toughness || null
            }

            this.face2 = {
                "index" : 1,
                "name" : cardData.card_faces[1].name,
                "mana_cost" : cardData.card_faces[1].mana_cost,
                "type_line" :cardData.card_faces[1].type_line,
                "oracle_text" :cardData.card_faces[1].oracle_text,
                "image" :cardData.card_faces[1].image_uris.large,
                "thumbnail" :cardData.card_faces[1].image_uris.small,
                "loyalty": cardData.card_faces[1].loyalty || null,
                "power": cardData.card_faces[1].power || null,
                "toughness": cardData.card_faces[1].toughness || null
            }

            this.currentFace = this.face1;

            this.usd = cardData.prices.usd;
            this.usd_foil = cardData.prices.usd_foil;
            this.eur = cardData.prices.eur;
            
            this.reprint = cardData.reprint;
            this.prints_uri = cardData.prints_search_uri;
            this.scryfall_uri = cardData.scryfall_uri;
        }
        catch(ex){
            console.error(ex);
        }
    }

    flip(){
        if(this.currentFace.index === 0){
            console.log("flipping to face 2");
            this.currentFace = this.face2;
        }
        else {
            console.log("flipping to face 1");
            this.currentFace = this.face1;
        }
    }

    getBodyText(){
        // TODO maximum of 8 lines before we run out of room
        return this.currentFace.oracle_text.replace(/\n/g, '\n  \n');
    }

    getManaCostAndType(){
        var output = '';

        if (this.currentFace.mana_cost){
            output += `${this.currentFace.mana_cost} `
        }

        output += this.currentFace.type_line;

        if(this.currentFace.loyalty){
            output += ` ${this.currentFace.loyalty}`
        } 
        else if(this.currentFace.power){
            output += ` ${this.currentFace.power}/${this.currentFace.toughness}`
        }

        return output;
    }

    getImage(){
        return this.currentFace.image;
    }

    getThumbnail(){
        return this.currentFace.thumbnail;
    }

    getDisplayName(){
        return this.currentFace.name;
    }

}