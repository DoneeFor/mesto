import '../pages/index.css';
import Card from '../components/Card.js';
import {initialCards} from '../utils/initialCards.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
const elementTemplate = '#card-template';
const popupList = document.querySelectorAll('.popup');
const addCardFormValidator = createValidator(config, popupAddCard);
const editProfileFormValidator = createValidator(config, popupEditProfile);


const cardList = new Section(
  {
    items: initialCards,
    renderer: (section, element) => {
        const card = createCard(element.name, element.link);
        section.addItem(card.element);
    }
  },
  cardGrid
);
 cardList.rendererItems();

 const popupWithImage = new PopupWithImage('.popup_type_image-overlay');
 popupWithImage.setEventListeners();

 const popupWithFormNewCard = new PopupWithForm('.popup_type_add-card', (inputVals) => {
  const card = createCard(inputVals['card-title'], inputVals['card-link']);
  cardList.addItem(card.element);
});
popupWithFormNewCard.setEventListeners();

const popupWithFormProfile = new PopupWithForm('.popup_type_edit-profile', (inputVals) => {
  userInfo.setUserInfo(inputVals['user-name'], inputVals['user-description'])
});
popupWithFormProfile.setEventListeners();

const userInfo = new UserInfo ({
  profileName: '.profile__name',
  profileOcupation: '.profile__description'
});

function createCard(title, link) {
  return new Card(title, link, elementTemplate, () => {
      popupWithImage.open(title,link);
  });
}

function createValidator(config, popup) {
  const {formSelector, ...restvalidationConfig} = config;
  const formElement = popup.querySelector(formSelector);
  const validator = new FormValidator(restvalidationConfig, formElement)
  validator.enableValidation()
  return validator
};

profileEditButton.addEventListener('click', () => {
  editProfileFormValidator.initForm();
  popupWithFormProfile.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileOcupation.textContent;
});

addCardButton.addEventListener('click', ()  => {
  popupWithFormNewCard.open();
  addCardFormValidator.initForm()
});
