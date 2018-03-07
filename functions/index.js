const functions = require('firebase-functions');
var ActionsSdkApp = require('actions-on-google').ActionsSdkApp;
var Api = require('./api/api.js');
var Card = require('./card2.js');
var SplitCard = require('./splitcard.js');


exports.scrybot = functions.https.onRequest((request, response) => {
    let app = new ActionsSdkApp({request, response});
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
           //TODO
           //findCard(triggerQuery.substring(5));
       }
       else
       {
           app.ask("Hi! Name a card and I'll try and find it.");
       }

       console.log(`done mainIntent - ${getDebugInfo()}`);
    }

    function handleTextIntent() {
        console.log(`textIntent - ${getDebugInfo()} - at: ${new Date()}`);
        
        var command = app.getRawInput().toLowerCase();

        if((command === "reprints" || command === "prints") && app.data.card){
            Api.findPrints(app.data.card)
            .then(reprints => {
                var list = app.buildList("Results");
                
                if(reprints.length === 1){
                    app.ask(`The only printing of ${app.data.card.name} is in ${app.data.card.set_name}. Find another card?`);
                }
                else {
                    reprints.forEach(card => {
                        list.addItems(renderListItem(card, true));    
                    });
    
                    app.askWithList(`I found these reprints of ${app.data.card.name}.`, list);
                    app.data.card = null;
                }               
            })
            .catch(error => {
                console.log(error);
                app.tell("Sorry an error occurred");
            });
        }
        else if(command === "bye" || command === "thanks"){
            app.tell('Thanks for using Scrybot!');
        }
        else
        {
            Api.searchCards(command)
            .then(cards => {
                if(cards.length === 1){
                    app.data.card = cards[0];
                    app.ask(renderCard(cards[0]));
                }
                else {
                    app.data.card = null;
                    var list = app.buildList("Results");
                    
                    cards.forEach(card => {
                        list.addItems(renderListItem(card));    
                    });

                    app.askWithList("I found a few cards. Which one are you interested in?", list);
                }
            })
            .catch(error => {
                if(error.code === 'not_found'){
                    app.ask("Sorry, I couldn't find any cards that match that name. Find another?");
                }
                else{
                    console.log(error);
                    app.tell("Sorry an error occurred");
                }
            });
        }

        console.log(`done textIntent - ${getDebugInfo()}`);
    }


    function handleOptionIntent() {
        console.log(`optionIntent - ${getDebugInfo()} - at: ${new Date()}`);
        
        var cardId = app.getSelectedOption();
        console.log(`Getting card id ${cardId}`);

        Api.getCard(cardId)
        .then(card => {
            app.data.card = card;
            app.ask(renderCard(card));
        })
        .catch(error => {
            console.log(error);
            app.tell("Sorry an error occurred");
        });

        console.log(`done optionIntent - ${getDebugInfo()}`);
    }

    function renderCard(card){

        var displayCard = app.buildBasicCard()
        .setTitle(card.name)
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
        .addSimpleResponse(`Found ${card.name} from ${card.set_name}`)
        .addBasicCard(displayCard);
        return response;
    }

    function renderListItem(card, showSet){
        var listItem = app.buildOptionItem(card.id,
        [card.name])
        .setTitle(card.name)
        .setDescription(`${card.getSetAndRarity()}  \n  \n${card.getManaCostAndType()}`)
        .setImage(card.getThumbnail(), card.name);

        if(showSet)
            listItem.setTitle(`${card.name} (${card.set})`);

        return listItem;
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