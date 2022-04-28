const { readFileSync } = require('fs');
const { writeFile } = require('fs/promises')

const { default: fetch } = require('node-fetch');
const path = require('path');

const Logger = {
  info: (msg) => console.log('\x1b[36m [ INFO ] %s ', msg),
  warn: (msg) => console.warn('\x1b[33m [ WARN ] %s ', msg),
  error: (msg) => console.error('\x1b[31m [ ERROR ] %s ', msg)
}

const readSession = async () => {
  try {
    return String(readFileSync('./Session.json'))
  } catch (error) {
    await writeFile('./Session.json', '{ "token": "", "cookie": ""}')
    return String(readFileSync('./Session.json'))
  }
}

const request = async (url, { token = '', cookie = '' }) => {
  return await fetch(url, {
    method: "get",
    headers: {
      "x-auth-key": token,
      "cookie": cookie,
    },
  }).then(async (data) => data)
}


module.exports = {
  Logger,
  readSession,
  request,
}
