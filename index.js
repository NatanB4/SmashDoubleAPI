// const fetch = require('node-fetch');
// const { readFileSync } = require('fs');
// const CheckToken = require('./Events/CheckToken.js');
require("dotenv").config({ path: __dirname + "/.env" });
const { request } = require("./helpers/BaseCommand");
// const events = require('events');
const { CheckSession } = require("./helpers/CheckSession");
// const eventEmitter = new events.EventEmitter();

module.exports = class SmashApi {
  user = {
    username: "",
    password: "",
  };

  constructor({ username, password }) {
    this.user.username = username;
    this.user.password = password;
  }

  async currentRollete() {
    const { token } = await CheckSession(this.user);
    return await request(
      "https://br-game-api.t1tcp.com/mini/double/opencodes?&pagesize=15&page=1",
      { token }
    );
  }

  async listBalance() {
    const { cookie } = await CheckSession(this.user);
    return await request(
      "https://player.smashup.com/async/available_subwallet_list/true?callback=jQuery1113023060357254788189_1651067150177&_=1651067150188",
      { cookie }
    );
  }

  async outherInformations() {
    const { cookie } = await CheckSession(this.user);
    return await request(
      "https://player.smashup.com/async/variables?callback=jQuery111307946989289506177_1651067780325&_=1651067780326",
      { cookie }
    )
  }

  async userProfile() {
    const { token } = await CheckSession(this.user);
    return await request(
      "https://br-game-api.t1tcp.com/mini/profile?",
      { token }
    )
  }

  async lastColor() {
    const { token } = await CheckSession(this.user);
    return await request("https://br-game-api.t1tcp.com/mini/double/period?",
      { token }
    )
  }

  async userNotifications() {
    const { cookie } = await CheckSession(this.user);
    return await request("https://player.smashup.com/async/player_notify?callback=jQuery111304514409857539876_1651068030449&_=1651068030456", { cookie })
  }

  async betGame() {
    const { token } = await CheckSession(this.user);
    return await request("https://br-game-api.t1tcp.com/mini/double/bets?&pagesize=15&page=1",
      { token }
    )
  }

  async htmlSmash() {
    const { cookie } = await CheckSession(this.user);
    return await request("https://player.smashup.com/async/get_unread_messages?callback=jQuery111306861107840116993_1651068026368&_=1651068026374", { cookie })
  }
};
