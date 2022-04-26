const { access, constants, readFileSync, writeFileSync } = require('fs');
const { default: fetch } = require('node-fetch');
const path = require('path');

const Logger = {
  info: (msg) => console.log('\x1b[36m [ INFO ] %s ', msg),
  warn: (msg) => console.warn('\x1b[33m [ WARN ] %s ', msg),
  error: (msg) => console.error('\x1b[31m [ ERROR ] %s ', msg)
}

function readToken() {
  try {
    return String(readFileSync('./token.txt'))
  } catch (error) {
    return ''
  }
}

async function request(url, token) {
  return await fetch(url, {
    method: "get",
    headers: { "x-auth-key": token },
  }).then(async (data) => data)
}

module.exports = {
  Logger,
  readToken,
  request
}
