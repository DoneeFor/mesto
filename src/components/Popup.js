import {
  ESCAPE_KEY
} from '../utils/constants.js'
export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close')
      .addEventListener('click', () => {
        this.closePopup();
      });
  }

  _closeByOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.closePopup();
    }
  }

  _closeByEsc = (evt) => {
    if (evt.key === ESCAPE_KEY) {
      this.closePopup();
    }
  }

  closePopup() {
    document.removeEventListener('keydown', this._closeByEsc);
    this._popup.removeEventListener('mousedown', this._closeByOverlay);
    this._popup.classList.remove('popup_opened');
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEsc)
    this._popup.addEventListener('mousedown', this._closeByOverlay)
  }
}
