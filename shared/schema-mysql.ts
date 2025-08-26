import { sql } from "drizzle-orm";
import { mysqlTable, varchar, text, int, timestamp, boolean, json } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`(UUID())`),
  username: text("username").notNull(),
  password: text("password").notNull(),
  credits: int("credits").notNull().default(10),
  deviceId: varchar("device_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const apiKeys = mysqlTable("api_keys", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`(UUID())`),
  name: text("name").notNull(),
  apiKey: text("api_key").notNull(),
  credits: int("credits").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  lastChecked: timestamp("last_checked"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const settings = mysqlTable("settings", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`(UUID())`),
  key: text("key").notNull(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const videoGenerations = mysqlTable("video_generations", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 255 }),
  taskId: text("task_id").notNull(),
  type: text("type").notNull(),
  prompt: text("prompt").notNull(),
  imageUrl: text("image_url"),
  maskImageUrl: text("mask_image_url"),
  strength: text("strength"),
  samples: int("samples").default(1),
  steps: int("steps").default(31),
  scheduler: text("scheduler"),
  aspectRatio: text("aspect_ratio").notNull().default("16:9"),
  model: text("model").notNull().default("veo3"),
  watermark: text("watermark"),
  hdGeneration: boolean("hd_generation").default(false),
  status: text("status").notNull().default("pending"),
  resultUrls: json("result_urls"),
  hdResultUrl: text("hd_result_url"),
  errorMessage: text("error_message"),
  creditsUsed: int("credits_used").notNull(),
  apiKeyId: varchar("api_key_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  enhancementStatus: text("enhancement_status").default("none"),
  enhancedResultUrls: json("enhanced_result_urls"),
  enhancementStartedAt: timestamp("enhancement_started_at"),
  enhancementCompletedAt: timestamp("enhancement_completed_at"),
  enhancementErrorMessage: text("enhancement_error_message"),
});

export const rewardVideos = mysqlTable("reward_videos", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`(UUID())`),
  title: text("title").notNull(),
  description: text("description"),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  duration: int("duration").notNull(),
  creditsReward: int("credits_reward").notNull().default(1),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const videoWatchHistory = mysqlTable("video_watch_history", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 255 }).notNull(),
  rewardVideoId: varchar("reward_video_id", { length: 255 }).notNull(),
  watchedSeconds: int("watched_seconds").notNull().default(0),
  isCompleted: boolean("is_completed").notNull().default(false),
  rewardClaimed: boolean("reward_claimed").notNull().default(false),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const externalApiKeys = mysqlTable("external_api_keys", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`(UUID())`),
  keyName: text("key_name").notNull(),
  apiKey: text("api_key").notNull(),
  apiType: text("api_type").notNull().default("veo3"),
  userId: varchar("user_id", { length: 255 }),
  isActive: boolean("is_active").notNull().default(true),
  creditsLimit: int("credits_limit").notNull().default(100),
  creditsUsed: int("credits_used").notNull().default(0),
  lastUsed: timestamp("last_used"),
  createdAt: timestamp("created_at").defaultNow(),
  lastResetAt: timestamp("last_reset_at").defaultNow(),
});

export const dailyLinkUsage = mysqlTable("daily_link_usage", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`(UUID())`),
  date: varchar("date", { length: 20 }).notNull(),
  linkbulksUsage: int("linkbulks_usage").notNull().default(0),
  link4mUsage: int("link4m_usage").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rewardClaims = mysqlTable("reward_claims", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 255 }).notNull(),
  bypassUrl: text("bypass_url").notNull(),
  claimToken: varchar("claim_token", { length: 255 }).notNull(),
  serviceUsed: text("service_used").notNull().default("linkbulks"),
  rewardAmount: int("reward_amount").notNull().default(5),
  isClaimed: boolean("is_claimed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  claimedAt: timestamp("claimed_at"),
});

export const objectReplacements = mysqlTable("object_replacements", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 255 }).notNull(),
  fileName: text("file_name").notNull(),
  prompt: text("prompt").notNull(),
  inputImageUrl: text("input_image_url").notNull(),
  maskImageBase64: text("mask_image_base64").notNull(),
  status: text("status").notNull().default("pending"),
  resultImageUrl: text("result_image_url"),
  errorMessage: text("error_message"),
  creditsUsed: int("credits_used").notNull().default(2),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const photaiOperations = mysqlTable("photai_operations", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`(UUID())`),
  userId: varchar("user_id", { length: 255 }).notNull(),
  toolType: text("tool_type").notNull(),
  fileName: text("file_name").notNull(),
  prompt: text("prompt"),
  inputImageUrl: text("input_image_url").notNull(),
  maskImageBase64: text("mask_image_base64"),
  backgroundPrompt: text("background_prompt"),
  extendDirection: text("extend_direction"),
  upscaleMethod: text("upscale_method"),
  status: text("status").notNull().default("pending"),
  resultImageUrl: text("result_image_url"),
  errorMessage: text("error_message"),
  creditsUsed: int("credits_used").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Schema validation remains the same as original
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  deviceId: true,
});

export const insertVideoGenerationSchema = createInsertSchema(videoGenerations).omit({
  id: true,
  taskId: true,
  status: true,
  resultUrls: true,
  hdResultUrl: true,
  errorMessage: true,
  createdAt: true,
  completedAt: true,
  creditsUsed: true,
}).extend({
  prompt: z.string().min(10, "Prompt must be at least 10 characters").max(500, "Prompt must be less than 500 characters"),
  aspectRatio: z.enum(["16:9", "9:16", "1:1"]),
  model: z.enum(["veo3", "veo3_fast", "lazymixv4-inpaint", "v51_inpainting", "realistic-vision-v6.0-b1-inpaint-n"]),
  maskImageUrl: z.string().optional(),
  strength: z.string().optional(),
  samples: z.number().min(1).max(4).optional(),
  steps: z.number().min(10).max(50).optional(),
  scheduler: z.enum(["DPMSolverMultistepScheduler", "DPM++ 2M", "Euler", "Euler a"]).optional(),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVideoGeneration = z.infer<typeof insertVideoGenerationSchema>;
export type VideoGeneration = typeof videoGenerations.$inferSelect;