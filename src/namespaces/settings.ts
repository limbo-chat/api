import type { LLM } from "../llm.js";

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
	capabilities?: LLM.Capability[];
}

export type Setting = TextSetting | BooleanSetting | LLMSetting;

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
