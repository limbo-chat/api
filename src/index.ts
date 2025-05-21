import type * as typebox from "@sinclair/typebox";

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

export interface Tool<TSchema extends typebox.TSchema = any> {
	id: string;
	description: string;
	schema: TSchema;
	execute: (args: typebox.Static<TSchema>) => void | Promise<void>;
}

export interface PromptBuilder {
	getMessages(): PromptMessage[];
	prependMessage(message: PromptMessage): void;
	appendMessage(message: PromptMessage): void;
	getTools(): Tool[];
	addTool<TSchema extends typebox.TSchema>(tool: Tool<TSchema>): void;
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

export declare namespace storage {
	export function set(key: string, value: any): void;
	export function get<T>(key: string): T | undefined;
	export function remove<T>(key: string): void;
	export function clear(): void;
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

/* consider something like 'services' that can be registered and used by multiple plugins (e.g, knowledgebase or something) */
// export declare namespace services {
// 	export function get<T>(serviceId: string): T | undefined;

// 	export function register(serviceId: string, value: any): void;
// }

export interface API {
	notifications: typeof notifications;
	settings: typeof settings;
	storage: typeof storage;
	models: typeof models;
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
