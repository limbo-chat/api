export type NotificationLevel = "info" | "warning" | "error";

export interface Notification {
	level: NotificationLevel;
	title: string;
	message?: string;
}
