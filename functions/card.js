module.exports = class Card {

    constructor(cardData){
        this.data = cardData;
    }

    //TODO, this method is super messy - tidy it up
    renderAsCard(app){

        var card = app.buildBasicCard()
        .setTitle(this.data.name)
        .setSubtitle(`${this.data.set_name}`)
        .setImageDisplay('WHITE')
        .addButton("View on Scryfall", this.data.scryfall_uri);

        switch(this.data.layout)
        {
            case("normal"): 
            card.setBodyText(
                `**${this.data.mana_cost}  ${this.data.type_line}**\n  \n` + 
                `${this.data.oracle_text.replace('\n', '\n  \n')}\n  \n` + 
                `*USD: ${this.data.usd} / EUR: ${this.data.eur}*`
            );
                card.setImage(this.data.image_uris.large, this.data.name);
                break;
            case("split"): 
                card.setBodyText(
                    `**${this.getCardFace(0).mana_cost}  ${this.getCardFace(0).type_line}**\n  \n` + 
                    `${this.getCardFace(0).oracle_text.replace('\n', '\n  \n')}\n  \n` + 
                    `**${this.getCardFace(1).mana_cost}  ${this.getCardFace(1).type_line}**\n  \n` + 
                    `${this.getCardFace(1).oracle_text.replace('\n', '\n  \n')}\n  \n` + 
                    `*USD: ${this.data.usd} / EUR: ${this.data.eur}*`
                );
                card.setImage(this.data.image_uris.large, this.data.name);
                break;
            case("transform"):
            card.setBodyText(
                `**${this.getCardFace(0).mana_cost}  ${this.getCardFace(0).type_line}**\n  \n` + 
                `${this.getCardFace(0).oracle_text.replace('\n', '\n  \n')}\n  \n` + 
                `*USD: ${this.data.usd} / EUR: ${this.data.eur}*`
            );
                card.setImage(this.getImages(0).large, this.data.name);
                break;

        }
        var response = app.buildRichResponse()
        .addSimpleResponse(`Found ${this.data.name} from ${this.data.set_name}`)
        .addBasicCard(card);
        return response;
    }

    renderAsListItem(app){
        var cardFace = this.getCardFace(0);

        var listItem = app.buildOptionItem(this.data.id,
        [this.data.name])
        .setTitle(this.data.name)
        .setDescription(`${cardFace.type_line}\n  \n${cardFace.mana_cost.replace('/[{}]/g', '')}`)
        .setImage(this.getImages().small, this.data.name);

        return listItem;
    }

    // DFC support
    getCardFace(face) {
        if (!face) { face = 0 }
        if(this.data.layout === "transform" || this.data.layout === "split"){
            return this.data.card_faces[face]
        }
        else {
            return this.data;
        }
    }

    getImages(face) {
        if (!face) { face = 0 }
        if(this.data.layout === "transform"){
            return this.data.card_faces[face].image_uris
        }
        else {
            return this.data.image_uris;
        }
    }

}
