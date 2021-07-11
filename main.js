(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o,i,u,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._currentUserId=e,this._cardData=n,this._elementTemplate=r,this._imageClickListener=o,this._deleteHandler=i,this._likeHandler=u,this._dislikeHandler=a,this._element=this._createCard()}var n,r;return n=t,(r=[{key:"element",get:function(){return this._element}},{key:"title",get:function(){return this._cardData.title}},{key:"link",get:function(){return this._cardData.link}},{key:"_toggleLikeButton",value:function(){var e=this;(this._isCardLikedByCurrentUser()?this._dislikeHandler:this._likeHandler)().then((function(t){e._cardData=t})).then((function(){return e._showLikes()}))}},{key:"_toggleDeleteButton",value:function(){this._element.remove(),this._element=null}},{key:"_setEventListeners",value:function(){var e=this;this._likeButton.querySelector(".card__like").addEventListener("click",(function(){e._toggleLikeButton()}));var t=this._element.querySelector(".card-trash");t&&t.addEventListener("click",(function(){e._showDeleteConfirmation()})),this._element.querySelector(".card__image").addEventListener("click",(function(){e._imageClickListener()}))}},{key:"_showPopupConfirm",value:function(){var e=this,t=new PopupWithSubmit(".popup_confirm",(function(){t.showSaving(),e._deleteHandler().then((function(){return e._deleteCard()})).catch((function(e){console.log(e)})).finally((function(){t.close(),t.restoreDefaultText()}))}));t.setEventListeners(),t.open()}},{key:"_createCard",value:function(){var e=document.querySelector(this._elementTemplate).content.querySelector(".card").cloneNode(!0),t=e.querySelector(".card__image");return this._element=e,t.src=this._link,t.alt=this._title,e.querySelector(".card__title").textContent=this._title,this._isCardOwnedByCurrentUser()||e.querySelector(".card__trash").remove(),this._showLikes(),this._setEventListeners(),e}},{key:"_showLikes",value:function(){console.log(this._cardData),this._element.querySelector(".card__like-count").textContent=this._cardData.likes.length;var e=this._element.querySelector(".card__like");this._isCardLikedByCurrentUser()?e.classList.add("card__like_active"):e.classList.remove("card__like_active")}},{key:"_isCardOwnedByCurrentUser",value:function(){var e=this._cardData.owner._id;return this._currentUserId==e}},{key:"_isCardLikedByCurrentUser",value:function(){var e=this;return this._cardData.likes.some((function(t){return t._id==e._currentUserId}))}}])&&e(n.prototype,r),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o=function(){function e(t,n){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r(this,"_hideInputError",(function(e){var t=o._formElement.querySelector("#".concat(e.id,"-error"));e.classList.remove(o._inputErrorClass),t.textContent="",t.classList.remove(o._inputErrorActiveClass)})),r(this,"_showInputError",(function(e){var t=o._formElement.querySelector("#".concat(e.id,"-error"));e.classList.add(o._inputErrorClass),t.classList.add(o._inputErrorActiveClass),t.textContent=e.validationMessage})),r(this,"_checkInputValidity",(function(e){e.validity.valid?o._hideInputError(e):o._showInputError(e)})),r(this,"_hasInvalidInput",(function(e){return e.some((function(e){return!e.validity.valid}))})),r(this,"_toggleButtonState",(function(e,t){o._hasInvalidInput(t)?e.disabled=!0:e.disabled=!1})),this._formElement=n,this._inputErrorClass=t.inputErrorClass,this._inputErrorActiveClass=t.inputErrorActiveClass,this._inputSelector=t.inputSelector,this._submitButton=t.submitButton}var t,o;return t=e,(o=[{key:"_setEventListener",value:function(){var e=this,t=Array.from(this._formElement.querySelectorAll(this._inputSelector)),n=this._formElement.querySelector(this._submitButton);t.forEach((function(r){r.addEventListener("input",(function(){e._checkInputValidity(r),e._toggleButtonState(n,t)}))})),this._toggleButtonState(n,t)}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListener()}},{key:"initForm",value:function(){var e=this;this._formElement.reset();var t=Array.from(this._formElement.querySelectorAll(this._inputSelector));this._toggleButtonState(this._formElement.querySelector(this._submitButton),t),t.forEach((function(t){e._hideInputError(t)}))}}])&&n(t.prototype,o),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._elementsList=n}var t,n;return t=e,(n=[{key:"rendererItems",value:function(){var e=this;this._items.forEach((function(t){e._renderer(e,t)}))}},{key:"addItem",value:function(e){this._elementsList.prepend(e)}}])&&i(t.prototype,n),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupSelector=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupSelector.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupSelector.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleOverlayClose",value:function(e){e.target===popup&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popupSelector.addEventListener("click",(function(t){(t.target.classList.contains("popup_opened")||t.target.classList.contains("popup__close"))&&e.close()}))}}])&&a(t.prototype,n),e}();function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t,n){return(p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(r);if(o){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return _(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._popupImage=t._popupSelector.querySelector(".popup__image"),t._popupCaption=t._popupSelector.querySelector(".popup__caption"),t}return t=u,(n=[{key:"open",value:function(e,t){this._popupImage.src=t,this._popupCaption.alt=e,this._popupCaption.textContent=e,p(d(u.prototype),"open",this).call(this)}}])&&s(t.prototype,n),u}(c);function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t,n){return(v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=k(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e,t){return!t||"object"!==y(t)&&"function"!=typeof t?S(e):t}function S(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function k(e){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(r);if(o){var n=k(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return g(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),E(S(n=i.call(this,e)),"_getInputValues",(function(){var e={};return n._inputList.forEach((function(t){e[t.id]=t.value})),e})),E(S(n),"_submitForm",(function(e){e.preventDefault(),n.saving(),n._handleSubmitForm(n._getInputValues()).catch((function(e){console.log(e)})).finally((function(){n.close(),n.rebuildButtonText()}))})),n._handleSubmitForm=t,n._form=n._popupSelector.querySelector(".popup__form"),n._inputList=Array.from(n._form.querySelectorAll(".popup__input")),n._submit=n._popupSelector.querySelector(".popup__submit"),n._buttonText=n._submit.textContent,n}return t=u,(n=[{key:"setEventListeners",value:function(){v(k(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._submitForm)}},{key:"close",value:function(){v(k(u.prototype),"close",this).call(this),this._form.reset()}},{key:"saving",value:function(){this._submit.textContent="Сохранение",this._submit.disabled=!0}},{key:"rebuildButtonText",value:function(){this._submit.textContent=this._buttonText,this._submit.disabled=!1}}])&&m(t.prototype,n),u}(c);function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var O=function(){function e(t){var n=t.profileName,r=t.profileOcupation,o=t.profileAvatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._job=document.querySelector(r),this._avatar=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{_name:this._name.textContent,_job:this._job.textContent,_userId:this._userId}}},{key:"setUserInfo",value:function(e,t){this._name.textContent=e,this._job.textContent=t,this._userId=_userId,this._avatar.src=newAvatar}}])&&C(t.prototype,n),e}(),L=document.querySelector(".popup_type_edit-profile"),q=(document.querySelectorAll(".popup__close"),L.querySelector(".popup__input_user_name")),I=L.querySelector(".popup__input_user_description"),j=(document.querySelector(".profile__name"),document.querySelector(".profile__description"),document.querySelector(".popup_type_add-card")),P=(document.querySelector(".popup_type_image-overlay"),document.querySelector(".profile__edit-button")),B=document.querySelector(".profile__add-button"),x=(j.querySelector(".popup__input_card_name"),j.querySelector(".popup__input_card_link"),document.querySelector(".popup__image"),document.querySelector(".popup__caption"),document.querySelector(".cards")),A=(document.querySelectorAll(".popup"),document.querySelector(".popup_avatar")),R=document.querySelector(".profile__avatar"),U=["formSelector"];var T={formSelector:".popup__form",inputSelector:".popup__input",submitButton:".popup__submit",inputErrorClass:"popup__input_type_error",inputErrorActiveClass:"popup__input-error_active"},D=new Api({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-25",headers:{authorization:"5a7352ec-99bd-4773-b9d9-e2ab00fb6a8e","content-type":"application/json"}}),F=Q(T,j),H=Q(T,L),V=Q(T,A),N=new u({items:[],renderer:function(e){var t=K(e.name,e.link);N.addItem(t.element)}},x);N.rendererItems();var z=new h(".popup_type_image-overlay");z.setEventListeners();var M=new w(".popup_type_add-card",(function(e){return D.postNewCard(e["card-title"],e["card-link"]).then((function(e){var t=K(e);N.addItem(t.element)}))}));M.setEventListeners();var W=new w(".popup_type_edit-profile",(function(e){return D.changeUserInfo(e["user-name"],e["user-description"]).then((function(e){G.setUserInfo(e._id,e.name,e.description,e.avatar)}))}));W.setEventListeners();var G=new O({profileName:".profile__name",profileOcupation:".profile__description",profileAvatar:".profile__image"}),J=new w(".popup_avatar",(function(e){return D.updateAvatar(e.avatarLink).then((function(e){console.log(e),G.setUserInfo(e._id,e.name,e.description,e.avatar)}))}));function K(e){return new t(G.getUserInfo().userId,e,"#card-template",(function(){z.open(e.title,e.link)}),(function(){return D.deleteCard(e._id)}),(function(){return D.like(e._id)}),(function(){return D.dislike(e._id)}))}function Q(e,t){var n=e.formSelector,r=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,U),i=t.querySelector(n),u=new o(r,i);return u.enableValidation(),u}J.setEventListeners(),D.getUserInfo().then((function(e){console.log(e),G.setUserInfo(e._id,e.name,e.description,e.avatar)})).then((function(){D.getInitialCards().then((function(e){e.forEach((function(e){var t=K(e);N.addItem(t.element)}))}))})).catch((function(e){console.log(e)})),P.addEventListener("click",(function(){H.initForm(),W.open();var e=G.getUserInfo();q.value=e._name,I.value=e._job})),B.addEventListener("click",(function(){M.open(),F.initForm()})),R.addEventListener("click",(function(){J.open(),V.initForm()}))})();