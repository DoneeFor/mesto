  export default class UserInfo {
  constructor({profileName, profileOcupation}) {
    this.name = document.querySelector(profileName);
    this.job = document.querySelector(profileOcupation);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      job: this.job.textContent
    }
  }

  setUserInfo(nameInput, jobInput) {
    this.name.textContent = nameInput;
    this.job.textContent = jobInput;
  }
}
