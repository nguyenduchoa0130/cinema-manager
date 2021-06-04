const helper = require('./config/helper');
(async () => {
    try {
        let result = await helper.checkLinkTrailer('https://www.youtube.com/watch?v=_wvOX4G6bgQ');
        console.log(result);
    } catch (err) {
        console.log(err);
    }
})();
