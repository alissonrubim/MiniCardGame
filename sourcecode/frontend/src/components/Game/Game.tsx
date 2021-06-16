import { GiSpades, GiDiamonds, GiHearts, GiClubs } from 'react-icons/gi';

import Table from 'components/Table/Table';
import IDeck from 'models/IDeck';
import ICard from 'models/ICard';
import ISuit from 'models/ISuit';

function GenerateDeck(): Array<ICard> {
  let decks = new Array<IDeck>();
  decks.push({
    identifier: 'red',
    color: '#e55e5e'
  });
  decks.push({
    identifier: 'blue',
    color: '#659edb'
  })

  let suits = new Array<ISuit>();
  decks.forEach((deck) => {
    suits.push({
      deck: deck,
      identifier: 'hearts',
      color: "red",
      renderIcon: () => <GiHearts />
    });
    suits.push({
      deck: deck,
      identifier: 'spades',
      color: "black",
      renderIcon: () => <GiSpades />
    });
    suits.push({
      deck: deck,
      identifier: 'diamonds',
      color: "red",
      renderIcon: () => <GiDiamonds />
    });
    suits.push({
      deck: deck,
      identifier: 'clubs',
      color: "black",
      renderIcon: () => <GiClubs />
    });
  });
  
  let cardTemplates = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Q", "J", "K"];

  let gameDeck = new Array<ICard>();
  suits.forEach((suit) => {
    cardTemplates.forEach((cardTemplate, cardTemplateIndex) => {
      gameDeck.push({
        value: cardTemplateIndex,
        name: cardTemplate,
        suit: suit
      });
    })    
  })

  shuffleArray(gameDeck);

  return gameDeck;
}

function shuffleArray(array: Array<ICard>) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function Game(){
  let gameDeck = GenerateDeck();

  function drawCard(): ICard {
    let card = gameDeck.pop();
    if(card == null)
      throw new Error("You can't draw from a empty deck");
    return card;
  }

  var myHandCards = Array<ICard>();
  myHandCards.push(drawCard());
  myHandCards.push(drawCard());
  myHandCards.push(drawCard());

  return (
    <Table 
      cardsAtDeck={gameDeck}  
      cardsAtHand={myHandCards}  
    />
  )
}