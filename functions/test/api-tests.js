var assert = require('assert');
var Api = require('../api/api.js');

describe('get card by id', () => {
    it('should return nissa steward of elements', async () => {
        var card = await Api.getCard("c79036a1-2239-4d4f-8b58-6cf9ac4863fc");
        assert.equal(card.name, 'Nissa, Steward of Elements');
    });

    it('throw an error', async () => {
        var card = await Api.getCard("sdfsdf").catch(error => {assert.equal(error.code, 'not_found');});
    });
});

describe('search for card', () => {
    it('should return topan freeblade', async () => {
        var cards = await Api.searchCards("topan freeblade")
        assert.equal(cards[0].name, 'Topan Freeblade');
    });

    it('should return wear//tear ', async () => {
        var cards = await Api.searchCards("wear tear")
        assert.equal(cards[0].name, 'Wear // Tear');
    });

    it('should find no cards', async () => {
        var cards = await Api.searchCards("sdfsdf").catch(error => {assert.equal(error.code, 'not_found');});
    });

});

describe('big search', () =>{
    it('should return in decent time', async () => {
        var cards = await Api.searchCards("dragon");
    });
});

describe('get reprints', () => {
    it('should find ori and ima ', async () => {
        var cards = await Api.searchCards("topan freeblade");

        var reprints = await Api.findPrints(cards[0]);
        
        // TODO - this test will break if another reprint is printed
        assert.equal(reprints[0].set.toLowerCase(), "ima");
        assert.equal(reprints[1].set.toLowerCase(), "ori");     
    });
});

describe('get sets', () => {
    it('should find all sets ', async () => {
        var sets = await Api.getSets();

        var ori = sets.filter(item => {
            return item.code === `ori`;
        });

        assert.equal(ori[0].name, 'Magic Origins');
    });
});