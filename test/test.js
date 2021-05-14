const bcrypt = require('bcrypt');

(async() => {
	let password = await bcrypt.hash('123456', 10);
	console.log(password)
})();