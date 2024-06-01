"use client";
import ToolTip from "@/components/toolTip/toolTIp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CustomAxiosError, axiosLocal } from "../lib/axiosConfig";

export default function LogIn() {
	const navigate = useRouter();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [sending, setSending] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>();
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		setSending(true);
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		const formDataObject = Object.fromEntries(data.entries());
		console.log(formDataObject);
		try {
			setMessage(null);
			const res: { status: string; message: string; user: User } =
				await axiosLocal.post("/logIn", formDataObject);
			console.log(res);
			setMessage(res.message);
			if (res?.user && !message) {
				setTimeout(() => {
					navigate.replace("/");
				}, 3000);
				setTimeout(() => {
					navigate.refresh();
				}, 3500);
			}
		} catch (err) {
			const error = err as CustomAxiosError;
			setMessage(error.message);
		} finally {
			setSending(false);
		}
	}

	return (
		<>
			{message && <ToolTip msg={message} />}
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="grid grid-cols-1 gap-4 mt-20 sm:mt-10 w-full sm:max-w-96 mx-auto"
			>
				<div
					className=" grid grid-cols-1 *:flex *:flex-col *:dark:bg-light  justify-center
				 *:bg-dark gap-4 *:rounded-sm *:gap-2 *:p-2"
				>
					<h3 className="text-xl sm:text-2xl !bg-transparent block text-center">
						Welcome back
					</h3>
					<div>
						<label
							htmlFor="email"
							className="text-main font-bold"
						>
							Email :
						</label>
						<input
							type="email"
							required
							name="email"
							id="email"
							placeholder="Jhon12@example.com"
							className=" bg-transparent outline-none border-none text-light
							 dark:text-dark focus:placeholder:-translate-y-full 
							 placeholder:transition-transform placeholder:text-slate-500"
						/>
					</div>
					<div>
						<label
							htmlFor="Password"
							className="text-main font-bold"
						>
							Password :
						</label>
						<div className="flex flex-row justify-between">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								required
								id="Password"
								minLength={5}
								placeholder="yourPassword132"
								className=" bg-transparent outline-none border-none text-light
							 dark:text-dark focus:placeholder:-translate-y-full 
							 placeholder:transition-transform placeholder:text-slate-500 "
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className={`size-6  cursor-pointer
								 ${showPassword ? "text-main" : " text-light dark:text-dark"}`}
								onClick={() => setShowPassword((prev) => !prev)}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
						</div>
					</div>
					<input
						disabled={sending}
						type="submit"
						value={sending ? "sending..." : "Log in"}
						className="!bg-main !text-light !text-center font-bold  w-fit !rounded-sm cursor-pointer mx-auto hover:opacity-85"
					/>
				</div>
				<Link
					href="/signup"
					className="text-center col-span-2 underline mb-4 text-xl
					 hover:text-main transition-colors"
				>
					Dont have an account?
				</Link>
			</form>
		</>
	);
}
