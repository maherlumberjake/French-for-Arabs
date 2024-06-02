"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<input
			type="submit"
			value={pending ? "sending..." : "send"}
			disabled={pending}
			className={`${
				pending ? "opacity-85" : "opacity-100"
			} " bg-main text-light text-xl font-bold capitalize p-2 rounded-md hover:opacity-80 transition-colors my-8" `}
		/>
	);
}
