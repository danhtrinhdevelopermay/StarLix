import { db } from "./db";
import { users, videoGenerations } from "../shared/schema-mysql";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import * as crypto from "crypto";

// Simplified MySQL storage for basic operations
export class MySQLStorage {
  async getUserByUsername(username: string) {
    const results = await db.select().from(users).where(eq(users.username, username));
    return results[0];
  }

  async createUser(userData: { username: string; password: string; deviceId?: string }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userId = crypto.randomUUID();
    
    await db.insert(users).values({ 
      id: userId,
      username: userData.username,
      password: hashedPassword,
      credits: 50, // Start with 50 credits
      deviceId: userData.deviceId || null
    });
    
    // Return the created user
    const results = await db.select().from(users).where(eq(users.id, userId));
    return results[0];
  }

  async validateUserPassword(username: string, password: string) {
    const user = await this.getUserByUsername(username);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async getUserById(id: string) {
    const results = await db.select().from(users).where(eq(users.id, id));
    return results[0];
  }

  async updateUserCredits(userId: string, credits: number) {
    await db.update(users).set({ credits }).where(eq(users.id, userId));
    
    // Return updated user
    const results = await db.select().from(users).where(eq(users.id, userId));
    return results[0];
  }

  async getUserByDeviceId(deviceId: string) {
    const results = await db.select().from(users).where(eq(users.deviceId, deviceId));
    return results[0];
  }

  async createVideoGeneration(generationData: any) {
    const generationId = crypto.randomUUID();
    
    await db.insert(videoGenerations).values({
      id: generationId,
      userId: generationData.userId,
      taskId: generationData.taskId,
      type: generationData.type,
      prompt: generationData.prompt,
      aspectRatio: generationData.aspectRatio || '16:9',
      model: generationData.model || 'veo3',
      status: 'pending',
      creditsUsed: generationData.creditsUsed || 1
    });

    // Return created generation
    const results = await db.select().from(videoGenerations).where(eq(videoGenerations.id, generationId));
    return results[0];
  }

  async getVideoGenerationByTaskId(taskId: string) {
    const results = await db.select().from(videoGenerations).where(eq(videoGenerations.taskId, taskId));
    return results[0];
  }

  async updateVideoGeneration(id: string, updates: any) {
    await db.update(videoGenerations).set(updates).where(eq(videoGenerations.id, id));
    
    // Return updated generation
    const results = await db.select().from(videoGenerations).where(eq(videoGenerations.id, id));
    return results[0];
  }

  async getUserVideoGenerations(userId: string) {
    const results = await db.select().from(videoGenerations).where(eq(videoGenerations.userId, userId));
    return results.sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
  }
}

// Create instance
export const mysqlStorage = new MySQLStorage();