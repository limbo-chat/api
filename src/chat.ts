import type { LLM } from "./llm.js";

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

export type ChatPromptMessageRole = "system" | "assistant" | "user";

export interface ChatPromptMessage {
	role: ChatPromptMessageRole;
	content: ChatMessageNode[];
}

export interface ChatMessageBuilder {
	/** Sets the role of the message */
	setRole(role: ChatPromptMessageRole): void;

	/** Returns the role of the message */
	getRole(): ChatPromptMessageRole;

	/** Returns the node at the specified index  */
	getNode(index: number): ChatMessageNode | undefined;

	/** Returns all of the nodes */
	getNodes(): ChatMessageNode[];

	/** Adds a node to the beginning */
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

	/** Inserts a node or nodes at a certain index */
	insertNode(index: number, newNodeOrNodes: ChatMessageNode | ChatMessageNode[]): void;

	/** Removes a node */
	removeNode(node: ChatMessageNode): void;

	/** Removes the node at the specified index */
	removeNodeAt(index: number): void;

	/** Clears all nodes */
	clearNodes(): void;
}

export interface ChatPromptBuilder {
	/** Returns the system prompt as a string  */
	getSystemPrompt(): string;

	/** Overrides the system prompt */
	setSystemPrompt(prompt: string): void;

	/** Prepends text to the system prompt */
	prependToSystemPrompt(message: string): void;

	/** Appends text to the system prompt */
	appendToSystemPrompt(message: string): void;

	/** Returns the message at the specified index */
	getMessage(index: number): ChatMessageBuilder | undefined;

	/** Returns the prompt messages */
	getMessages(): ChatMessageBuilder[];

	/** Inserts a message at a certain index */
	insertMessage(
		index: number,
		newMessageOrMessages: ChatMessageBuilder | ChatMessageBuilder[]
	): void;

	/** Adds a message to the beginning */
	prependMessage(message: ChatMessageBuilder): void;

	/** Adds a message to the end */
	appendMessage(message: ChatMessageBuilder): void;

	/** Replaces a message */
	replaceMessage(
		oldMessage: ChatMessageBuilder,
		newMessageOrMessages: ChatMessageBuilder | ChatMessageBuilder[]
	): void;

	/** Replaces a message at the specified index */
	replaceMessageAt(
		index: number,
		newMessageOrMessages: ChatMessageBuilder | ChatMessageBuilder[]
	): void;

	/** Removes a message */
	removeMessage(message: ChatMessageBuilder): void;

	/** Removes a message at the specified index */
	removeMessageAt(index: number): void;

	/** Clears all messages */
	clearMessages(): void;

	/** Creates a new message builder */
	createMessage(message: ChatPromptMessage): ChatMessageBuilder;
}

export interface ChatGeneration {
	/** The LLM used for this chat generation */
	llm: LLM;

	/** The assistant message for this chat generation */
	assistantMessage: MessageHandle;

	/** The prompt used for this chat generation */
	prompt: ChatPromptBuilder;

	/** The chat ID of this generation */
	chatId: string;

	/** The current iteration number, starting from 0 */
	iteration: number;

	/** Whether this is the final iteration of the chat generation */
	isFinalIteration: boolean;
}
