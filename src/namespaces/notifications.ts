export type NotificationLevel = "info" | "warning" | "error";

export interface Notification {
	level: NotificationLevel;
	title: string;
	message?: string;
}

export declare namespace notifications {
	/**
	 * Shows a notification to the user
	 */
	export function show(notification: Notification): void;
}
