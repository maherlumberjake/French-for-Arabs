export const convertToBase64: (file: File) => Promise<string> = (
	file: File
) => {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => res(reader.result as string);
		reader.onerror = (err) => rej(err);
	});
};
