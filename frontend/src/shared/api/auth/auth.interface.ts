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
	reload?: boolean;
}

interface ExtentionParams {
	phone_number?: 'string';
	area?: 'string';
	accompanying?: 'string';
	health_data?: 'string';
	triggers?: 'string';
}
interface EditProfileParams {
	firstname?: string;
	lastname?: string;
	surname?: string;
	birthday?: string;
	is_man?: boolean;
	contact?: string;
	extentions: ExtentionParams;
}

export type { RegisterParams, LoginParams, EditProfileParams };
