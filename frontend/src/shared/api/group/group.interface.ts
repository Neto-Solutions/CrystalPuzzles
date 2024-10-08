interface GroupI {
	name: string;
	trainer_id: number;
}

interface AddStudentI {
	student_id: number;
	group_id: number;
}

export type { GroupI, AddStudentI };
