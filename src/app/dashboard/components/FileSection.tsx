import React, {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { Route } from "@/lib/Route";
import { Button } from "@/components/ui/button";
import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirectService } from "@/lib/Definitions";

type Props = {
	setNewDialogOpen: Dispatch<SetStateAction<boolean>>;
	newDialogOpen: boolean;
};

export const FileSection: FC<Props> = ({ setNewDialogOpen, newDialogOpen }) => {
	const deleteRoute = (id: string) => {
		redirectService.deleteRoute(id).then(() => fetchRoutes());
	};

	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const columns = createColumns(deleteRoute);

	const fetchRoutes = () => {
		redirectService.getAllRoutes().then((routes) => {
			if (routes != null) {
				setRoutes(routes);
			}
		});
	};

	const [routes, setRoutes] = useState<Route[]>([]);

	useEffect(() => {
		if (newDialogOpen == false) {
			fetchRoutes();
		}
	}, [newDialogOpen]);

	const table = useReactTable({
		data: routes,
		columns: columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<>
			<div className="w-full p-4">
				<h1 className="text-3xl font-semibold">Files</h1>
				<div className="flex items-center py-4">
					<Input
						placeholder="Filter routes..."
						value={(table.getColumn("route")?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn("route")?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
					<Button onClick={() => setNewDialogOpen(true)} className="ml-auto">
						New file
					</Button>
				</div>
				<div className="border rounded-md">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<div className="flex items-center justify-end py-4 space-x-2">
					<div className="flex-1 text-sm text-muted-foreground">
						{table.getFilteredSelectedRowModel().rows.length} of{" "}
						{table.getFilteredRowModel().rows.length} row(s) selected.
					</div>
					<div className="space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

const createColumns = (
	deleteRoute: (_: string) => void
): ColumnDef<Route>[] => {
	return [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("status")}</div>
			),
		},
		{
			accessorKey: "route",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Route
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="ml-4 lowercase">{row.getValue("route")}</div>
			),
		},
		{
			accessorKey: "link",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Link
						<CaretSortIcon className="w-4 h-4 ml-2" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="lowercase">{row.getValue("link")}</div>
			),
		},
		{
			accessorKey: "activations",
			header: () => <div className="text-right">Activations</div>,
			cell: ({ row }) => {
				const amount = parseFloat(row.getValue("activations"));

				// Format the amount as a dollar amount
				const formatted = new Intl.NumberFormat("en-US").format(amount);

				return <div className="font-medium text-right">{formatted}</div>;
			},
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				return (
					<>
						{/* <EditDialog
							open={isEditDialogOpened}
							setOpen={setEditDialogOpen}
							currentRow={row}
						/> */}

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="w-8 h-8 p-0">
									<span className="sr-only">Open menu</span>
									<DotsHorizontalIcon className="w-4 h-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>

								<DropdownMenuItem disabled onClick={() => {}}>
									Edit
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										deleteRoute(row.getValue("route"));
									}}
								>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</>
				);
			},
		},
	];
};
