import { cloneDeep } from "lodash";
export class Game {
  constructor() {
    this.deck = [];
    this.hand = [];
    this.won = false;
    this.state = GameState.INITIAL;
    this.animating = false;
    this.started = false;
    this.progress = 0;
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
    res.state = GameState.VALIDATE;
    return res;
  }

  validateHand() {
    const res = cloneDeep(this);
    if (res.hand.length === 2) {
      if (res.hand[0].code === res.hand[1].code) {
        res.hand.forEach((card) => (card.found = true));
      } else {
        res.hand[0].flip();
        res.hand[1].flip();
      }
    }
    res.state = GameState.EMPTY;
    return res;
  }

  emptyHand() {
    const res = cloneDeep(this);
    if (res.hand.length === 2 && !res.animating) {
      res.hand = [];
      res.animation = false;
    }
    res.state = GameState.WON;
    return res;
  }

  hasWon() {
    const res = cloneDeep(this);
    res.won = res.deck.every((card) => card.found);
    res.state = GameState.INITIAL;
    return res;
  }

  setDeck(deck) {
    const res = cloneDeep(this);
    res.deck = deck;
    return res;
  }

  start() {
    const res = cloneDeep(this);
    res.started = true;
    res.progress = 0;
    return res;
  }

  addASecond() {
    const res = cloneDeep(this);
    res.progress = this.progress + 1;
    return res;
  }

  gameOver() {
    const res = cloneDeep(this);
    res.won = false;
    res.progress = 0;
    res.started = false;
    res.state = GameState.LOSE;
    return res;
  }
}

export const GameState = Object.freeze({
  INITIAL: 1,
  VALIDATE: 2,
  EMPTY: 3,
  WON: 4,
  LOSE: 5,
});
