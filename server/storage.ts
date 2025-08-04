import { users, trips, anonymousTrips, type User, type InsertUser, type Trip, type InsertTrip } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createTrip(trip: InsertTrip): Promise<Trip>;
  getUserTrips(userId: string): Promise<Trip[]>;
  getTripById(id: string): Promise<Trip | undefined>;
  getAnonymousTripsByIP(ipAddress: string): Promise<{ tripCount: number } | undefined>;
  incrementAnonymousTripCount(ipAddress: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createTrip(insertTrip: InsertTrip): Promise<Trip> {
    const [trip] = await db
      .insert(trips)
      .values(insertTrip)
      .returning();
    return trip;
  }

  async getUserTrips(userId: string): Promise<Trip[]> {
    return await db
      .select()
      .from(trips)
      .where(eq(trips.userId, userId))
      .orderBy(desc(trips.createdAt));
  }

  async getTripById(id: string): Promise<Trip | undefined> {
    const [trip] = await db.select().from(trips).where(eq(trips.id, id));
    return trip || undefined;
  }

  async getAnonymousTripsByIP(ipAddress: string): Promise<{ tripCount: number } | undefined> {
    const [record] = await db.select().from(anonymousTrips).where(eq(anonymousTrips.ipAddress, ipAddress));
    return record || undefined;
  }

  async incrementAnonymousTripCount(ipAddress: string): Promise<void> {
    const existing = await this.getAnonymousTripsByIP(ipAddress);
    
    if (existing) {
      await db
        .update(anonymousTrips)
        .set({ 
          tripCount: existing.tripCount + 1,
          lastTripAt: new Date()
        })
        .where(eq(anonymousTrips.ipAddress, ipAddress));
    } else {
      await db
        .insert(anonymousTrips)
        .values({
          ipAddress,
          tripCount: 1,
          lastTripAt: new Date()
        });
    }
  }
}

export const storage = new DatabaseStorage();
