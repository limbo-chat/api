import type { ChatMessageNode, ChatMessageRole } from "../chat.js";

export declare namespace chats {
	export interface Chat {
		id: string;
		name: string;
		createdAt: string;
	}

	export interface ChatMessage {
		id: string;
		role: ChatMessageRole;
		content: ChatMessageNode[];
		createdAt: string;
	}

	export function get(chatId: string): Promise<Chat | null>;

	export function rename(chatId: string, newName: string): Promise<void>;

	export namespace getMessages {
		export interface Options {
			/**
			 * The ID of the chat to get messages from
			 */
			chatId: string;

			/**
			 * The number of messages to return
			 *
			 * @default 25
			 */
			limit?: number;

			/**
			 * The role of the messages to get
			 */
			role?: "user" | "assistant";

			/**
			 * The sort order of the messages
			 *
			 * "newest" will return the most recent messages first
			 * "oldest" will return the oldest messages first
			 *
			 * @default "newest"
			 */
			sort?: "newest" | "oldest";
		}
	}

	export function getMessages(options: getMessages.Options): Promise<ChatMessage[]>;
}
