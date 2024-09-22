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

export { type TrainingI, type CheckListI };
