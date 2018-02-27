const functions = require('firebase-functions');
var ActionsSdkApp = require('actions-on-google').ActionsSdkApp;


exports.scrybot = functions.https.onRequest((request, response) => {
    let app = new ActionsSdkApp({request, response});
    let httpRequest = require('request');
    const screenAvailable = app.hasAvailableSurfaceCapabilities(app.SurfaceCapabilities.SCREEN_OUTPUT);
    

    function getDebugInfo() {
        // you can get some userId - but for getting the name, you would
        // need the appropriate permission.
        // be very careful what you use in production here;
        // logging too much can cause privacy issues
        return `user: ${app.getUser().userId} - conversation: ${app.getConversationId()}`;
    }

    function handleMainIntent() {
       console.log(`starting mainIntent - ${getDebugInfo()} - at: ${new Date()}`);

       var triggerQuery = app.getArgument("trigger_query");
       if(triggerQuery && triggerQuery.indexOf("find ") === 0)
       {
           findCard(triggerQuery.substring(5));
       }
       else
       {
           app.ask("Hi! Name a card and I'll try and find it.");
       }

       console.log(`done mainIntent - ${getDebugInfo()}`);
    }

    function handleTextIntent() {
        console.log(`textIntent - ${getDebugInfo()} - at: ${new Date()}`);
        
        findCard(app.getRawInput());

        console.log(`done textIntent - ${getDebugInfo()}`);
    }

    function findCard(cardRequested) {

        var url = `https://api.scryfall.com/cards/search?q=${cardRequested.replace(' ', '%20')}`;
        console.log(`Calling: ${url}`);

        httpRequest(url, 
            (error, response, body) => {


                var apiResponse = JSON.parse(body); 
                if (apiResponse.object === "error")
                {
                    app.ask("Sorry, I couldn't find any cards that match that name. Find another?");
                }
                else if (apiResponse.total_cards === 1)
                {
                    var card = apiResponse.data[0];
                    app.data = card;
                    app.ask(renderCard(card));
                }
                else
                {
                    var list = app.buildList("Results");
                    
                    apiResponse.data.forEach(element => {
                        list.addItems(renderListItem(element));    
                    });

                    app.askWithList("I found a few cards. Which one are you interested in?", list);
                }

            });

    }

    function handleOptionIntent() {
        console.log(`optionIntent - ${getDebugInfo()} - at: ${new Date()}`);
        
        var param = app.getSelectedOption();
        console.log(param);

        var url = `https://api.scryfall.com/cards/${param}`;
        console.log(`Calling: ${url}`);

        httpRequest(url, 
            (error, response, body) => {
                var apiResponse = JSON.parse(body); 
                if (apiResponse.object === "error")
                {
                    app.ask("Sorry, I couldn't find any cards that match that name. Find another?");
                }
                else (apiResponse.total_cards === 1)
                {
                    var card = apiResponse;
                    app.data = card;
                    app.ask(renderCard(card));
                }
            });

        console.log(`done optionIntent - ${getDebugInfo()}`);
    }

    function renderCard(card) {
    
        var cardFace = getCardFace(card);

        var cardResponse = app.buildRichResponse()
        .addSimpleResponse(`Found ${card.name} from ${card.set_name}`)
        .addBasicCard(app.buildBasicCard()
            .setTitle(card.name)
            .setSubtitle(card.set_name)
            .setBodyText(`${cardFace.type_line}\n  \n${cardFace.mana_cost.replace('/[{}]/g', '')}\n  \n` + 
                         `USD: ${card.usd}\n  \nEUR: ${card.eur}`)
            .setImage(cardFace.image_uris.large, card.name)
        )
        //.addSuggestions(['How much is it?', 'Show me printings', 'Is it legal in Modern?', 'Show me rulings']);

        // if(card.type_line.indexOf('Legendary Creature') > -1){
        //     cardResponse.addSuggestionLink('EDHREC', card.related_uris.edhrec);
        // }

        return cardResponse;

    }
    
    function renderListItem(card) {

        var cardFace = getCardFace(card);

        var listItem = app.buildOptionItem(card.id,
        [card.name])
        .setTitle(card.name)
        .setDescription(`${cardFace.type_line}\n  \n${cardFace.mana_cost.replace('/[{}]/g', '')}`)
        .setImage(cardFace.image_uris.small, card.name);

        return listItem;
    }


    // DFC support
    function getCardFace(card, face) {
        if(card.layout == "transform"){
            if (!face) { face = 0 }
            return card.card_faces[face]
        }
        else {
            return card;
        }
    }

    // finally: create map and handle request
    // map all intents to specific functions
    let actionMap = new Map();
    actionMap.set(app.StandardIntents.MAIN, handleMainIntent);

    actionMap.set(app.StandardIntents.TEXT, handleTextIntent);

    actionMap.set(app.StandardIntents.OPTION, handleOptionIntent);

    
    // apply this map and let the sdk parse and handle the request
    // and your responses
    app.handleRequest(actionMap);

});