  export default class UserInfo {
  constructor({profileName, profileOcupation}) {
    this._name = document.querySelector(profileName);
    this._job = document.querySelector(profileOcupation);
  }

  getUserInfo() {
    return {
      _name: this._name.textContent,
      _job: this._job.textContent
    }
  }

  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput;
    this._job.textContent = jobInput;
  }
}
