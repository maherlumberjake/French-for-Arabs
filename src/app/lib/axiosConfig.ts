import axios, { AxiosError } from "axios";

export interface CustomAxiosError {
	status: string;
	message: string;
}

export const axiosLocal = axios.create({
	baseURL: "api",
	timeout: 40000,
});
axiosLocal.interceptors.response.use(
	(res) => {
		return res?.data;
	},
	(err: AxiosError) => {
		return err.response?.data as CustomAxiosError;
	}
);
