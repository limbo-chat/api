export interface Chat {
	id: string;
	name: string;
	createdAt: string;
}

export interface TextChatMessageNode {
	type: "text";
	text: string;
}

interface BaseToolCallChatMessageNode {
	type: "tool_call";
	toolId: string;
	callId: string;
}

export interface SuccessToolCallChatMessageNode extends BaseToolCallChatMessageNode {
	status: "success";
	result: string;
}

export interface ErrorToolCallChatMessageNode extends BaseToolCallChatMessageNode {
	status: "error";
	error: string | null;
}

export type ToolCallChatMessageNode = SuccessToolCallChatMessageNode | ErrorToolCallChatMessageNode;

export type ChatMessageNode = TextChatMessageNode | ToolCallChatMessageNode;

export interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: ChatMessageNode[];
	createdAt: string;
}

export interface TextPromptMessage {
	role: "system" | "user" | "assistant";
	content: string;
}

export interface ToolPromptMessage {
	role: "tool";
	toolId: string;
	callId: string;
	arguments: Record<string, unknown>;
	result: string;
}

export type PromptMessage = TextPromptMessage | ToolPromptMessage;

export interface ChatPromptBuilder {
	/** Returns the system prompt as a string  */
	getSystemPrompt(): string;
	/** Overrides the system prompt */
	setSystemPrompt(prompt: string): void;
	/** Prepends text to the system prompt */
	prependToSystemPrompt(message: string): void;
	/** Appends text to the system prompt */
	appendToSystemPrompt(message: string): void;
	/** Returns the prompt messages */
	getMessages(): PromptMessage[];
	/**
	 * Appends a new message to the prompt messages
	 *
	 * This is usually used to build a conversation
	 */
	appendMessage(message: PromptMessage): void;
}

export declare namespace chats {
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

	export function getMessages(opts: getMessages.Options): Promise<ChatMessage[]>;
}
