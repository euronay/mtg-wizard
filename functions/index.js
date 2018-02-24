const functions = require('firebase-functions');
var ActionsSdkApp = require('actions-on-google').ActionsSdkApp;


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.mtgFriend = functions.https.onRequest((request, response) => {
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
       app.ask("Hi, what card are you interested in?");
    }

    function handleTextIntent() {
        console.log(`textIntent - ${getDebugInfo()} - at: ${new Date()}`);
        
        var cardRequested = app.getRawInput();

        httpRequest('https://api.scryfall.com/cards/search?q=' + cardRequested.replace(' ', '%20'), 
            function (error, response, body){


                var apiResponse = JSON.parse(body); 
                if (apiResponse.object === "error")
                {
                    app.ask("Sorry, I couldn't find any cards that match that name. Find another?");
                }
                else
                {
                    var card = apiResponse.data[0];
                    app.data = card;
                    app.ask(app.buildRichResponse()
                        .addSimpleResponse(`Found ${card.name} from ${card.set_name}`)
                        .addBasicCard(app.buildBasicCard()
                            .setTitle(card.name)
                            .setSubtitle(card.set_name)
                            .setBodyText(`USD: ${card.usd}<br />EUR: ${card.eur}`)
                            .setImage(card.image_uris.normal, card.name)
                        )
                    );
                }

            });


        console.log(`done textIntent - ${getDebugInfo()}`);
    }

    // finally: create map and handle request
    // map all intents to specific functions
    let actionMap = new Map();
    actionMap.set(app.StandardIntents.MAIN, handleMainIntent);

    actionMap.set(app.StandardIntents.TEXT, handleTextIntent);

    
    // apply this map and let the sdk parse and handle the request
    // and your responses
    app.handleRequest(actionMap);

});