const functions = require('firebase-functions');
var ActionsSdkApp = require('actions-on-google').ActionsSdkApp;
var CommandParser = require('./util/commandparser.js.js');
var CommandCallback = require('./util/commandcallback.js.js');

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
            CommandParser.parse(triggerQuery.substring(5), app.data, new CommandCallback(app));
       }
       else
       {
            CommandParser.parse('welcome', app.data, new CommandCallback(app));
            app.data.saidHello = true;
       }

       console.log(`done mainIntent - ${getDebugInfo()}`);
    }

    function handleTextIntent() {
        console.log(`textIntent - ${getDebugInfo()} - at: ${new Date()}`);
        
        var command = app.getRawInput().toLowerCase();

        CommandParser.parse(command, app.data, new CommandCallback(app));

        console.log(`done textIntent - ${getDebugInfo()}`);
    }


    function handleOptionIntent() {
        console.log(`optionIntent - ${getDebugInfo()} - at: ${new Date()}`);
        
        var cardId = app.getSelectedOption();
        console.log(`Getting card id ${cardId}`);

        new CommandCallback(app).getCard(cardId);

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

