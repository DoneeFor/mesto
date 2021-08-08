import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {

  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__submit');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitForm)
  }

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    this.renderLoading(true);
    this._submitForm(this._getInputValues())
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this.formValues = {};
    this._inputList.forEach(input => this.formValues[input.name] = input.value);
    return this.formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
