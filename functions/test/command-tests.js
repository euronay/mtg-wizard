var assert = require('assert');
var CommandParser = require('../util/commandparser.js');


class TestCommandCallback {
    searchForACard(query) {
        return `Searching for card: ${query}`;
    }
    getCard(cardId) {
        return `Getting card: ${cardId}`;
    }
    findPrints(card) {
        return `Finding reprints: ${card.name}`;
    }
    flip(card){
        return `Flip: ${card.name}`;
    }
    askResponse(text) {
        return `Ask response: ${text}`;
    }
    tellResponse(text) {
        return `Tell response: ${text}`;
    }
}


describe('search commands', () => {
    
    it('should search for nissa steward of elements', async () => {
        var result = await CommandParser.parse('nissa steward of elements', new Object() , new TestCommandCallback());

        assert.equal(result, `Searching for card: nissa steward of elements`);
    });

    it('should search for glacial fotress from m13', async () => {
        var result = await CommandParser.parse('glacial fortress from m13', new Object(), new TestCommandCallback());

        assert.equal(result, `Searching for card: glacial fortress e:m13`);
    });

    it('should search for glacial fotress from magic 2013', async () => {
        var result = await CommandParser.parse('glacial fortress from Magic 2013', new Object(), new TestCommandCallback());

        assert.equal(result, `Searching for card: glacial fortress e:m13`);
    });
    
    it('should search for pull from tomorrow', async () => {
        var result = await CommandParser.parse('pull from tomorrow', new Object(), new TestCommandCallback());

        assert.equal(result, `Searching for card: pull from tomorrow`);
    });

    it('should search for pull from tomorrow from amonkhet', async () => {
        var result = await CommandParser.parse('pull from tomorrow from amonkhet', new Object(), new TestCommandCallback());

        assert.equal(result, `Searching for card: pull from tomorrow e:akh`);
    });

    it('should search for from beyond', async () => {
        var result = await CommandParser.parse('from beyond', new Object(), new TestCommandCallback());

        assert.equal(result, `Searching for card: from beyond`);
    });
});

describe('generic commands', () => {
    
    it('should exit if told bye', async () => {
        var result = await CommandParser.parse('bye', new Object(), new TestCommandCallback());

        assert.equal(result, `Tell response: Thanks for using MTG Wizard!`);
    });

   
});