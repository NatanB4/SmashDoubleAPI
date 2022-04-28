const SmashApi = require(".");

(async () => {
    const user = {
        username: '',
        password: '',
    }

    console.log(await new SmashApi(user).currentRollete())
})()