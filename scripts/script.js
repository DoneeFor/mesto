let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_user_name');
let jobInput = formElement.querySelector('.popup__input_user_occupation');
let profileName = document.querySelector('.profile__name');
let profileOcupation = document.querySelector('.profile__description');

function openPopup (evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
}
function closePopup (evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
}
function formSubmitHandler (evt) {
	evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOcupation.textContent = jobInput.value;
  closePopup(evt);
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
