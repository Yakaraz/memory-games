class Card {
  constructor(image) {
    this.uuid = image.uuid;
    this.url = image.url;
    this.title = image.title;
    this.flipped = false;
    this.found = false;
  }

  flip() {
    this.flipped = !this.flipped;
  }

  setFound() {
    this.found = true;
  }
}

export default Card;
