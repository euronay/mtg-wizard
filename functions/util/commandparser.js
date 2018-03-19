var Api = require('../api/api.js');

module.exports = class CommandParser {


    static parse(commandText, context, callback){
        
        commandText = commandText.toLowerCase();

        console.log(`Parsing command '${commandText}'`);
        console.log(`Card in context '${context.card ? context.card.name : "none"}'`);

        // Welcome
        var welcomeCommands = ['hi', 'hello', 'welcome']
        if(welcomeCommands.includes(commandText)){
            if(!context.saidHello){
                return callback.askResponse("Hi, I'm MTG Wizard! Name a Magic card and I'll try and find it for you");
                // TODO - returning user shorter greeting
            } else {
                // We've already said hello, show the help text
                commandText = 'help';
            }
        }

        // Help
        var helpCommands = ['help', 'what else', 'what can you do', 'what else can you do', 'what else?', 'what can you do?', 'what else can you do?']
        if(helpCommands.includes(commandText)){
            return callback.askResponse("I can find any Magic card ever printed. Just say the name or part of the name of any card and I'll look it up. Here are some suggestions to get you started",
            ['Jace, the Mind Sculptor', 'Lightning Bolt from M11']);
        }

        // FROM <Set>
        if(commandText.indexOf('from') > 0)
        {
            var lastIndex = commandText.lastIndexOf('from');
            var cardname = commandText.substr(0, lastIndex).trim();
            var possibleSetName = commandText.substr(lastIndex + 4).trim().toLowerCase();

            console.log(`Card name '${cardname}'
            Possible Set name '${possibleSetName}'`);

            return getMagicSet(possibleSetName)
            .then(set => {
                console.log(`Actual set ${set}`);
                if(set){
                    return callback.searchForACard(`${cardname} e:${set}`);
                }
                else {
                    // we couldn't find a set- just search for name
                    return callback.searchForACard(commandText);
                }
            })
            .catch(error => {throw error;});

            
        }

        // RANDOM CARD
        if(commandText === 'random'){
            return callback.getCard('random');
        }
        
        // EXIT COMMANDS
        var exitCommands = ['bye', 'goodbye', 'thanks', 'exit', 'no', 'nope', 'no thanks'];
        if(exitCommands.includes(commandText)){
            return callback.tellResponse('Thanks for using MTG Wizard!');
        }

        if(context.card)
        {
            // REPRINTS
            var printCommands = ['printings', 'reprints', 'sets'];
            if(printCommands.includes(commandText)){
                return callback.findPrints(context.card);
            }

            // FLIP
            var flipCommands = ['flip', 'transform'];
            if(context.card.layout === 'transform' && flipCommands.includes(commandText)){ //TODO meld
                return callback.flip(context.card);
            }
        }

        // TODO artists, rulings ...


        // DEFAULT SEARCH
        return callback.searchForACard(commandText);

        // should probably go in api?
        function getMagicSet(search){
            return new Promise((resolve, reject) => {
                // get sets
                Api.getSets()
                .then(sets => {
                    // search for exact set code
                    var matchingSets = sets.filter(item => {
                        return item.code === search || item.name.toLowerCase() === search;
                    });

                    if(matchingSets.length === 1)
                        resolve(matchingSets[0].code);

                    resolve(undefined);
                })
                .catch(error => {reject(error);});
            });
        }
    }


}