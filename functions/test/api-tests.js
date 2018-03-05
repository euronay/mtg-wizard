var assert = require('assert');
var Api = require('../api/api.js');

describe('api request', () => {
    it('should return topan freeblade', () => {
        return Api.searchCard("topan freeblade").then(c => {
            return assert.equal(c[0].name, 'Topan Freeblade');
        })
    });

});