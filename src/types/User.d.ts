interface User {
	_id: string;
	name: string;
	email: string;
	password: string;
	honorPoints: number;
	confirmPassword: string;
	thumbnailImg: string;
	role: boolean;
	solvedList: string[] | Quiz[];
	owned: Quiz[];
}
