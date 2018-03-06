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

describe('saerch for card', () => {
    it('should return topan freeblade', () => {
        return Api.searchCards("topan freeblade")
        .then(cards => {
            assert.equal(cards[0].name, 'Topan Freeblade');
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
    it('should find ori and ima ', () => {
        Api.searchCards("topan freeblade")
        .then(cards => {
            return Api.findPrints(cards[0])
            .then(reprints => {
                // TODO - this test will break if another reprint is printed
                assert.equal(reprints[0].set, "ima");
                assert.equal(reprints[1].set, "ori");
            })
            .catch(error => {});
        })
        .catch(error => {});
    });
});