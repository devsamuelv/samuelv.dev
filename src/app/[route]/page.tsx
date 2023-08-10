"use client";

import { redirectService } from "@/lib/definitions";
import { useParams, useRouter } from "next/navigation";
import { FC, useState } from "react";

const Page: FC = (props) => {
	const router = useRouter();
	const { route } = useParams();
	const [valid, setValid] = useState<boolean>();
	const [response, setResponse] = useState<string>();

	redirectService
		.getRoute(route.toLowerCase())
		.then((r) => {
			if (r != null) {
				router.replace(r.link);
				setValid(true);
				setResponse("Redirecting....");
			} else {
				setValid(false);
				setResponse("Invalid url");
			}
		})
		.catch((err) => {
			setValid(false);
			setResponse(err.message);
		});

	return (
		<div>{valid == null ? <div>Loading...</div> : <div>{response}</div>}</div>
	);
};

export default Page;
