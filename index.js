// const fetch = require('node-fetch');
// const { readFileSync } = require('fs');
const { CurrentRollete } = require('./Routes/CurrentRollete.js');
// const CheckToken = require('./Events/CheckToken.js');
require('dotenv').config({ path: __dirname + '/.env' });
const events = require('events');
const { CheckToken } = require('./commands/CheckToken');
const eventEmitter = new events.EventEmitter();

module.exports = class SmashApi {
  user = {
    username: '',
    password: '',
  }

  constructor({ username, password }) {
    this.user.username = username
    this.user.password = password
  }

  async currentRollete() {
    await CheckToken(this.user)
    return CurrentRollete()
  }
}
// (async function start() {
//   let token = String(readFileSync('./token.txt'))

//   await fetch('https://br-game-api.t1tcp.com/mini/double/opencodes?&pagesize=15&page=1', {
//     method: "get",
//     headers: { "x-auth-key": token },
//   }).then(async (data) => {
//     const request = await data.json();



//     console.log(request) // todas as cores na roleta atual!
//   });
// })();