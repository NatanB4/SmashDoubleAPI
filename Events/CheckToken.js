const { request, readToken, Logger } = require("../commands/BaseCommand");
const TokenCapture = require("../commands/TokenCapture");

module.exports = async function ({ username, password }) {
    const token = readToken()
    const data = await request('https://br-game-api.t1tcp.com/mini/double/opencodes?&pagesize=15&page=1', token)

    if (data.status !== 200) {
        Logger.warn('Token inválido. Gerando um novo token')
        await new TokenCapture(username, password).run()
    }
}