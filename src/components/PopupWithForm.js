import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submit = this._popupSelector.querySelector('.popup__submit');
        this._buttonText = this._submit.textContent;
    }

    _getInputValues = () => {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.id] = input.value;
        });
        return inputValues;
    }

    _submitForm = (evt) => {
        evt.preventDefault();
        this.saving();
        this._handleSubmitForm(this._getInputValues());
    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitForm);
    }

    close() {
        super.close();
        this._form.reset();
    }

    saving() {
      this._submit.textContent = 'Сохранение';
      console.log('saved')
      this._submit.disabled = true;
    }

    rebuildButtonText() {
      this._submit.textContent = this._buttonText;
      this._submit.disabled = false;
    }
}
