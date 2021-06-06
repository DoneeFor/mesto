export default class Card {

  constructor(title, link, elementTemplate, imageClickListener) {
    this._title = title;
    this._link = link;
    this._elementTemplate = elementTemplate;
    this._imageClickListener = imageClickListener;
    this._element = this._createCard();
  }

  get element() {
    return this._element;
  }

  get title() {
    return this._title;
  }

  get link() {
    return this._link;
  }

  _toggleLikeButton() {
    this._element
      .querySelector('.card__like')
      .classList.toggle('card__like_active');
  }

  _toggleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector('.card__like')
      .addEventListener('click', () => {
        this._toggleLikeButton();
      });
    this._element
      .querySelector('.card__trash')
      .addEventListener('click', () => {
        this._toggleDeleteButton();
      });
    this._element
      .querySelector('.card__image')
      .addEventListener('click', () => {
        this._imageClickListener();
      });
  }

  _createCard() {
    const elementTemplate = document.querySelector(this._elementTemplate).content;
    const cardElement = elementTemplate.querySelector('.card').cloneNode(true);
    const img  = cardElement.querySelector('.card__image');
    this._element = cardElement;
    img.src = this._link;
    img.alt = this._title;
    cardElement.querySelector('.card__title').textContent = this._title;
    this._setEventListeners();
    return cardElement
  }
}
