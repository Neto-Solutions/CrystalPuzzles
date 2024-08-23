class LS {
	get(key: string) {
		let value = localStorage.getItem(key);
		if (value === null || value === 'undefined' || value === 'null') {
			return null;
		}
		return JSON.parse(value);
	}

	set(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	has(key: string) {
		return localStorage.getItem(key) !== null;
	}

	remove(key: string) {
		localStorage.removeItem(key);
	}
}

export default new LS();
