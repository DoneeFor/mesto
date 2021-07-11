import Popup from '../components/Popup.js'

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.popup__form');
        this._handleSubmitForm = handleSubmitForm;
        this._btnSubmit = this._popupSelector.querySelector('.popup__button-submit');
        this._btnTextDefault = this._btnSubmit.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log('Submitted')
            this._handleSubmitForm();
        });
    }

    showSaving() {
        this._btnSubmit.textContent = 'Удаление...';
        this._btnSubmit.disabled = true;
    }

    restoreDefaultText() {
        this._btnSubmit.textContent = this._btnTextDefault;
        this._btnSubmit.disabled = false;
    }
}
