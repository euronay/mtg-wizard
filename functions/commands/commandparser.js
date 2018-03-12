var Api = require('../api/api.js');

module.exports = class CommandParser {


    static async parse(commandText, context, callback){
        
        console.log(`Parsing command '${commandText}'`)

        // FROM <Set>
        if(commandText.indexOf('from') > 0)
        {
            var lastIndex = commandText.lastIndexOf('from');
            var cardname = commandText.substr(0, lastIndex).trim();
            var possibleSetName = commandText.substr(lastIndex + 4).trim().toLowerCase();

            console.log(`Card name '${cardname}'
            Possible Set name '${possibleSetName}'`);

            var set = await getMagicSet(possibleSetName);
            console.log(`Actual set ${set}`);

            if(set){
                return callback.searchForACard(`${cardname} e:${set}`);
            }
        }
        
        // EXIT COMMANDS
        var exitCommands = ['bye', 'goodbye', 'thanks', 'exit', 'no'];
        if(exitCommands.includes(commandText)){
            return callback.tellResponse('Thanks for using Scrybot!');
        }

        if(context)
        {
            // REPRINTS
            var printCommands = ['printings', 'reprints', 'sets'];
            if(printCommands.includes(commandText)){
                return callback.findReprints(context.id);
            }

            // FLIP
            var flipCommands = ['flip', 'transform'];
            if(context.layout == 'transform' && printCommands.includes(commandText)){ //TODO meld
                return callback.flip(context);
            }
        }

        // TODO artists, rulings ...


        // DEFAULT SEARCH
        return callback.searchForACard(commandText);


        async function getMagicSet(search){

            // get sets
            var sets = await Api.getSets()
            
            // search for exact set code
            var matchingSets = sets.filter(function (item) {
                return item.code == search || item.name.toLowerCase() == search;
            });

            if(matchingSets.length == 1)
                return matchingSets[0].code;

            return undefined;
        }
    }


}