export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      userName: this._name.textContent,
      userOccupation: this._job.textContent
    };
  }

  setUserInfo(name, job) {
    if(name) {
      this._name.textContent = name;
    }
    if(job) {
      this._job.textContent = job;
    }
  }

  setUserAvatar(link) {
    if(link) {
      this._avatar.src = link;
    }
  }
}
