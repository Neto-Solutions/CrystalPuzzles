class LS {
	get(key) {
		let value = localStorage.getItem(key);
		if (value === null || value === 'undefined' || value === 'null') {
			return null;
		}
		return JSON.parse(value);
	}

	set(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	has(key) {
		return localStorage.getItem(key) !== null;
	}

	remove(key) {
		localStorage.removeItem(key);
	}
}

export default new LS();
