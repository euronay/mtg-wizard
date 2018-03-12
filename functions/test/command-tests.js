var assert = require('assert');
var CommandParser = require('../commands/commandparser.js');


class CommandCallback {
    searchForACard(query) {
        return `Searching for card: ${query}`;
    }
    getCard(cardId) {
        return `Getting card: ${cardId}`;
    }
    askResponse(text) {
        return `Ask response: ${text}`;
    }
    tellResponse(text) {
        return `Tell response: ${text}`;
    }
}


describe('search commands', () => {
    
    it('should search for nissa steward of elements', () => {
        var result = CommandParser.parse('nissa steward of elements', null, new CommandCallback());

        assert.equal(result, `Searching for card: nissa steward of elements`);
    });

    it('should search for glacial fotress from m13', () => {
        var result = CommandParser.parse('glacial fortress from m13', null, new CommandCallback());

        assert.equal(result, `Searching for card: glacial fortress e:m13`);
    });

    it('should search for glacial fotress from magic 2013', () => {
        var result = CommandParser.parse('glacial fortress from Magic 2013', null, new CommandCallback());

        assert.equal(result, `Searching for card: glacial fortress e:m13`);
    });
    
    it('should search for pull from tomorrow', () => {
        var result = CommandParser.parse('pull from tomorrow', null, new CommandCallback());

        assert.equal(result, `Searching for card: pull from tomorrow`);
    });

    it('should search for pull from tomorrow from amonkhet', () => {
        var result = CommandParser.parse('pull from tomorrow from amonkhet', null, new CommandCallback());

        assert.equal(result, `Searching for card: pull from tomorrow e:akh`);
    });

    it('should search for from beyond', () => {
        var result = CommandParser.parse('from beyond', null, new CommandCallback());

        assert.equal(result, `Searching for card: from beyond`);
    });
});

describe('generic commands', () => {
    
    it('should exit if told bye', () => {
        var result = CommandParser.parse('bye', null, new CommandCallback());

        assert.equal(result, `Tell response: Thanks for using Scrybot!`);
    });

   
});