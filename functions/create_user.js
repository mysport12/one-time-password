const admin = require('firebase-admin');

module.exports = function(request, response) {
	if (!request.body.phone) {
		return response.status(422).send({ error: 'Bad Input' });
	}

	const phone = String(request.body.phone).replace(/[^\d]/g, "");

	admin.auth().createUser({ uid: phone })
		.then(user => response.send(user))
		.catch(err => response.status(422).send({ error: err }));
}