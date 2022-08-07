import { cloneDeep } from "lodash";
export class GameModel {
  constructor() {
    this.deck = [];
    this.hand = [];
    this.won = false;
    this.state = GameState.INITIAL;
    this.animating = false;
    this.started = false;
    this.progress = 0;
    this.mode = GameMode.COUNT_UP;
  }

  flipCard(uuid) {
    const res = cloneDeep(this);
    if (res.hand.length < 2) {
      const card = res.deck.find((card) => card.uuid === uuid);
      if (!card.flipped) {
        card.flip();
        res.hand.push(card);
      }
    }
    if (res.hand.length === 1) {
      res.state = GameState.VALIDATE_LEFT;
    } else {
      res.state = GameState.VALIDATE_RIGHT;
    }

    return res;
  }

  unflip() {
    const res = cloneDeep(this);
    res.hand[0].flip();
    res.hand[1].flip();
    res.state = GameState.EMPTY;
    return res;
  }

  validateHand() {
    const res = cloneDeep(this);
    if (res.hand.length === 2) {
      if (res.hand[0].code === res.hand[1].code) {
        res.hand.forEach((card) => (card.found = true));
        res.state = GameState.EMPTY;
      } else {
        res.animating = true;
        res.state = GameState.UNFLIP;
      }
    }

    return res;
  }

  emptyHand() {
    const res = cloneDeep(this);
    res.hand = [];
    res.animating = false;
    res.state = GameState.WON;
    return res;
  }

  hasWon() {
    const res = cloneDeep(this);
    res.won = res.deck.every((card) => card.found);
    res.state = GameState.INITIAL;
    return res;
  }

  resetGame() {
    const res = cloneDeep(this);
    res.started = false;
    res.won = false;
    res.progress = 0;
    return res;
  }

  setDeck(deck) {
    const res = cloneDeep(this);
    res.deck = deck;
    return res;
  }

  startCount() {
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

export const GameMode = Object.freeze({
  COUNT_UP: 1,
  COUNT_DOWN: 2,
});

export const GameState = Object.freeze({
  INITIAL: 1,
  VALIDATE_LEFT: 2,
  VALIDATE_RIGHT: 3,
  UNFLIP: 4,
  EMPTY: 5,
  WON: 6,
  LOSE: 7,
});
