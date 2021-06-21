const { DeckModel } = require("./Deck.model");
const { SuitModel } = require("./Suit.model");
const { CardModel } = require("./Card.model");

class GameRoomModel {
    constructor(id, players){
        if(players.length > 2)
            console.error("A room can't have more thatn 2 players");

        this.id = id
        this.players = players
        this.deck = this.generateDeck()
        this.matches = [];      
        this.currentPlayerIdTurn = null;  
    }

    generateDeck() {
      //Generates a deck with random cards
      let decks = [];
      decks.push(new DeckModel('R'));
      decks.push(new DeckModel('B'));

      let suits = [];
      decks.forEach((deck) => {
        suits.push(new SuitModel(deck, 'H'));
        suits.push(new SuitModel(deck, 'S'));
        suits.push(new SuitModel(deck, 'D'));
        suits.push(new SuitModel(deck, 'C'));
      });
      
      let cardTemplates = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Q", "J", "K"];
    
      let gameDeck = [];
      suits.forEach((suit) => {
        cardTemplates.forEach((cardTemplate, cardTemplateIndex) => {
          var cardId = `${suit.deck.id}:${suit.id}:${cardTemplate}`; 
          gameDeck.push(new CardModel(cardId, cardTemplateIndex));
        })    
      })
    
      function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
          }
      }

      shuffleArray(gameDeck);
    
      return gameDeck;
    }
}
exports.GameRoomModel = GameRoomModel;