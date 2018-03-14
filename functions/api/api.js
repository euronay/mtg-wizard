var CardFactory = require('../card/cardfactory.js');
var request = require('request-promise');

module.exports = class Api {

     static searchCards(query){
        return new Promise((resolve, reject) => {
            //TODO properly escape string
            var uri = 'https://api.scryfall.com/cards/search?q=' + query.replace(' ', '%20');
            console.log(`Calling ${uri}`);
            request(uri, {timeout: 5000})
            .then(response => {
                var data = JSON.parse(response);
                resolve(data.data.map(element => CardFactory.createCard(element)));     
            })
            .catch(error => {
                if(error.error){
                    reject(JSON.parse(error.error));
                }
            });
        });
    }

    static getCard(cardId){
        return new Promise((resolve, reject) => {
            var uri = 'https://api.scryfall.com/cards/' + cardId;
            console.log(`Calling ${uri}`);
            request(uri, {timeout: 5000})
            .then(response => {
                var data = JSON.parse(response);
                if(data){
                    resolve(CardFactory.createCard(data));     
                }
            })
            .catch(error => {
                if(error.error){ // TODO For some reason error.error returns undefined and then the error
                    reject(JSON.parse(error.error));
                }
            });
        });
    }

    static findPrints(card){
        return new Promise((resolve, reject) => {
            console.log(`Calling ${card.prints_uri}`);
            request(card.prints_uri, {timeout: 5000})
            .then(response => {
                var data = JSON.parse(response);
                if(data.data){
                    resolve(data.data.map(element => CardFactory.createCard(element)));    
                } 
                
            })
            .catch(error => {
                if(error.error){
                    reject(JSON.parse(error.error));
                }
            });
        });
    }

    static getSets(){
        return new Promise((resolve, reject) => {
            var uri = `https://api.scryfall.com/sets;`
            console.log(`Calling ${uri}`);
            request(uri, {timeout: 5000})
            .then(response => {
                var data = JSON.parse(response);
                if(data.data){
                    resolve(data.data);    
                } 

            })
            .catch(error => {
                if(error.error){
                    reject(JSON.parse(error.error));
                }
            });
        });
    }

}
