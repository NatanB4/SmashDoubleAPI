const SmashApi = require("./index");

(async () => {
    const user = {
        username: '',
        password: ''
    }
    
   console.log(await new SmashApi(user).currentRollete())
})();
