import type * as typebox from "@sinclair/typebox";
import type * as react from "react";

export interface Chat {
	id: string;
	name: string;
	createdAt: string;
}

export interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	createdAt: string;
}

export interface PromptMessage {
	role: "user" | "assistant" | "system";
	content: string;
}

export interface PromptBuilder {
	getMessages(): PromptMessage[];
	prependMessage(message: PromptMessage): void;
	appendMessage(message: PromptMessage): void;
}

export interface Notification {
	type: "info" | "error" | "warning";
	message: string;
}

interface BaseSetting {
	/** The unique ID of the setting */
	id: string;

	/** The label for the setting */
	label: string;

	/** A short description of the setting */
	description?: string;
}

export interface TextSetting extends BaseSetting {
	type: "text";
	defaultValue?: string;
	placeholder?: string;
	/**
	 * The type of text input to display
	 *
	 * string: single line text input
	 * password: single line text input with protected text
	 *
	 * @default string
	 */
	variant?: "string" | "password";
}

export interface BooleanSetting extends BaseSetting {
	type: "boolean";

	/**
	 * @default false
	 */
	defaultValue?: boolean;
}

export interface LLMSetting extends BaseSetting {
	type: "llm";

	// consider the following
	// supportsStructuredOutputs?: boolean;
	// supportsTools?: boolean;
}

export type Setting = TextSetting | BooleanSetting | LLMSetting;

export declare namespace LLM {
	export interface GenerateTextArgs {
		promptBuilder: PromptBuilder;
		onChunk: (chunk: string) => void;
	}

	export interface GenerateObjectArgs {
		promptBuilder: PromptBuilder;
		schema: any;
	}
}

export interface LLM {
	/* the unique ID of the LLM */
	id: string;

	/* the name of the LLM */
	name: string;

	/* a description about the LLM. Qualties, things it's good at... */
	description: string;

	/* a function that returns generated text from the model */
	generateText: (opts: LLM.GenerateTextArgs) => void | Promise<void>;

	/* a function that returns generated text from the model */
	generateObject?: (opts: LLM.GenerateObjectArgs) => any | Promise<any>;
}

export declare namespace settings {
	/**
	 * Registers a setting that can be configured by the user
	 */
	export function register(setting: Setting): void;

	/**
	 * Unregisters a setting that can be configured by the user
	 */
	export function unregister(settingId: string): void;

	/**
	 * Gets a setting value for the plugin
	 */
	export function get<T extends string | boolean = string | boolean>(
		settingId: string
	): T | undefined;
}

export declare namespace notifications {
	/**
	 * Shows a notification to the user
	 */
	export function show(notification: Notification): void;
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

export interface PendingToolCall<TArgs = unknown> {
	status: "pending";
	arguments: TArgs;
}

export interface FinishedToolCall<TArgs = unknown, TResult = unknown> {
	status: "finished";
	arguments: TArgs;
	result: TResult;
}

export interface ErrorToolCall {
	status: "error";
	error: string | null;
}

export interface ToolComponentProps<TArgs = unknown, TResult = unknown> {
	toolCall: PendingToolCall<TArgs> | FinishedToolCall<TArgs, TResult> | ErrorToolCall;
}

export type ToolComponent<TArgs = unknown, TResult = unknown> = react.FC<
	ToolComponentProps<TArgs, TResult>
>;

export interface Tool<TInputSchema extends typebox.TSchema = any, TResult = unknown> {
	/** The ID of the tool */
	id: string;

	/** A description of the tool */
	description: string;

	/** The arguments schema for the tool */
	schema: TInputSchema;

	/** The function that executes the tool */
	execute: (args: typebox.Static<TInputSchema>) => TResult | Promise<TResult>;

	/** An optional react component that will render the tool in the chat log */
	renderer?: ToolComponent<typebox.Static<TInputSchema>, TResult>;
}

export declare namespace tools {
	/**
	 * Registers a new tool that can be used
	 */
	export function register<TInputSchema extends typebox.TSchema, TResult>(
		tool: Tool<TInputSchema, TResult>
	): void;

	/**
	 * Unregisters a tool from the app
	 */
	export function unregister(toolId: string): void;
}

export declare namespace chats {
	export function get(chatId: string): Promise<Chat | null>;

	export function rename(chatId: string, newName: string): Promise<void>;

	export namespace getMessages {
		export interface Options {
			/**
			 * The ID of the chat to get messages from
			 */
			chatId: string;

			/**
			 * The number of messages to return
			 *
			 * @default 25
			 */
			limit?: number;

			/**
			 * The role of the messages to get
			 */
			role?: "user" | "assistant";

			/**
			 * The sort order of the messages
			 *
			 * "newest" will return the most recent messages first
			 * "oldest" will return the oldest messages first
			 *
			 * @default "newest"
			 */
			sort?: "newest" | "oldest";
		}
	}

	export function getMessages(opts: getMessages.Options): Promise<ChatMessage[]>;
}

export interface API {
	notifications: typeof notifications;
	settings: typeof settings;
	models: typeof models;
	tools: typeof tools;
	chats: typeof chats;
}

export interface OnAfterChatCreatedArgs {
	chatId: string;
}

export interface OnBeforeGenerateTextArgs {
	chatId: string;
	promptBuilder: PromptBuilder;
}

export interface Plugin {
	onActivate?(): void | Promise<void>;
	onDeactivate?(): void | Promise<void>;
	onAfterChatCreated?(args: OnAfterChatCreatedArgs): void | Promise<void>;
	onBeforeGenerateText?(args: OnBeforeGenerateTextArgs): void | Promise<void>;
}
