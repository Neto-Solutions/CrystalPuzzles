interface TrainingI {
	training_id: number;
	repetitions: number;
	assessment: number;
}

interface CheckListI {
	lesson_id: number;
	student_ids: number[];
	training_check: TrainingI[];
}

interface UserI {
	student_id: number;
	lesson_id: number;
}

export { type CheckListI, type UserI };
