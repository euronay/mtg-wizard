const Speaker = require('./speaker.js');

module.exports = class Renderer {

    static renderCard(app, card){

        var displayCard = app.buildBasicCard()
        .setTitle(card.displayName)
        .setSubtitle(card.setAndRarity)
        .setImageDisplay('WHITE')
        .addButton("View on Scryfall", card.data.scryfall_uri)
        .setBodyText(
            `**${card.manaCostAndType}**\n  \n` + 
            `${card.bodyText}\n  \n` + 
            `*USD: ${card.prices.usd} / EUR ${card.prices.eur}*`
        )
        .setImage(card.image, card.name);

        var response = app.buildRichResponse()
        .addSimpleResponse({speech: `I found ${card.name} from ${card.setName}. ${Speaker.speak(card)}. Can I help with anything else?`,
            displayText: `I found ${card.name} from ${card.setName}. Can I help with anything else?`})
        .addBasicCard(displayCard);
        return response;
    }

    static renderListItem(app, card, showSet){
        var listItem = app.buildOptionItem(card.id,
        [card.name])
        .setTitle(card.name)
        .setDescription(`${card.setAndRarity}  \n${card.manaCostAndType}`)
        .setImage(card.thumbnail, card.name);

        if(showSet)
            listItem.setTitle(`${card.name} (${card.set})`);

        return listItem;
    }
}