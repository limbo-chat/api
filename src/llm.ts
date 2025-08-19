import type { ChatMessage, ChatMessageNode, ChatPrompt } from "./chat.js";
import type { ToolDefinition } from "./tool.js";

export declare namespace LLM {
	export interface ToolCall {
		toolId: string;
		arguments: Record<string, unknown>;
	}

	export interface ChatArgs {
		tools: ToolDefinition[];
		prompt: ChatPrompt;
		assistantMessage: ChatMessage;
		abortSignal: AbortSignal;
		onText: (text: string) => void;
		onToolCall: (opts: ToolCall) => void;
	}
}

export interface LLM {
	/* the unique ID of the LLM */
	id: string;

	/* the name of the LLM */
	name: string;

	/* a description about the LLM */
	description: string;

	/* The capabilities of the LLM */
	capabilities: string[];

	/* a function to check if the LLM understands a specific content type. */
	understands: (node: ChatMessageNode) => boolean;

	/* a function to handle the main chat loop */
	chat: (opts: LLM.ChatArgs) => Promise<void>;
}
