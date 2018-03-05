var assert = require('assert');
var Api = require('../api/api.js');

describe('api request', () => {
    it('should return topan freeblade', async () => {
        return Api.searchCard("topan freeblade").then(c => {
            //console.log(c[0].name);
            assert.equal(c[0].name, 'Topan Freeblade');
        });
    });

});