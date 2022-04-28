const { readSession, request, Logger } = require("./BaseCommand")
const SessionCapture = require("./SessionCapture")

const CheckSession = async ({ username, password }) => {
    const Session = await readSession()
    const { token, cookie } = JSON.parse(Session)
    const data = await request('https://br-game-api.t1tcp.com/mini/double/opencodes?&pagesize=15&page=1', {token})

    if (data.status !== 200) {
        Logger.warn('Sessão inválida, gerando uma nova sessão.')
        await new SessionCapture(username, password).run()
    }

    return {token, cookie}
}

module.exports = { CheckSession }