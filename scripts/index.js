const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButton: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  inputErrorActiveClass: 'popup__input-error_active',
}

enableValidation(config);

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

function createCard(currentCard) {
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardRemove = card.querySelector('.card__trash');
  const cardLikeButton = card.querySelector('.card__like');

  cardImage.addEventListener('click', function () {
    popupImage.src = currentCard.link;
    popupImage.alt = currentCard.name;
    popupCaption.textContent = currentCard.name;
    openPopup(imagePopupElement);
  });

  cardImage.src = currentCard.link;
  cardTitle.textContent = currentCard.name;
  cardImage.alt = currentCard.name;
  cardLikeButton.addEventListener('click', function () {
    cardLikeButton.classList.toggle('card__like_active');
  })
  cardRemove.addEventListener('click', function (e) {
    e.target.closest('.card').remove();
  })

  return card;
}

initialCards.forEach(function (currentCard) {
  const newCard = createCard(currentCard);
  cardGrid.append(newCard);
});

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOcupation.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  cardGrid.prepend(createCard({
    name: cardName.value,
    link: cardName.value
  }));
  closePopup(popupAddCard);
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseEscape);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseEscape);
}

function handleCloseEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOcupation.textContent;
  openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', function () {
  cardName.value = "";
  cardName.value = "";
  openPopup(popupAddCard);
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
