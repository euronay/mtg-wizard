const Speaker = require('./speaker.js');

module.exports = class Renderer {

    static renderCard(app, card){

        var displayCard = app.buildBasicCard()
        .setTitle(card.getDisplayName())
        .setSubtitle(card.getSetAndRarity())
        .setImageDisplay('WHITE')
        .addButton("View on Scryfall", card.scryfall_uri)
        .setBodyText(
            `**${card.getManaCostAndType()}**\n  \n` + 
            `${card.getBodyText()}\n  \n` + 
            `*${card.getPrices()}*`
        )
        .setImage(card.getImage(), card.name);

        var response = app.buildRichResponse()
        .addSimpleResponse({speech: `I found ${card.name} from ${card.set_name}. ${Speaker.speak(card)}. Can I help with anything else?`,
            displayText: `I found ${card.name} from ${card.set_name}. Can I help with anything else?`})
        .addBasicCard(displayCard);
        return response;
    }

    static renderListItem(app, card, showSet){
        var listItem = app.buildOptionItem(card.id,
        [card.name])
        .setTitle(card.name)
        .setDescription(`${card.getSetAndRarity()}  \n${card.getManaCostAndType()}`)
        .setImage(card.getThumbnail(), card.name);

        if(showSet)
            listItem.setTitle(`${card.name} (${card.set})`);

        return listItem;
    }
}