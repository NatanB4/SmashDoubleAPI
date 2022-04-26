const events = require('events');
const eventEmitter = new events.EventEmitter();

eventEmitter.on('token', async (func, data, { assync = false }) => {
    return assync ? await func(data) : func(data)
})

module.exports = class Event {
    constructor() {
        this.events = ['token']
    }

    setListerning(event, func, data) {
        if (this.events.includes(event)) eventEmitter.emit(event, func, data)
    }
}