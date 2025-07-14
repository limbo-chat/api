import type { ChatPromptBuilder } from "./index.js";

export interface OnChatCreatedArgs {
	chatId: string;
}

export interface OnPrepareChatPromptArgs {
	chatId: string;
	promptBuilder: ChatPromptBuilder;
}

export interface OnTransformChatPromptArgs {
	chatId: string;
	promptBuilder: ChatPromptBuilder;
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

	/** Called once at the beginning of a chat loop */
	onPrepareChatPrompt?(args: OnPrepareChatPromptArgs): void | Promise<void>;

	/** Called before each iteration of a chat loop */
	onTransformChatPrompt?(args: OnTransformChatPromptArgs): void | Promise<void>;
}
