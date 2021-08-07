import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


import {
  config,
  popupAddButton,
  profileEditButton,
  formElementEdit,
  formElementAdd,
  nameInput,
  jobInput,
  popupEditAvatarButton,
  formElementEditAvatar,
} from '../utils/constants.js';

let userId

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__image');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    authorization: '46e8784b-6100-4cb8-864a-061229038de1',
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(values => {
    userId = values[0]._id;

    userInfo.setUserInfo(values[0].name, values[0].about)
    userInfo.setUserAvatar(values[0].avatar)
    cardList.renderItems(values[1])
  })
  .catch((err) => {
    console.log(`Ошибка загрузки начальных данных: ${err}`)
  })

function createCard(cardName, cardLink, likes, cardId, owner) {
  const card = new Card({
    name: cardName,
    link: cardLink,
    likes: likes,
    cardId: cardId,
    cardOwner: owner,
    userId: userId,
    templateSelector: '#card-template',
    handleCardClick: (link, src) => {
      popupPhoto.openPopup(link, src)
    },
    toggleLike: (cardId, method) => {
      api.likeCard(cardId, method)
        .then(res => {
          card.updateLikes(res.likes)
        })
        .catch(err => {
          console.log(`${err}`)
        })
    },

    handleDeleteClick: (id) => {
      popupDelete.openPopup();
      popupDelete.setConfirmHandler(() => {
        api.deleteCard(id)
          .then(() => {
            card.deleteButtonClick();
            popupDelete.closePopup();
          })
          .catch(err => {
            console.log(`ошибка ${err}`)
          })
      });

    }
  });
  const cardElement = card.createCard();
  return cardElement;
};


const cardList = new Section({
  renderer: (card) => {
    cardList.addItem(createCard(card.name, card.link, card.likes, card._id, card.owner));
  }
},
  '.cards'
);

const popupEdit = new PopupWithForm({
  popupSelector: '#popupEdit',
  submitForm: ({ username, occupation }) => {

    api.updateUserData(username, occupation)
      .then(() => {
        userInfo.setUserInfo(username, occupation)
        popupEdit.closePopup();
      })
      .catch((err) => {
        console.log(`ошибка:${err}`)
      })
      .finally(() => {
        popupEdit.renderLoading(false);
      })
  },
});
popupEdit.setEventListeners();

profileEditButton.addEventListener('click', function () {
  const [userName, userOccupation] = userInfo.getUserInfo();
  nameInput.value = userName;
  jobInput.value = userOccupation;
  formEditValidator.deleteInputError();
  popupEdit.openPopup();
});

const popupAdd = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  submitForm: ({ placename, link }) => {
    api.postCard(placename, link)
      .then(res => {
        cardList.addItem(createCard(placename, link, [], res._id, res.owner));
        popupAdd.closePopup();
      })
      .catch((err) => {
        console.log(`ошибка:${err}`);
      })
      .finally(() => {
        popupAdd.renderLoading(false);
      })
  },
});

popupAdd.setEventListeners();

popupAddButton.addEventListener('click', function () {
  formAddValidator.deleteInputError();
  popupAdd.openPopup();
});

const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_avatar',
  submitForm: (inputValue) => {

    api.updateAvatar(inputValue.avatarLink)
      .then(() => {
        userInfo.setUserAvatar(inputValue.avatarLink);
        popupEditAvatar.closePopup();
      })
      .catch((err) => {
        console.log(`ошибка:${err}`);
      })
      .finally(() => {
        popupEditAvatar.renderLoading(false);
      })
  },
});

popupEditAvatar.setEventListeners();

popupEditAvatarButton.addEventListener('click', function () {
  formEditAvatarValidator.deleteInputError();
  popupEditAvatar.openPopup();
});

const popupPhoto = new PopupWithImage('.popup_type_image-overlay');
popupPhoto.setEventListeners();

const popupDelete = new PopupWithSubmit('#popupDelete');
popupDelete.setEventListeners();

const formEditValidator = new FormValidator(config, formElementEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(config, formElementAdd);
formAddValidator.enableValidation();
const formEditAvatarValidator = new FormValidator(config, formElementEditAvatar);
formEditAvatarValidator.enableValidation();
