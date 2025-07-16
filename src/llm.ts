import type { ChatMessage, ChatPrompt } from "./chat.js";
import type { ToolDefinition } from "./tool.js";

export declare namespace LLM {
	export type Capability = "tool_calling" | "structured_outputs";

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

	/* a description about the LLM. Qualties, things it's good at... */
	description: string;

	/* The capabilities of the LLM */
	capabilities: LLM.Capability[];

	/* a function to handle the main chat loop */
	chat: (opts: LLM.ChatArgs) => Promise<void>;
}
