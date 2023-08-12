import { Dispatch, FC, SetStateAction, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirectService } from "@/lib/Definitions";

type NewDialogProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export const NewLinkDialog: FC<NewDialogProps> = ({ open, setOpen }) => {
	const [link, setLink] = useState<string>("https://github.com/devsamuelv");
	const [route, setRoute] = useState<string>("github");
	const [status, setStatus] = useState<"active" | "inactive">();

	const saveRoute = () => {
		redirectService.createRoute({
			activations: 0,
			link: (link || "").toLowerCase(),
			route: (route || "").toLowerCase(),
			status: "active",
		});

		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild></DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>New route</DialogTitle>
					<DialogDescription>
						Create your route here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid items-center grid-cols-4 gap-4">
						<Label htmlFor="route" className="text-right">
							Route
						</Label>
						<Input
							id="route"
							value={route}
							onChange={(e) => setRoute(e.target.value)}
							className="col-span-3"
						/>
					</div>
					<div className="grid items-center grid-cols-4 gap-4">
						<Label htmlFor="link" className="text-right">
							Link
						</Label>
						<Input
							id="link"
							value={link}
							onChange={(e) => setLink(e.target.value)}
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={() => saveRoute()}>
						Create route
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
