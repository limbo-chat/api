export interface Chat {
	id: string;
	name: string;
	createdAt: string;
}

export interface ChatMessageNode<TType extends string, TData extends Record<string, unknown>> {
	type: TType;
	data: TData;
}

export type TextChatMessageNode = ChatMessageNode<
	"text",
	{
		content: string;
	}
>;

export type MarkdownChatMessageNode = ChatMessageNode<
	"markdown",
	{
		content: string;
	}
>;

export type ToolCallChatMessageNode = ChatMessageNode<"tool_call", { tool_call_id: string }>;

export type AnyChatMessageNode = ChatMessageNode<string, Record<string, unknown>>;

export type CoreChatMessageNode =
	| TextChatMessageNode
	| MarkdownChatMessageNode
	| ToolCallChatMessageNode
	| AnyChatMessageNode;

export interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: CoreChatMessageNode[];
	createdAt: string;
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
