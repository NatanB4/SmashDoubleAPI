const { readSession, request, Logger } = require("./BaseCommand")
const SessionCapture = require("./SessionCapture")

const CheckToken = async ({ username, password }) => {
    const { token } = JSON.parse(readSession())
    const data = await request('https://br-game-api.t1tcp.com/mini/double/opencodes?&pagesize=15&page=1', token)

    if (data.status !== 200) {
        Logger.warn('Token inválido. Gerando um novo token')
        await new SessionCapture(username, password).run()
    }

    return token
}

module.exports = { CheckToken }