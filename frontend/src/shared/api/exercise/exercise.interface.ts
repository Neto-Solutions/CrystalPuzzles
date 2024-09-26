interface ExerciseI {
	name: string;
	description: string;
}

interface ExerciseUpdateI extends ExerciseI {
	id: number;
}

export type { ExerciseI, ExerciseUpdateI };
