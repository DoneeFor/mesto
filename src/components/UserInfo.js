  export default class UserInfo {
  constructor({profileName, profileOcupation, profileAvatar}) {
    this._name = document.querySelector(profileName);
    this._job = document.querySelector(profileOcupation);
    this._avatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      _name: this._name.textContent,
      _job: this._job.textContent,
      _userId: this._userId
    }
  }

  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput;
    this._job.textContent = jobInput;
    this._userId = _userId;
    this._avatar.src = newAvatar;
  }
}
