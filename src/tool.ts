import type * as react from "react";
import type * as typebox from "@sinclair/typebox";
import type { ImageLike } from "./common.js";
import type { ChatMessage } from "./chat.js";

export type AnyToolCallArgs = Record<string, unknown>;

interface BaseToolCall<TArgs = AnyToolCallArgs> {
	id: string;
	toolId: string;
	arguments: TArgs;
}

export interface PendingToolCall<TArgs = AnyToolCallArgs> extends BaseToolCall<TArgs> {
	status: "pending";
}

export interface SuccessToolCall<TArgs = AnyToolCallArgs> extends BaseToolCall<TArgs> {
	status: "success";
	result: string;
}

export interface ErrorToolCall<TArgs = AnyToolCallArgs> extends BaseToolCall<TArgs> {
	status: "error";
	error: string | null;
}

export type ToolCall<TArgs = AnyToolCallArgs> =
	| PendingToolCall<TArgs>
	| SuccessToolCall<TArgs>
	| ErrorToolCall<TArgs>;

export type SettledToolCall<TArgs = AnyToolCallArgs> =
	| SuccessToolCall<TArgs>
	| ErrorToolCall<TArgs>;

export type ToolIconFnArgs<TArgs = AnyToolCallArgs> = {
	toolCall: ToolCall<TArgs>;
};

export type ToolIconFn = <TArgs = AnyToolCallArgs>(args: ToolIconFnArgs<TArgs>) => ImageLike;

export interface ToolRendererProps<TArgs = AnyToolCallArgs> {
	toolCall: ToolCall<TArgs>;
}

export type ToolRenderer<TArgs = AnyToolCallArgs> = react.FC<ToolRendererProps<TArgs>>;

export interface ToolIconRendererProps<TArgs = AnyToolCallArgs> {
	toolCall: ToolCall<TArgs>;
}

export type ToolIconRenderer<TArgs = AnyToolCallArgs> = react.FC<ToolIconRendererProps<TArgs>>;

export interface ToolExecuteArgs<TArgs = AnyToolCallArgs> {
	assistantMessage: ChatMessage;
	toolCall: BaseToolCall<TArgs>;
	abortSignal: AbortSignal;
}

export interface Tool<TInputSchema extends typebox.TSchema = any> {
	/** The ID of the tool */
	id: string;

	/** A description of the tool */
	description: string;

	/** The arguments schema for the tool */
	schema: TInputSchema;

	/** The function that executes the tool */
	execute: (args: ToolExecuteArgs<typebox.Static<TInputSchema>>) => string | Promise<string>;

	/**
	 * The icon to render for the tool.
	 *
	 * This is obsolete if the tool has a custom renderer.
	 */
	icon?: ImageLike | ToolIconFn;

	/** An optional react component that will render the tool in the chat log */
	renderer?: ToolRenderer<typebox.Static<TInputSchema>>;
}
