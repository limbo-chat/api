import type { PromptMessage } from "./chat.js";

export declare namespace LLM {
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
		messages: PromptMessage[];
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

	/* a function that generated streamed text from the model */
	streamText: (opts: LLM.StreamTextArgs) => void | Promise<void>;

	/* a function that returns generated text from the model */
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

	// potentially add a way to register embedding models in the future
}
