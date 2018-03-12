var Api = require('../api/api.js');

module.exports = class CommandParser {


    static parse(commandText, context, callback){
        
        console.log(`Parsing command '${commandText}'`)

        // FROM <Set>
        if(commandText.indexOf('from') > 0)
        {
            var lastIndex = commandText.lastIndexOf('from');
            var cardname = commandText.substr(0, lastIndex).trim();
            var possibleSetName = commandText.substr(lastIndex + 4).trim().toLowerCase();

            //console.log(`Card name '${cardname}'
            //Possible Set name '${possibleSetName}'`);

            var set = getMagicSet(possibleSetName);
            //console.log(`Actual set ${set}`);

            if(set){
                return callback.searchForACard(`${cardname} e:${set}`);
            }
        }
        
        var exitCommands = ['bye', 'goodbye', 'thanks', 'exit', 'no'];
        if(exitCommands.includes(commandText)){
            return callback.tellResponse('Thanks for using Scrybot!');
        }

        // no current card
            // card name

            // from <set>

            // bye

        // card selected
            // prints/reprints

            //flip

        // returns
            // search for card(s)
            // search for specific card
            // text response


        // DEFAULT SEARCH
        return callback.searchForACard(commandText);


        function getMagicSet(search){
             var sets = [
                {
                    code: "soi", 
                    name: "Shadows Over Innistrad"
                },
                {
                    code: "m13", 
                    name: "Magic 2013"
                },
                {
                    code: "akh", 
                    name: "Amonkhet"
                }
            ];

            // search for exact set code
            var matchingSets = sets.filter(function (item) {
                return item.code == search || item.name.toLowerCase().indexOf(search) >= 0;
            });

            if(matchingSets.length == 1)
                return matchingSets[0].code;

            return undefined;
        }
    }


}