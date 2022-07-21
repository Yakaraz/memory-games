import { cloneDeep } from "lodash";
class Game {
  constructor() {
    this.deck = [];
    this.hand = [];
  }

  flipCard(uuid) {
    const res = cloneDeep(this);
    const card = res.deck.find((card) => card.uuid === uuid);
    card.flip();
    res.hand.push(card);
    return res;
  }

  setDeck(deck) {
    const res = cloneDeep(this);
    res.deck = deck;
    return res;
  }
}

export default Game;
