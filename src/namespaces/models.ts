import type { LLM } from "../llm.js";

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
