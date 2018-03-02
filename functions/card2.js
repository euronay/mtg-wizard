module.exports = class Card {


    constructor(cardData){
        this.data = cardData;
    }

    getName(){
        return this.data.name;
    }

    getSetAndRarity(){
        return `${this.data.set_name} <${this.data.rarity}>`;
    }

    getManaCostAndType(){
        return `${this.data.mana_cost}  ${this.data.type_line}`;
    }

    getBodyText(){
        // TODO maximum of 8 lines before we run out of room
        return this.data.oracle_text.replace(/\n/g, '\n  \n');
    }

    getPrices(){
        return `USD: ${this.data.usd} / EUR: ${this.data.eur}`;
    }

    getImage(size) {
        return this.data.image_uris[size];
    }

}
