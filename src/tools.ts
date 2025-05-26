import type * as react from "react";
import type * as typebox from "@sinclair/typebox";
import type { IconLike } from "./common.js";

interface BaseToolCall<TArgs = unknown> {
	toolId: string;
	callId: string;
	arguments: TArgs;
}

export interface PendingToolCall<TArgs = unknown> extends BaseToolCall<TArgs> {
	status: "pending";
}

export interface SuccessToolCall<TArgs = unknown> extends BaseToolCall<TArgs> {
	status: "success";
	result: string;
}

export interface ErrorToolCall<TArgs = unknown> extends BaseToolCall<TArgs> {
	status: "error";
	error: string | null;
}

export type ToolCall<TArgs = unknown> =
	| PendingToolCall<TArgs>
	| SuccessToolCall<TArgs>
	| ErrorToolCall<TArgs>;

export type ToolIconFnArgs<TArgs = unknown> = {
	toolCall: ToolCall<TArgs>;
};

export type ToolIconFn = <TArgs = unknown>(args: ToolIconFnArgs<TArgs>) => IconLike;

export interface ToolRendererProps<TArgs = unknown> {
	toolCall: ToolCall<TArgs>;
}

export type ToolRenderer<TArgs = unknown> = react.FC<ToolRendererProps<TArgs>>;

export interface ToolIconRendererProps<TArgs = unknown> {
	toolCall: ToolCall<TArgs>;
}

export type ToolIconRenderer<TArgs = unknown> = react.FC<ToolIconRendererProps<TArgs>>;

export interface Tool<TInputSchema extends typebox.TSchema = any> {
	/** The ID of the tool */
	id: string;

	/** A description of the tool */
	description: string;

	/** The arguments schema for the tool */
	schema: TInputSchema;

	/** The function that executes the tool */
	execute: (args: typebox.Static<TInputSchema>) => string | Promise<string>;

	/**
	 * The icon to render for the tool.
	 *
	 * This is obsolete if the tool has a custom renderer.
	 */
	icon?: IconLike | ToolIconFn;

	// todo more considerations
	// renderIcon?: ToolIconRenderer<typebox.Static<TInputSchema>>;

	/** An optional react component that will render the tool in the chat log */
	renderer?: ToolRenderer<typebox.Static<TInputSchema>>;
}

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
