"use client";

import { FC, useEffect, useState } from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Route } from "@/lib/Route";
import { NewLinkDialog } from "./dialogs/NewLinkDialog";
import { AuthDialog } from "./dialogs/AuthDialog";
import { redirectService } from "@/lib/Definitions";
import Head from "next/head";
import { LinkSection } from "./components/LinkSection";
import { FileSection } from "./components/FileSection";

const Page: FC = () => {
	const [newLinkDialogOpen, setLinkNewDialogOpen] = useState<boolean>(false);
	const [newFileDialogOpen, setFileNewDialogOpen] = useState<boolean>(false);
	const [authDialogOpen, setAuthDialogOpen] = useState<boolean>(false);

	useEffect(() => {
		redirectService.isAuthenticated().then((e) => {
			if (e) {
				setAuthDialogOpen(false);
			} else {
				setAuthDialogOpen(true);
			}
		});
	}, []);

	return (
		<div className="flex flex-row h-screen">
			<Head>Dashboard</Head>
			<NewLinkDialog open={newLinkDialogOpen} setOpen={setLinkNewDialogOpen} />
			<AuthDialog open={authDialogOpen} setOpen={setAuthDialogOpen} />

			<div className="flex flex-col w-full space-y-3">
				<LinkSection
					setNewDialogOpen={setLinkNewDialogOpen}
					setAuthDialogOpen={setAuthDialogOpen}
					newDialogOpen={newLinkDialogOpen}
					authDialogOpen={authDialogOpen}
				/>

				<FileSection
					newDialogOpen={newFileDialogOpen}
					setNewDialogOpen={setFileNewDialogOpen}
				/>
			</div>
		</div>
	);
};

export default Page;
