import type { notifications } from "./notifications.js";
import type { commands } from "./commands.js";
import type { models } from "./models.js";
import type { storage } from "./storage.js";
import type { settings } from "./settings.js";
import type { database } from "./database.js";
import type { tools } from "./tools.js";
import type { chats } from "./chats.js";
import type { ui } from "./ui.js";

export interface API {
	notifications: typeof notifications;
	commands: typeof commands;
	storage: typeof storage;
	settings: typeof settings;
	database: typeof database;
	models: typeof models;
	tools: typeof tools;
	chats: typeof chats;
}
