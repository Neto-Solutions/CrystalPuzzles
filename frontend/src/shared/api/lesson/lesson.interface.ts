interface LessonCreateParams {
	space_id: number;
	trainer_id: number;
	trainer_comments?: string;
	start: string;
}

interface LessonGetParams {
	start?: string;
	end?: string;
	trainer?: string;
	limit?: number;
	offset?: number;
}

interface LessonUpdateParams {
	id: string | number;
	space_id?: number;
	trainer_id?: number;
	trainer_comments?: string;
	start?: string;
	exercises?: string;
	students?: string;
}

interface StudentI {
	lesson_id: number | string;
	student_id: number;
}

export type {
	LessonCreateParams,
	LessonGetParams,
	LessonUpdateParams,
	StudentI
};
