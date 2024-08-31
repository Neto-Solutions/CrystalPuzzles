interface IAddParams {
	space_id: string;
	trainer_id: string;
	trainer_comments: string;
	start: string;
}

interface IParams {
	start?: string;
	end?: string;
	trainer?: string;
	limit?: number;
	offset?: number;
}

export type { IAddParams, IParams };
