import type { chats } from "./chat.js";
import type { models } from "./models.js";
import type { notifications } from "./notifications.js";
import type { settings } from "./settings.js";
import type { tools } from "./tools.js";

export interface API {
	notifications: typeof notifications;
	settings: typeof settings;
	models: typeof models;
	tools: typeof tools;
	chats: typeof chats;
}
