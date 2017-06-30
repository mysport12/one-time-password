const admin = require('firebase-admin');

module.exports = function(request, response) {
	if (!request.body.phone || !request.body.code) {
		return response.send({ error: 'Phone and code must be provided' });
	}

	const phone = String(request.body.phone).replace(/[^\d]/g, '');
	const code = parseInt(request.body.code);

	admin.auth().getUser(phone)
		.then(() => {
			const ref = admin.database().ref('Users/' + phone);
			ref.on('value', snapshot => {
				ref.off();
				const user = snapshot.val();

				if (user.code !== code || !user.codeValid) {
					return response.status(422).send({ error: 'Code not valid' });
				}

				ref.update({ codeValid: false });
				admin.auth().createCustomToken(phone)
					.then(token => response.send({ token }))
			});

		})
		.catch(err => {
			response.status(422).send({ error: err });
		})

}