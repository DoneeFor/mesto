export default class Card {

  constructor({ name, link, likes, cardId, cardOwner, userId, toggleLike, handleDeleteClick, templateSelector, handleCardClick }) {
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likes = likes;
    this._cardId = cardId;
    this._toggleLike = toggleLike;
    this._userId = userId;
    this._owner = cardOwner;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    this.cardTemplate = document.querySelector(this.templateSelector);
    const cardElement = this.cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  deleteButtonClick = () => {
    this.newCard.remove();
  }

  _likeButtonClick = () => {
    if (this._photoLikeButton.classList.contains("card__like_active")) {
      this._toggleLike(this._cardId, "DELETE")
    }
    else {
      this._toggleLike(this._cardId, "PUT")
    }
  }

  updateLikes(likes) {
    this._photoLikeButton.classList.toggle("card__like_active");
    this.newCard.querySelector(".card__like-count").textContent = likes.length
  }

  _setEventListeners() {
    this._deleteButton = this.newCard.querySelector(".card__trash");
    this._photoLikeButton = this.newCard.querySelector(".card__like");
    this.openPopupPhotoButton = this.newCard.querySelector(".card__image");
    this._markLikes();
    this._checkDeleteAbility();
    this.openPopupPhotoButton.addEventListener("click", () => {
      this._handleCardClick(this.name, this.link);
    });

    this._photoLikeButton.addEventListener("click", this._likeButtonClick);

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._cardId);
    });
  }

  _markLikes() {
    const isLiked = this._likes.some(likeOwner => {
      return likeOwner._id === this._userId;
    })

    if (isLiked) {
      this._photoLikeButton.classList.toggle("card__like_active");
    }
  }

  _checkDeleteAbility() {
    if (this._owner._id !== this._userId) {
      this._deleteButton.classList.add("card__trash_hidden")
    }
  }

  createCard() {
    this.newCard = this._getTemplate();
    this._setEventListeners();
    this.newCard.querySelector(".card__title").textContent = this.name;
    this.openPopupPhotoButton.src = this.link;
    this.openPopupPhotoButton.alt = `${this.name}`;
    this.newCard.querySelector(".card__like-count").textContent = this._likes.length;
    return this.newCard;
  }
}
