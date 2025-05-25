import type * as typebox from "@sinclair/typebox";
import type * as react from "react";

export interface CustomImage {
	source: string;
	alt?: string;
}

export type AppIcon = "info" | "warning" | "search" | "check" | "file" | "folder" | "person";

export type IconLike = AppIcon | CustomImage;

export interface Chat {
	id: string;
	name: string;
	createdAt: string;
}

export interface TextChatMessageNode {
	type: "text";
	text: string;
}

interface BaseToolCallChatMessageNode {
	type: "tool_call";
	toolId: string;
	callId: string;
}

export interface SuccessToolCallChatMessageNode extends BaseToolCallChatMessageNode {
	status: "success";
	result: string;
}

export interface ErrorToolCallChatMessageNode extends BaseToolCallChatMessageNode {
	status: "error";
	error: string | null;
}

export type ToolCallChatMessageNode = SuccessToolCallChatMessageNode | ErrorToolCallChatMessageNode;

export type ChatMessageNode = TextChatMessageNode | ToolCallChatMessageNode;

export interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: ChatMessageNode[];
	createdAt: string;
}

export interface TextPromptMessage {
	role: "system" | "user" | "assistant";
	content: string;
}

export interface ToolPromptMessage {
	role: "tool";
	toolId: string;
	callId: string;
	arguments: Record<string, unknown>;
	result: string;
}

export type PromptMessage = TextPromptMessage | ToolPromptMessage;

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
	getMessages(): PromptMessage[];
	/**
	 * Appends a new message to the prompt messages
	 *
	 * This is usually used to build a conversation
	 */
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
}

export type Setting = TextSetting | BooleanSetting | LLMSetting;

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

export interface OnBeforeAssistantResponseArgs {
	chatId: string;
	promptBuilder: ChatPromptBuilder;
}

export interface Plugin {
	onActivate?(): void | Promise<void>;
	onDeactivate?(): void | Promise<void>;
	onAfterChatCreated?(args: OnAfterChatCreatedArgs): void | Promise<void>;
	onBeforeAssistantResponse?(args: OnBeforeAssistantResponseArgs): void | Promise<void>;
}
