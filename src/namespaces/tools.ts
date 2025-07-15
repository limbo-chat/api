import type * as typebox from "@sinclair/typebox";
import type { Tool } from "../tool.js";

export declare namespace tools {
	/**
	 * Registers a new tool that can be used
	 */
	export function register<TInputSchema extends typebox.TSchema>(tool: Tool<TInputSchema>): void;

	/**
	 * Unregisters a tool from the app
	 */
	export function unregister(toolId: string): void;
}
