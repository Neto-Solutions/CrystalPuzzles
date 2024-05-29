export function mapUserForm(e) {
	const data = {};

	for (let i = 0; i < e.target.length; i++) {
		let key = e.target[i].getAttribute('data-key');
		if (key) {
			data[key] = e.target[i].value;
		}
	}

	return data;
}
