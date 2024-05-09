class User {
	name = null;
	avatar = null;
	#role = null;
	constructor(data) {
		if (!data) return;
		const { role, ...rest } = data;
		this.#role = role;
		Object.assign(this, rest);
	}
	get role() {
		return this.#role;
	}
}

export default User;
