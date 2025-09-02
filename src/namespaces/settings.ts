import type { JsonValue } from "../common.js";

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

	/** The default value */
	defaultValue?: string;

	/** The placeholder text to show */
	placeholder?: string;

	/**
	 * The type of text input to display
	 *
	 * string: single line text input
	 * password: single line text input with protected text
	 * multiline: multi-line text area
	 *
	 * @default string
	 */
	variant?: "string" | "password" | "multiline";
}

export interface BooleanSetting extends BaseSetting {
	type: "boolean";

	/**
	 * @default false
	 */
	defaultValue?: boolean;
}

export interface NumberSetting extends BaseSetting {
	type: "number";

	/** The placeholder text to show */
	placeholder?: string;

	/** The default value */
	defaultValue?: number;

	/** The minimum allowed value */
	min?: number;

	/** The maximum allowed value */
	max?: number;

	/**
	 * The step size for incrementing/decrementing
	 *
	 * @default 1
	 */
	stepSize?: number;
}

export interface EnumSettingOption {
	/** The unique value of the option */
	value: string;

	/** The label to display for the option */
	label: string;
}

export interface EnumSetting extends BaseSetting {
	type: "enum";

	/** The placeholder text to show */
	placeholder?: string;

	/** The default value */
	defaultValue?: string;

	/** The available options */
	options: EnumSettingOption[];
}

export interface LLMSetting extends BaseSetting {
	type: "llm";

	/** The capabilities the LLM must have */
	capabilities?: string[];
}

export type Setting = TextSetting | BooleanSetting | NumberSetting | EnumSetting | LLMSetting;

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
	export function get<T extends JsonValue>(settingId: string): T | undefined;
}
