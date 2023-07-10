export type Route = {
  route: string;
  link: string;
  activations: number;
  status: "active" | "inactive";
}