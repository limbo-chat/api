import type { notifications } from "./namespaces/notifications.js";
import type { commands } from "./namespaces/commands.js";
import type { models } from "./namespaces/models.js";
import type { storage } from "./namespaces/storage.js";
import type { settings } from "./namespaces/settings.js";
import type { database } from "./namespaces/database.js";
import type { tools } from "./namespaces/tools.js";
import type { chats } from "./namespaces/chats.js";
import type { ui } from "./namespaces/ui.js";

export interface API {
	notifications: typeof notifications;
	commands: typeof commands;
	storage: typeof storage;
	settings: typeof settings;
	database: typeof database;
	models: typeof models;
	tools: typeof tools;
	chats: typeof chats;
	ui: typeof ui;
}
