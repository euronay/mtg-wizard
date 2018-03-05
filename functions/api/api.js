var Card = require('../card2.js');
var request = require('request-promise');

module.exports = class Api {

     static searchCard(query){
        //TODO properly escape string
        return new Promise((resolve, reject) => {

            request('https://api.scryfall.com/cards/search?q=' + query.replace(' ', '%20'))
            .then(response => {
                var data = JSON.parse(response);
                if (data.object === "error")
                {
                    resolve(null);
                }
                else
                {
                    resolve(data.data.map(element => new Card(element)));     
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err)});
        });
    }

}
