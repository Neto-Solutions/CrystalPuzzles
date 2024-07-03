class LS {
	get(key) {
		let value = localStorage.getItem(key);
		if (value === null || value === 'undefined' || value === 'null') {
			return 0;
		}
		if (value.length <= 10) {
			return value;
		}
		return 'data:image/png;base64,' + value;
	}

	set(key, value) {
		localStorage.setItem(key, value);
	}

	remove(key) {
		localStorage.removeItem(key);
	}
}

export default new LS();
