var CardFactory = require('../card/cardfactory.js');
var request = require('request-promise');

module.exports = class Api {

     static async searchCards(query){
        //TODO properly escape string
        var uri = 'https://api.scryfall.com/cards/search?q=' + query.replace(' ', '%20');
        var data = await this.callUri(uri).catch(error => {throw error;});
        return data.data.map(element => CardFactory.createCard(element));     
    }

    static async getCard(cardId){
        var uri = 'https://api.scryfall.com/cards/' + cardId
        var data = await this.callUri(uri).catch(error => {throw error;});
        return CardFactory.createCard(data); 
    }

    static async findPrints(card){
        var data = await this.callUri(card.prints_uri).catch(error => {throw error;});
        return data.data.map(element => CardFactory.createCard(element));     
    }

    static async getSets(){
        var data = await this.callUri(`https://api.scryfall.com/sets`).catch(error => {throw error;});
        return data.data;
    }

    static async callUri(uri){
        console.log(`Calling ${uri}`);
        var response = await request(uri, {timeout: 5000}).catch(error => {throw JSON.parse(error.error)});
        var data = JSON.parse(response);
        return data;  
        
    }

}
