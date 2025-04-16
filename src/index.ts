export interface Notification {
	type: "info" | "error" | "warning";
	message: string;
}

export interface BaseSetting {
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

export type Setting = TextSetting | BooleanSetting;

export interface LLM {
	/* the unique ID of the LLM */
	id: string;

	/* the name of the LLM */
	name: string;

	/* a description about the LLM. Qualties, things it's good at... */
	description: string;

	/* a function that returns generated text from the model */
	generateText: () => Promise<string>;
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

export declare namespace llms {
	/**
	 * Registers a new LLM that can be used
	 */
	export function register(llm: LLM): void;

	/**
	 * Unregisters an llm from the app
	 */
	export function unregister(llmId: string): void;
}

export interface API {
	settings: typeof settings;
	notifications: typeof notifications;
	llms: typeof llms;
}
