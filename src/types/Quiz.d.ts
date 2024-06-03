interface Quiz {
	_id: string;
	title: string;
	question: string;
	difficulty: string;
	kind: string[];
	options: string[];
	correct: string;
	solvedBy: User[];
	owner: User;
}
