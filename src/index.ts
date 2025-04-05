export interface Notification {
	message: string;
}

export interface Setting {
	id: string;
	title: string;
	helpText?: string;
	type: "text" | "number";
	defaultValue: string | number;
}

export interface LLM {
	id: string;
	title: string;
	description: string;
	// generateText: () => Promise<string>
}

export interface ToolbarToggle {
	id: string;
	label: string;
	tooltip?: string;
}

export declare function showNotification(notification: Notification): void;
export declare function registerSetting(setting: Setting): void;
export declare function unregisterSetting(settingId: string): void;
export declare function registerLLM(llm: LLM): void;
export declare function unregisterLLM(llmId: string): void;
export declare function registerToolbarToggle(toolbarToggle: ToolbarToggle): void;
export declare function unregisterToolbarToggle(toolbarToggleId: string): void;

export interface API {
	showNotification: typeof showNotification;
	registerSetting: typeof registerSetting;
	unregisterSetting: typeof unregisterSetting;
	registerLLM: typeof registerLLM;
	unregisterLLM: typeof unregisterLLM;
	registerToolbarToggle: typeof registerToolbarToggle;
	unregisterToolbarToggle: typeof unregisterToolbarToggle;
}

export default {
	showNotification,
	registerSetting,
	unregisterSetting,
	registerLLM,
	unregisterLLM,
	registerToolbarToggle,
	unregisterToolbarToggle,
};
