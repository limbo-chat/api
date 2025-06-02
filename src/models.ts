import type { ErrorToolCall, SuccessToolCall } from "./tools.js";

export interface TextChatPromptNode {
	type: "text";
	data: {
		/** The text content */
		content: string;
	};
}

export interface ImageChatPromptNode {
	type: "image";
	data: {
		/** The image URL as either a fully qualified URL to an image file or a base64-encoded data URL */
		url: string;
	};
}

export interface ToolCallChatPromptNode {
	type: "tool_call";
	/** The tool call data */
	data: SuccessToolCall | ErrorToolCall;
}

export type ChatPromptContentNode =
	| TextChatPromptNode
	| ImageChatPromptNode
	| ToolCallChatPromptNode;

export type ChatPromptMessageRole = "system" | "assistant" | "user";

export interface ChatPromptMessage {
	role: ChatPromptMessageRole;
	content: ChatPromptContentNode[];
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
	/** Returns the prompt messages */
	getMessages(): ChatPromptMessage[];
	/**
	 * Appends a new message to the prompt messages
	 *
	 * This is usually used to build a conversation
	 */
	appendMessage(message: ChatPromptMessage): void;
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

	export interface StreamTextArgs {
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

	/* a function to stream text from the LLM */
	streamText: (opts: LLM.StreamTextArgs) => void | Promise<void>;
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
