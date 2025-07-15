export type ChatMessageRole = "system" | "assistant" | "user";

export interface ChatMessageNode {
	type: string;
	data: Record<string, unknown>;
}

export interface ChatMessage {
	/** Sets the role of the message */
	setRole(role: ChatMessageRole): void;

	/** Returns the role of the message */
	getRole(): ChatMessageRole;

	/** Returns the node at the specified index  */
	getNode(index: number): ChatMessageNode | undefined;

	/** Returns all of the nodes */
	getNodes(): ChatMessageNode[];

	/** Sets the nodes */
	setNodes(nodes: ChatMessageNode[]): void;

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

export interface ChatPrompt {
	/** Returns the message at the specified index */
	getMessage(index: number): ChatMessage | undefined;

	/** Returns the prompt messages */
	getMessages(): ChatMessage[];

	/** Sets the messages */
	setMessages(messages: ChatMessage[]): void;

	/** Inserts a message at a certain index */
	insertMessage(index: number, newMessageOrMessages: ChatMessage | ChatMessage[]): void;

	/** Adds a message to the beginning */
	prependMessage(message: ChatMessage): void;

	/** Adds a message to the end */
	appendMessage(message: ChatMessage): void;

	/** Replaces a message */
	replaceMessage(
		oldMessage: ChatMessage,
		newMessageOrMessages: ChatMessage | ChatMessage[]
	): void;

	/** Replaces a message at the specified index */
	replaceMessageAt(index: number, newMessageOrMessages: ChatMessage | ChatMessage[]): void;

	/** Removes a message */
	removeMessage(message: ChatMessage): void;

	/** Removes a message at the specified index */
	removeMessageAt(index: number): void;

	/** Clears all messages */
	clearMessages(): void;

	/** Creates a new message */
	createMessage(role: ChatMessageRole): ChatMessage;
}
