import type { ChatMessageNode, MessageHandle } from "./chats.js";

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

export declare namespace LLM {
	export type Capability = "tool_calling" | "structured_outputs";

	export interface Tool {
		id: string;
		description: string;
		schema: object;
	}

	export interface ToolCall {
		toolId: string;
		arguments: Record<string, unknown>;
	}

	export interface ChatArgs {
		message: MessageHandle;
		tools: Tool[];
		messages: ChatPromptMessage[];
		onText: (text: string) => void;
		onToolCall: (opts: ToolCall) => void;
	}
}

export interface LLM {
	/* the unique ID of the LLM */
	id: string;

	/* the name of the LLM */
	name: string;

	/* a description about the LLM. Qualties, things it's good at... */
	description: string;

	/* The capabilities of the LLM */
	capabilities: LLM.Capability[];

	/* a function to handle the main chat loop */
	chat: (opts: LLM.ChatArgs) => void | Promise<void>;
}

export declare namespace models {
	/**
	 * Gets an LLM by its ID
	 *
	 * This is global to limbo, so it can be used to get any llm registeed by any plugin.
	 */
	export function getLLM(llmId: string): LLM | undefined;

	/**
	 * Registers a new LLM that can be used
	 */
	export function registerLLM(llm: LLM): void;

	/**
	 * Unregisters an llm from the app
	 */
	export function unregisterLLM(llmId: string): void;
}
