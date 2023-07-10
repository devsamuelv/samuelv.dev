import { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { Route } from "./Route";
import { DatabaseRoute } from "./DatabaseRoute";

/**
 * This service handles all redirect operations.
 */
export class RedirectService {
  private client: SupabaseClient;

  constructor(client_id: string, client_secret: string) {
    this.client = new SupabaseClient(client_id, client_secret);
  }

  public registerListener(eventName: string, callback: () => void) {
    // @ts-ignore
    this.client.realtime.channel("routes").on('postgres_changes',
      {
        event: eventName,
      }, callback).subscribe();
  }

  /**
   * Creates a new route.
   * @param route 
   * @returns 
   */
  public async createRoute(route: Route): Promise<Route[] | null> {
    const dbRoute: DatabaseRoute = { activations: route.activations, link: route.link, route: route.route, active: route.status == "active" }
    const { error } = await this.client.from("routes").insert(dbRoute);
    const { data } = await this.client.from("routes").select<string, Route>();

    if (error != null) {
      return Promise.reject(error.message)
    }

    return data;
  }

  /**
   * Creates a new route.
   * @param route 
   * @returns 
   */
  public async updateRoute(route: Route): Promise<Route[] | null> {
    const dbRoute: DatabaseRoute = { activations: route.activations, link: route.link, route: route.route, active: route.status == "active" }
    const { error } = await this.client.from("routes").update(dbRoute);
    const { data } = await this.client.from("routes").select<string, Route>();

    if (error != null) {
      return Promise.reject(error.message)
    }

    return data;
  }

  /**
   * Resolves all the data for a specific route.
   * @param route 
   * @returns 
   */
  public async getRoute(routeId: string): Promise<Route | undefined> {
    const { data, error } = await this.client.from("routes").select<string, Route>();

    if (error != null) {
      return Promise.reject(error.message)
    }

    return data.find((r) => r.route == routeId);
  }

  /**
   * Resolves all the roues in the database.
   * @returns 
   */
  public async getAllRoutes(): Promise<Route[] | undefined> {
    const { data, error } = await this.client.from("routes").select<string, Route>("*");

    if (error != null) {
      return Promise.reject(error.message)
    }

    return data;
  }

  public async deleteRoute(routeId: string): Promise<Route[] | null> {
    const { data, error } = await this.client.from("routes").delete().eq("route", routeId);

    if (error != null) {
      return Promise.reject(error.message)
    }

    return data;
  }

  public async isAuthenticated(): Promise<boolean> {
    return (await this.client.auth.getSession()).data.session != null;
  }

  public async login(email: string, password: string): Promise<Session | undefined> {
    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password
    });

    if (error != null) {
      return Promise.reject(error.message)
    }

    if (data.session == null) {
      return Promise.reject("Session does not exist")
    }

    return data.session;
  }
}