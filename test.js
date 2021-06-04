const helper = require('./config/helper');
(async () => {
    try {
        let result = await helper.isValidEmail('nguyenduchoa0130@gmail.com');
        console.log(result);
    } catch (err) {
        console.log(err);
    }
})();
