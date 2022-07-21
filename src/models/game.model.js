import { cloneDeep } from "lodash";
class Game {
  constructor() {
    this.deck = [];
    this.hand = [];
    this.won = false;
  }

  flipCard(uuid) {
    const res = cloneDeep(this);
    if (this.hand.length < 2) {
      const card = res.deck.find((card) => card.uuid === uuid);
      if (!card.flipped) {
        card.flip();
        res.hand.push(card);
        this.validateHand(res);
      }
    }
    this.hasWon(res);
    return res;
  }

  validateHand(res) {
    if (res.hand.length === 2) {
      if (res.hand[0].code === res.hand[1].code) {
        res.hand.forEach((card) => (card.found = true));
      } else {
        res.hand.forEach((card) => card.flip());
      }
      res.hand = [];
    }
  }

  hasWon(res) {
    res.won = res.deck.every((card) => card.found);
  }

  setDeck(deck) {
    const res = cloneDeep(this);
    res.deck = deck;
    return res;
  }
}

export default Game;
