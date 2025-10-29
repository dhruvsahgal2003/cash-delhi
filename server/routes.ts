import express from "express";
import { db } from "./db.js";
import { events, insertEventSchema } from "../shared/schema.js";
import { isAuthenticated } from "./auth.js";
import passport from "passport";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const router = express.Router();

// Auth routes
router.get("/api/user", (req, res) => {
  res.json({ user: req.user || null });
});

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.json({ success: true });
  });
});

// Event routes
router.get("/api/events", async (req, res) => {
  const result = await db.select().from(events);
  res.json(result);
});

router.get("/api/events/:id", async (req, res) => {
  const result = await db
    .select()
    .from(events)
    .where(eq(events.id, req.params.id));
  if (result.length === 0) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.json(result[0]);
});

router.post("/api/events", isAuthenticated, async (req, res) => {
  try {
    const validatedData = insertEventSchema.parse(req.body);
    const newEvent = await db.insert(events).values(validatedData).returning();
    res.status(201).json(newEvent[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Invalid event data", errors: error.errors });
    }
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
});

router.patch("/api/events/:id", isAuthenticated, async (req, res) => {
  try {
    const validatedData = insertEventSchema.partial().parse(req.body);
    const updatedEvent = await db
      .update(events)
      .set(validatedData)
      .where(eq(events.id, req.params.id))
      .returning();
    if (updatedEvent.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(updatedEvent[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Invalid event data", errors: error.errors });
    }
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Failed to update event" });
  }
});

router.delete("/api/events/:id", isAuthenticated, async (req, res) => {
  try {
    const deletedEvent = await db
      .delete(events)
      .where(eq(events.id, req.params.id))
      .returning();
    if (deletedEvent.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
});
