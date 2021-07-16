export default class FormValidator{

  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputErrorClass = config.inputErrorClass;
    this._inputErrorActiveClass = config.inputErrorActiveClass;
    this._inputSelector = config.inputSelector;
    this._submitButton = config.submitButton;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButton);
    this._inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._inputErrorActiveClass);
  }

  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._inputErrorActiveClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _checkInputValidity = (inputElement) => {

    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid)
  }

  _toggleButtonState = (buttonElement, inputList) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  }

  _setEventListener()  {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._buttonElement, this._inputList);
      })
    })
    this._toggleButtonState(this._buttonElement, this._inputList);
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    this._setEventListener();
  };

  initForm() {
    this._formElement.reset()
    this._toggleButtonState(this._formElement.querySelector(this._submitButton), this._inputElements)

    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }
}


