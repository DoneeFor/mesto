import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popupSelector.querySelector('.popup__image');
      this._popupCaption = this._popupSelector.querySelector('.popup__caption');
  }

  open(title, link){
      this._popupImage.src = link;
      this._popupCaption.alt = title;
      this._popupCaption.textContent = title;
      super.open();
  }
}
