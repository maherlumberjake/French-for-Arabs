export default function Lvl({ lvl }: { lvl: number }) {
	switch (lvl) {
		case 1:
			return (
				<span
					className="border-2 text-sm sm:text-md p-1 
                capitalize rounded-md border-current dark:text-green-500
                   text-teal-700 "
				>
					newbie
				</span>
			);
		case 2:
			return (
				<span
					className="border-2 text-sm sm:text-md p-1 
                capitalize rounded-md border-current dark:text-lime-400
                 text-blue-600 "
				>
					intermediate
				</span>
			);
		case 3:
			return (
				<span
					className="border-2 text-sm sm:text-md p-1 
                capitalize rounded-md border-current dark:text-yellow-500
                  text-purple-700 "
				>
					advanced{" "}
				</span>
			);
		case 4:
			return (
				<span
					className="border-2 text-sm sm:text-md p-1 
                capitalize rounded-md border-current  dark:text-orange-500
                  text-orange-700 "
				>
					expert
				</span>
			);
		case 5:
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
