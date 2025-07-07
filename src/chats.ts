export interface Chat {
	id: string;
	name: string;
	createdAt: string;
}

export interface ChatMessageNode {
	type: string;
	data: Record<string, unknown>;
}

export interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: ChatMessageNode[];
	createdAt: string;
}

export interface MessageHandle {
	/** Returns the node at the specified index */
	getNode(index: number): ChatMessageNode | undefined;
	/** Returns the nodes */
	getNodes(): ChatMessageNode[];
	/** Adds a node to the start */
	prependNode(node: ChatMessageNode): void;
	/** Adds a node to the end */
	appendNode(node: ChatMessageNode): void;
	/** Replaces a node */
	replaceNode(
		oldNode: ChatMessageNode,
		newNodeOrNodes: ChatMessageNode | ChatMessageNode[]
	): void;
	/** Replaces a node at the specified index */
	replaceNodeAt(index: number, newNodeOrNodes: ChatMessageNode | ChatMessageNode[]): void;
	/** Removes a node */
	removeNode(node: ChatMessageNode): void;
	/** Removes a node at the specified index */
	removeNodeAt(index: number): void;
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

	export function getMessages(options: getMessages.Options): Promise<ChatMessage[]>;
}
