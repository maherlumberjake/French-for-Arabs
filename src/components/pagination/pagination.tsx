"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Pagination({
	total,
	page,
}: {
	total: number;
	page: number;
}) {
	const [currentPage, setCurrentPage] = useState<number>(page);
	const path = usePathname();
	const searchParams = useSearchParams();
	const search = new URLSearchParams(searchParams);
	const router = useRouter();
	const maxPage = total && Math.ceil(total / 6);

	search.set("page", currentPage.toString());
	router.push(`${path}?${search}`);
	return (
		<div className=" flex justify-between w-1/5 items-center my-4">
			{currentPage >= 2 && (
				<button
					onClick={() => setCurrentPage((p) => p - 1)}
					className="bg-main text-light text-center p-2 rounded-md"
				>
					{" "}
					{currentPage - 1} &lt;
				</button>
			)}
			<span className=" text-main font-bold">{currentPage}</span>
			{maxPage != currentPage && (
				<button
					onClick={() => setCurrentPage((p) => p + 1)}
					className="bg-main text-light text-center p-2 rounded-md"
				>
					{" "}
					{currentPage + 1} &gt;
				</button>
			)}
		</div>
	);
}
