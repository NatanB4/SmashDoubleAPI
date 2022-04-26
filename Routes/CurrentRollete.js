const { Logger, verifyTokenPath, readToken, request } = require("../commands/BaseCommand");

const CurrentRollete = async () => {
    const token = readToken('./token.txt')
    return await request('https://br-game-api.t1tcp.com/mini/double/opencodes?&pagesize=15&page=1', token)
}

module.exports = {
    CurrentRollete,
}