import { Dispatch, FC, SetStateAction, useState } from "react";
import {
	Dialog,
	DialogContentNoClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirectService } from "@/lib/definitions";

type AuthDialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export const AuthDialog: FC<AuthDialogProps> = ({ open, setOpen }) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const login = async () => {
		const session = await redirectService.login(email, password);

		if (session != null) {
			setOpen(false);
		}
	};

	return (
		<Dialog open={open}>
			<DialogContentNoClose className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Authentication</DialogTitle>
					<DialogDescription>You&apos;re not signed in!</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid items-center grid-cols-4 gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid items-center grid-cols-4 gap-4">
						<Label htmlFor="password" className="text-right">
							Password
						</Label>
						<Input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button className="w-full" type="submit" onClick={() => login()}>
						Login
					</Button>
				</DialogFooter>
			</DialogContentNoClose>
		</Dialog>
	);
};
