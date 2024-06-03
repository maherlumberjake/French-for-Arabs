export default function Lvl({ lvl }: { lvl: string }) {
	switch (lvl) {
		case "newbie":
			return (
				<span
					className="border-2 text-sm sm:text-md p-1 
                capitalize rounded-md border-current dark:text-green-500
                   text-teal-700 "
				>
					newbie
				</span>
			);
		case "intermediate":
			return (
				<span
					className="border-2 text-sm sm:text-md p-1 
                capitalize rounded-md border-current dark:text-lime-400
                 text-blue-600 "
				>
					intermediate
				</span>
			);
		case "advanced":
			return (
				<span
					className="border-2 text-sm sm:text-md p-1 
                capitalize rounded-md border-current dark:text-yellow-500
                  text-purple-700 "
				>
					advanced
				</span>
			);
		case "expert":
			return (
				<span
					className="border-2 text-sm sm:text-md p-1 
                capitalize rounded-md border-current  dark:text-orange-500
                  text-orange-700 "
				>
					expert
				</span>
			);
		case "native":
			return (
				<span
					className="border-2 text-sm sm:text-md p-1 
                capitalize rounded-md border-current dark:text-red-500
                  text-red-700 "
				>
					native
				</span>
			);
	}
}
