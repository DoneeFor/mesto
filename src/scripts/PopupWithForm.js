import Popup from '../scripts/Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
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
        this._handleSubmitForm(this._getInputValues());
        this.close();
    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitForm);
    }

    close() {
        super.close();
        this._form.reset();
    }
}
