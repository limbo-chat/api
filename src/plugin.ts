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
	onActivate?(): void | Promise<void>;
	onDeactivate?(): void | Promise<void>;
	onChatCreated?(args: OnChatCreatedArgs): void | Promise<void>;
	onChatDeleted?(chatId: string): void | Promise<void>;
	onChatsDeleted?(chatIds: string[]): void | Promise<void>;
	onPrepareChatPrompt?(args: OnPrepareChatPromptArgs): void | Promise<void>;
	onTransformChatPrompt?(args: OnTransformChatPromptArgs): void | Promise<void>;
}
