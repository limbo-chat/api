import type { ReactNode } from "react";

export interface PluginNotification {
	message: string;
}

export interface PluginSetting {
	id: string;
	title: string;
	helpText?: string;
	type: "text" | "number";
	defaultValue: string | number;
}

export interface PluginLLM {
	id: string;
	title: string;
	description: string;
	// generateText: () => Promise<string>
}

export interface PluginToolbarToggle {
	id: string;
	label: string;
	tooltip?: string;
	icon?: ReactNode;
}

export interface PluginAPI {
	showNotification(notification: PluginNotification): void;
	registerSetting(setting: PluginSetting): void;
	unregisterSetting(settingId: string): void;
	registerLLM(llm: PluginLLM): void;
	unregisterLLM(llmId: string): void;
	registerToolbarToggle(toolbarToggle: PluginToolbarToggle): void;
	unregisterToolbarToggle(toolbarToggleId: string): void;
}
import type { ReactNode } from "react";

export interface PluginNotification {
	message: string;
}

export interface PluginSetting {
	id: string;
	title: string;
	helpText?: string;
	type: "text" | "number";
	defaultValue: string | number;
}

export interface PluginLLM {
	id: string;
	title: string;
	description: string;
	// generateText: () => Promise<string>
}

export interface PluginToolbarToggle {
	id: string;
	label: string;
	tooltip?: string;
	icon?: ReactNode;
}

export interface PluginAPI {
	showNotification(notification: PluginNotification): void;
	registerSetting(setting: PluginSetting): void;
	unregisterSetting(settingId: string): void;
	registerLLM(llm: PluginLLM): void;
	unregisterLLM(llmId: string): void;
	registerToolbarToggle(toolbarToggle: PluginToolbarToggle): void;
	unregisterToolbarToggle(toolbarToggleId: string): void;
}
