import { cloneDeep } from "lodash";
class Game {
  constructor() {
    this.deck = [];
    this.hand = [];
    this.won = false;
    this.animating = false;
  }

  flipCard(uuid) {
    const res = cloneDeep(this);
    if (this.hand.length < 2) {
      const card = res.deck.find((card) => card.uuid === uuid);
      if (!card.flipped) {
        card.flip();
        res.hand.push(card);
      }
    }
    return res;
  }

  validateHand() {
    const res = cloneDeep(this);
    if (res.hand.length === 2 && !res.animating) {
      res.animating = true;
      setTimeout(() => {
        if (res.hand[0].code === res.hand[1].code) {
          res.hand.forEach((card) => (card.found = true));
        } else {
          res.hand.forEach((card) => card.flip());
        }
        res.hand = [];
        res.animation = false;
      }, 800);
    }
    return res;
  }

  hasWon() {
    const res = cloneDeep(this);
    res.won = res.deck.every((card) => card.found);
    return res;
  }

  setDeck(deck) {
    const res = cloneDeep(this);
    res.deck = deck;
    return res;
  }
}

export default Game;
