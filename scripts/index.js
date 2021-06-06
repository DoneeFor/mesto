import Card from './Card.js';
import {initialCards} from './initialCards.js'
import FormValidator from './validate.js'
import {
  openPopup,
  closePopup,
} from './utils.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButton: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  inputErrorActiveClass: 'popup__input-error_active',
}

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const nameInput = popupEditProfile.querySelector('.popup__input_user_name');
const jobInput = popupEditProfile.querySelector('.popup__input_user_description');
const profileName = document.querySelector('.profile__name');
const profileOcupation = document.querySelector('.profile__description');
const popupAddCard = document.querySelector('.popup_type_add-card');
const imagePopupElement = document.querySelector('.popup_type_image-overlay');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const cardName = popupAddCard.querySelector('.popup__input_card_name');
const cardLink = popupAddCard.querySelector('.popup__input_card_link');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const cardGrid = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template');
const popupList = document.querySelectorAll('.popup');
const addCardFormValidator = createValidator(config, popupAddCard);
const editProfileFormValidator = createValidator(config, popupEditProfile);

function createCard(title, link) {
  return new Card(title, link, cardTemplate, () => {
      openPopup(imagePopupElement);
      popupImage.src = link;
      popupCaption.textContent = title;
      popupCaption.alt = title;
  });
}

function addCard(card) {
  cardGrid.prepend(card.element);
}

initialCards.forEach((element) => {
  const card = createCard(element.name, element.link)
  addCard(card)
});

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOcupation.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const card = createCard(cardName.value, cardLink.value);
  addCard(card)
  closePopup(popupAddCard)
}

function createValidator(config, popup) {
  const {formSelector, ...restvalidationConfig} = config;
  const formElement = popup.querySelector(formSelector);
  const validator = new FormValidator(restvalidationConfig, formElement)
  validator.enableValidation()
  return validator
};

profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  editProfileFormValidator.initForm()
});

addCardButton.addEventListener('click', ()  => {
  openPopup(popupAddCard);
  addCardFormValidator.initForm()
});

popupCloseButtons.forEach(item => {
    const popup = item.closest('.popup');
    item.addEventListener('click', function () {
      closePopup(popup);
    })
});

popupList.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closePopup(popup);
    };
  });
});

popupEditProfile.addEventListener('submit', handleProfileSubmit);
popupAddCard.addEventListener('submit', handleNewCardSubmit);
popupCloseButtons.addEventListener('click', () => closePopup(imagePopupElement));
