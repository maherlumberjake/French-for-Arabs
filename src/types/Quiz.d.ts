interface Quiz {
	title: string;
	question: string;
	difficulty: number;
	kind: string[];
	options: string[];
	correct: string;
	solvedBy: User[];
}
