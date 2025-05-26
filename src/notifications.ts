export interface Notification {
	type: "info" | "error" | "warning";
	message: string;
}

export declare namespace notifications {
	/**
	 * Shows a notification to the user
	 */
	export function show(notification: Notification): void;
}
