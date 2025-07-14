import type { ChatGeneration } from "./chat-generation.js";

export interface OnChatCreatedArgs {
	chatId: string;
}

export interface Plugin {
	/** Called when the plugin is activated */
	onActivate?(): void | Promise<void>;

	/** Called when the plugin is deactivated */
	onDeactivate?(): void | Promise<void>;

	/** Called when a chat is created */
	onChatCreated?(args: OnChatCreatedArgs): void | Promise<void>;

	/** Called when a chat is deleted */
	onChatDeleted?(chatId: string): void | Promise<void>;

	/** Called when multiple chats are deleted */
	onChatsDeleted?(chatIds: string[]): void | Promise<void>;

	/** Called at the beginning of a chat generation */
	onBeforeChatGeneration?(chatGeneration: ChatGeneration): void | Promise<void>;

	/** Called before each iteration of a chat generation */
	onBeforeChatIteration?(chatGeneration: ChatGeneration): void | Promise<void>;

	/** Called after each iteration of a chat generation */
	onAfterChatIteration?(chatGeneration: ChatGeneration): void | Promise<void>;

	/** Called at the end of a chat generation */
	onAfterChatGeneration?(chatGeneration: ChatGeneration): void | Promise<void>;
}
