"use client";

import { redirectService } from "@/lib/definitions";
import { useParams, useRouter } from "next/navigation";
import { FC, useState } from "react";

const Page: FC = (props) => {
	const router = useRouter();
	const { route } = useParams();
	const [valid, setValid] = useState<boolean>();

	redirectService.getRoute(route.toLowerCase()).then((r) => {
		if (r != null) {
			router.replace(r.link);
			setValid(true);
		} else {
			setValid(false);
		}
	});

	return (
		<div>
			{valid == null ? (
				<div>Loading...</div>
			) : (
				<div>{valid ? <div>Redirecting</div> : <div>Invalid url</div>}</div>
			)}
		</div>
	);
};

export default Page;
