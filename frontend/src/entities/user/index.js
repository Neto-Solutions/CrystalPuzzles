import { authUser, updateToken, registerUser, getProfile } from './api';
class User {
	_role = null;
	constructor(data) {
		if (!data) return;
		const { role, ...rest } = data;
		this._role = role;
		Object.assign(this, rest);
	}
	get role() {
		return this._role;
	}

	async login({ username, password }) {
		await authUser({ username, password }).then(function () {
			getProfile().then(function (data) {
				const { role, ...rest } = data;
				this._role = role;
				Object.assign(this, rest);
			});
		});
	}
}

export { User };
export * from './model/slice';
