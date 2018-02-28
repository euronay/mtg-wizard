const functions = require('firebase-functions');
var ActionsSdkApp = require('actions-on-google').ActionsSdkApp;
var Card = require('./card.js');


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
                    var card = new Card(apiResponse.data[0]);
                    app.ask(card.renderAsCard(app));
                }
                else
                {
                    var list = app.buildList("Results");
                    
                    apiResponse.data.forEach(element => {
                        var card = new Card(element);
                        list.addItems(card.renderAsListItem(app));    
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
                    var card = new Card(apiResponse);
                    app.ask(card.renderAsCard(app));
                }
            });

        console.log(`done optionIntent - ${getDebugInfo()}`);
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