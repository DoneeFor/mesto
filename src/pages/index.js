import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Api from '../components/API.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import {
  addCardButton,
  popupAddCard,
  profileAvatar,
  popupAvatar,
  cardTemplate,
  profileEditButton,
  popupEditProfile,
  nameInput,
  jobInput,
  cardGrid,
} from '../utils/constants.js'

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButton: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  inputErrorActiveClass: 'popup__input-error_active',
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
  headers: {
    "authorization": '46e8784b-6100-4cb8-864a-061229038de1',
    "content-type": 'application/json',
  },
});


const addCardFormValidator = createValidator(config, popupAddCard);
const editProfileFormValidator = createValidator(config, popupEditProfile);
const avatarValidator = createValidator(config, popupAvatar);


const cardList = new Section(
  {
    items: [],
    renderer: (element) => {
        const card = createCard(element.name, element.link);
        cardList.addItem(card.element);
    }
  },
  cardGrid
);
 cardList.rendererItems();

const popupWithImage = new PopupWithImage('.popup_type_image-overlay');
popupWithImage.setEventListeners();

const popupWithSubmit = new PopupWithSubmit('.popup_confirm');
popupWithSubmit.setEventListeners();

const popupWithFormNewCard = new PopupWithForm('.popup_type_add-card', (inputVals) => {
  api.postNewCard(inputVals['card-title'], inputVals['card-link'])
  .then(data => {
    const card = createCard(data);
    cardList.addItem(card.element);
    popupWithFormNewCard.close();
  })
  .catch((err) => {
    console.log(err);
  });
});
popupWithFormNewCard.setEventListeners();

const popupWithFormProfile = new PopupWithForm('.popup_type_edit-profile', (inputVals) => {
  api.changeUserInfo(inputVals['user-name'], inputVals['user-description'])
  .then(data => {
    userInfo.setUserInfo(data._id, data.name, data.about, data.avatar);
    popupWithFormProfile.close();
  })
  .catch((err) => {
    console.log(err);
    });
});
popupWithFormProfile.setEventListeners();

const userInfo = new UserInfo ({
  profileName: '.profile__name',
  profileOcupation: '.profile__description',
  profileAvatar: '.profile__image'
});

const popupWithAvatar = new PopupWithForm('.popup_avatar', (avatarInput)  => {
  api.updateAvatar(avatarInput.avatarLink)
  .then((data) => {
      console.log(data)
      userInfo.setUserInfo(data._id, data.name, data.about, data.avatar)
      popupWithAvatar.close()
  .catch((err) => {
      console.log(err);
      })
  .finally(() => {
      this.rebuildButtonText();
      });
  });
})
popupWithAvatar.setEventListeners();

api.getUserInfo()
  .then(data => {
    console.log(data)
    userInfo.setUserInfo(data._id, data.name, data.about, data.avatar)
}).then( () => {
    api.getInitialCards().then((data) => {
        data.reverse().forEach(c => {
            const card = createCard(c);
            cardList.addItem(card.element);
        })
    });
})
  .catch((err) => {
    console.log(err);
  })


  function createCard(cardData) {
    return new Card(
        userInfo.getUserInfo().userId,
        cardData,
        cardTemplate,
        () => {
            popupWithImage.open(cardData.name, cardData.link);
        },
        (card) => {
          popupWithSubmit.open(() => {
             api.deleteCard(cardData._id)
            .then(() => card.deleteCard())
            .catch((err) => {
              console.log(err);
              })})
        },
        () => {
            return api.like(cardData._id)
            .catch((err) => {
              console.log(err);
              })
        },
        () => {
            return api.dislike(cardData._id)
            .catch((err) => {
              console.log(err);
              })
        }
    );
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
  const data =  userInfo.getUserInfo();
    nameInput.value = data._name;
    jobInput.value = data._job;
});

addCardButton.addEventListener('click', ()  => {
  popupWithFormNewCard.open();
  addCardFormValidator.initForm()
});

profileAvatar.addEventListener('click', () => {
  popupWithAvatar.open();
  avatarValidator.initForm()
});
