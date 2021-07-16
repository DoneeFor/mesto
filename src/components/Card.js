export default class Card {

  constructor(currentUserId, cardData, elementTemplate, imageClickListener, deleteHandler, likeHandler, dislikeHandler) {
    this._currentUserId = currentUserId;
    this._cardData = cardData;
    this._elementTemplate = elementTemplate;
    this._imageClickListener = imageClickListener;
    this._deleteHandler = deleteHandler;
    this._likeHandler = likeHandler;
    this._dislikeHandler = dislikeHandler;
    this._element = this._createCard();
  }

  get element() {
    return this._element;
  }

  get title() {
    return this._cardData.name;
  }

  get link() {
    return this._cardData.link;
  }

  _toggleLikeButton() {
    var handler;
    if (this._isCardLikedByCurrentUser()) {
      handler = this._dislikeHandler
    } else {
      handler = this._likeHandler
    }
    handler()
      .then((data) => {
        this._cardData = data;
      })
      .then(() => this._showLikes())
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
    const deleteBtn = this._element.querySelector('.card__trash')
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        this._showPopupConfirm();
      });
    }
    this._element
    .querySelector('.card__image')
    .addEventListener('click', () => {
      this._imageClickListener();
    });
  }

  _showLikes() {
    this._element.querySelector('.card__like-count').textContent = this._cardData.likes.length;
    const likeBtn = this._element.querySelector('.card__like');
    if (this._isCardLikedByCurrentUser()) {
      likeBtn.classList.add('card__like_active');
    } else {
      likeBtn.classList.remove('card__like_active');
    }
  }

  _isCardOwnedByCurrentUser() {
    const cardOwnerId = this._cardData.owner._id;
    return this._currentUserId == cardOwnerId
  }

  _isCardLikedByCurrentUser() {
    return this._cardData.likes.some(l => {
      return l._id == this._currentUserId
    });
  }

  _createCard() {
    const elementTemplate = document.querySelector(this._elementTemplate).content;
    const cardElement = elementTemplate.querySelector('.card').cloneNode(true);
    const img  = cardElement.querySelector('.card__image');
    this._element = cardElement;
    img.src = this.link;
    img.alt = this.title;
    cardElement.querySelector('.card__title').textContent = this.title;
    if (!this._isCardOwnedByCurrentUser()) {
      cardElement.querySelector('.card__trash').remove();
    }
    this._showLikes()
    this._setEventListeners();
    return cardElement
  }
}
