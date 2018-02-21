var assert = require('assert');
var httpRequest = require('request');
describe('httpRequest', function() {
    it('should return something', function() {
        httpRequest('https://api.scryfall.com/cards/search?q=nissa', 
        function (error, response, body){

            console.log(body);

        });
    });
});