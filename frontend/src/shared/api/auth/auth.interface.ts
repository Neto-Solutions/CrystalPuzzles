interface RegisterParams {
	email: string;
	password: string;
	firstname: string;
	lastname: string;
	surname: string;
	birthday: string;
	is_man: boolean;
	contact: string;
}
interface LoginParams {
	email: string;
	password: string;
}

export type { RegisterParams, LoginParams };
