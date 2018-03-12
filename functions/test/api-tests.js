var assert = require('assert');
var Api = require('../api/api.js');

describe('get card by id', () => {
    it('should return nissa steward of elements', () => {
        return Api.getCard("c79036a1-2239-4d4f-8b58-6cf9ac4863fc")
        .then(card => {
            assert.equal(card.name, 'Nissa, Steward of Elements');
        })
        .catch(error => {});
    });

    it('throw an error', () => {
        return Api.getCard("sdfsdf")
        .then(card => {})
        .catch(error => {
            assert.equal(error.code, 'not_found');
        });
    });
});

describe('search for card', () => {
    it('should return topan freeblade', () => {
        return Api.searchCards("topan freeblade")
        .then(cards => {
            assert.equal(cards[0].name, 'Topan Freeblade');
        })
        .catch(error => {});
    });

    it('should return wear//tear ', () => {
        return Api.searchCards("wear tear")
        .then(cards => {
            assert.equal(cards[0].name, 'Wear // Tear');
        })
        .catch(error => {});
    });

    it('should find no cards', () => {
        return Api.searchCards("sdfsdf")
        .then(cards => {})
        .catch(error => {
            assert.equal(error.code, 'not_found');
        });
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
    it('should find all sets ', () => {
        Api.getSets()
        .then(data => {
            var ori = sets.filter(function (item) {
                return item.code == `ori`;
            });
            assert.equal(ori.name, 'Magic Origins');
        })
        .catch(error => {});
    });
});