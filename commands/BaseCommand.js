const { access, constants, readFileSync, writeFileSync } = require('fs');
const { default: fetch } = require('node-fetch');
const path = require('path');

const Logger = {
  info: (msg) => console.log('\x1b[36m [ INFO ] %s ', msg),
  warn: (msg) => console.warn('\x1b[33m [ WARN ] %s ', msg),
  error: (msg) => console.error('\x1b[31m [ ERROR ] %s ', msg)
}

const readToken = () => {
  try {
    return String(readFileSync('./token.txt'))
  } catch (error) {
    return ''
  }
}

const request = async (url, token) => {
  return await fetch(url, {
    method: "get",
    headers: { "x-auth-key": token },
  }).then(async (data) => data)
}

const CheckToken = async ({ username, password }) => {
  const token = readToken()
  const data = await request('https://br-game-api.t1tcp.com/mini/double/opencodes?&pagesize=15&page=1', token)

  if (data.status !== 200) {
    Logger.warn('Token inválido. Gerando um novo token')
    await new TokenCapture(username, password).run()
  }
}

module.exports = {
  Logger,
  readToken,
  request,
  CheckToken
}
