import type { ChatMessage, ChatPrompt } from "./chat.js";
import type { LLM } from "./llm.js";
import type { SettledToolCall } from "./tool.js";

export interface OnChatCreatedArgs {
	chatId: string;
}

export interface ChatIteration {
	/** The index of the chat iteration */
	index: number;

	/** The metadata returned by the LLM */
	// llmMetadata: Record<string, unknown>;

	/** The tool calls made during the iteration */
	toolCalls: SettledToolCall[];
}

export type ChatGenerationContext = Map<string, unknown>;

export interface ChatGeneration {
	/** The chat ID of this generation */
	chatId: string;

	/** The LLM used for the chat generation */
	llm: LLM;

	/** The prompt used for the chat generation */
	prompt: ChatPrompt;

	/** The new assistant message for the chat generation */
	assistantMessage: ChatMessage;

	/** The completed iterations of the chat generation */
	iterations: ChatIteration[];
}

export interface OnBeforeChatGenerationArgs {
	/** The current generation */
	generation: ChatGeneration;

	/**
	 * The shared context across the entire chat generation.
	 *
	 * This is shared between all plugins, so there could very well be naming conflicts.
	 * It is recommended to use a unique prefix for the keys.
	 *
	 * @example
	 * context.set("my-plugin:key", "value");
	 *
	 */
	context: ChatGenerationContext;

	/** The abort signal for the chat generation */
	abortSignal: AbortSignal;
}

export interface OnBeforeChatIterationArgs {
	/** The current generation */
	generation: ChatGeneration;

	/** The current iteration */
	iteration: ChatIteration;

	/**
	 * The shared context across the entire chat generation.
	 *
	 * This is shared between all plugins, so there could very well be naming conflicts.
	 * It is recommended to use a unique prefix for the keys.
	 *
	 * @example
	 * context.set("my-plugin:key", "value");
	 *
	 */
	context: ChatGenerationContext;

	/** The abort signal for this chat generation */
	abortSignal: AbortSignal;
}

export interface OnAfterChatIterationArgs {
	/** The current generation */
	generation: ChatGeneration;

	/** The current iteration */
	iteration: ChatIteration;

	/** Whether this is the final iteration of the chat generation */
	isFinalIteration: boolean;

	/**
	 * The shared context across the entire chat generation.
	 *
	 * This is shared between all plugins, so there could very well be naming conflicts.
	 * It is recommended to use a unique prefix for the keys.
	 *
	 * @example
	 * context.set("my-plugin:key", "value");
	 *
	 */
	context: ChatGenerationContext;

	/** The abort signal for this chat generation */
	abortSignal: AbortSignal;
}

export interface OnAfterChatGenerationArgs {
	/** The current generation */
	generation: ChatGeneration;

	/**
	 * The shared context across the entire chat generation.
	 *
	 * This is shared between all plugins, so there could very well be naming conflicts.
	 * It is recommended to use a unique prefix for the keys.
	 *
	 * @example
	 * context.set("my-plugin:key", "value");
	 *
	 */
	context: ChatGenerationContext;
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
	onBeforeChatGeneration?(args: OnBeforeChatGenerationArgs): void | Promise<void>;

	/** Called before each iteration of a chat generation */
	onBeforeChatIteration?(args: OnBeforeChatIterationArgs): void | Promise<void>;

	/** Called after each iteration of a chat generation */
	onAfterChatIteration?(args: OnAfterChatIterationArgs): void | Promise<void>;

	/** Called at the end of a chat generation */
	onAfterChatGeneration?(args: OnAfterChatGenerationArgs): void | Promise<void>;
}
