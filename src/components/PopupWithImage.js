import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__caption');
  }
  openPopup(name, link) {
    super.openPopup();
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
  }
}
