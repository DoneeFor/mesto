export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return [this._name.textContent, this._job.textContent];
  }
  setUserInfo(name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }

  setUserAvatar(link) {
    this._avatar.src = link;
  }
}