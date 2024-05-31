"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { convertToBase64 } from "../lib/Base64";
import ToolTip from "@/components/toolTip/toolTIp";
import { CustomAxiosError, axiosLocal } from "../lib/axiosConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
	const [encImage, setEncImage] = useState<string | null>();
	const navigate = useRouter();
	const [message, setMessage] = useState<string | null>();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setConfrimShowPassword] =
		useState<boolean>(false);
	const [sending, setSending] = useState<boolean>(false);
	async function handleChange(list: FileList | null) {
		if (list) {
			const file = list[0];
			const encoded = await convertToBase64(file);
			setEncImage(encoded);
		}
	}
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		setSending(true);
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		const password = data.get("password") as string;
		const confirmPassword = data.get("confirmPassword") as string;

		if (password != confirmPassword) {
			setMessage("passwords does match ");
			setTimeout(() => {
				setMessage(null);
			}, 3000);
		} else {
			const formDataObject = Object.fromEntries(data.entries());
			// Add thumbnailImg property to the object
			formDataObject.thumbnailImg = encImage || "noImg";
			try {
				setMessage(null);
				const res: { status: string; message: string; user: User } =
					await axiosLocal.post("/signUp", formDataObject);
				console.log(res);
				setMessage(res.message);
				if (res?.user && !message) {
					setTimeout(() => {
						navigate.replace("/");
					}, 3000);
				}
			} catch (err) {
				const error = err as CustomAxiosError;
				setMessage(error.message);
			} finally {
				setSending(false);
			}
		}
	}
	return (
		<>
			{message && <ToolTip msg={message} />}
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-20 sm:mt-10"
				encType="multipart/form-data"
			>
				<div>
					<h3 className="text-xl sm:text-2xl mb-6">Your image</h3>
					<div className=" border-dashed border-main border-4  h-5/6 grid place-content-center  min-h-60">
						<input
							type="file"
							name="thumbnailImg"
							id="thumbnailImg"
							accept=".png , .jpeg , .jpg"
							hidden
							onChange={(e) => handleChange(e.target.files)}
						/>
						{!encImage ? (
							<label htmlFor="thumbnailImg">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-12 cursor-pointer"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
									/>
								</svg>
							</label>
						) : (
							<div className=" relative">
								<Image
									src={encImage}
									alt="profile img"
									loading="lazy"
									width="300"
									height="300"
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-12 absolute top-0 right-0 cursor-pointer bg-red-500 p-2 rounded-full"
									onClick={() => {
										setEncImage(null);
									}}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
									/>
								</svg>
							</div>
						)}
					</div>
				</div>
				<div
					className=" grid grid-cols-1 *:flex *:flex-col *:dark:bg-light
				 *:bg-dark gap-4 *:rounded-sm *:gap-2 *:p-2"
				>
					<h3 className="text-xl sm:text-2xl !bg-transparent">
						Your information
					</h3>
					<div>
						<label
							htmlFor="name"
							className="text-main font-bold"
						>
							Name :
						</label>
						<input
							type="text"
							required
							name="name"
							id="name"
							placeholder="Jhon smith"
							className=" bg-transparent outline-none border-none text-light
							 dark:text-dark focus:placeholder:-translate-y-full 
							 placeholder:transition-transform placeholder:text-slate-500"
						/>
					</div>
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
					<div>
						<label
							htmlFor="confirmPassword"
							className="text-main font-bold"
						>
							Confirm Password
						</label>
						<div className="flex flex-row justify-between">
							<input
								type={showConfirmPassword ? "text" : "password"}
								name="confirmPassword"
								minLength={5}
								required
								id="confirmPassword"
								placeholder="confrim your password"
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
								 ${showConfirmPassword ? "text-main" : " text-light dark:text-dark"}`}
								onClick={() => setConfrimShowPassword((prev) => !prev)}
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
						value={sending ? "sending..." : "Sign up"}
						className="!bg-main !text-light !text-center font-bold  w-fit !rounded-sm cursor-pointer mx-auto"
					/>
				</div>
				<Link
					href="/logIn"
					className="text-center col-span-2 underline mb-4 text-xl
					 hover:text-main transition-colors"
				>
					Already have an account?
				</Link>
			</form>
		</>
	);
}
