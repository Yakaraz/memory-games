import { v4 as uuidv4 } from "uuid";

class Card {
  constructor(image) {
    this.uuid = uuidv4();
    this.code = image.uuid;
    this.url = image.url;
    this.title = image.title;
    this.flipped = false;
    this.found = false;
  }

  flip() {
    this.flipped = !this.flipped;
  }

  isFlipped() {
    return this.flipped;
  }

  setFound() {
    this.found = true;
  }
}

export default Card;
