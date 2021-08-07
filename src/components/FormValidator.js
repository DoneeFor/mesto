export default class FormValidator {

  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError = (inputElement, _errorMessage) => {
    inputElement.classList.add(this._config.inputErrorClass);
    const _errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    _errorElement.classList.add(this._config.errorClass);
    _errorElement.textContent = _errorMessage;
  }

  _hideInputError = (inputElement) => {
    const _errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    _errorElement.classList.remove(this._config.errorClass);
    inputElement.classList.remove(this._config.inputErrorClass);
    _errorElement.textContent = ' ';
  }


  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }


  _hasInvalidInput() {
    console.log(this._inputList)
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };


  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      console.log(this._config.inactiveButtonClass)
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _setEventListeners = () => {
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      }
      );
    })
    this._toggleButtonState();
  }

  enableValidation = () => {
    this._setEventListeners();
  }

  deleteInputError = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState();
    });
  }
}
