interface GroupI {
	name: string;
	trainer_id: number;
}

interface UpdateGroupI extends GroupI {
	id: number;
}

export type { GroupI, UpdateGroupI };
