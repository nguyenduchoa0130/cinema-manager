const multer = require('multer');
const memoryStorage = multer.memoryStorage();

const uploads = multer({
    storage: memoryStorage,
});
module.exports = uploads;
