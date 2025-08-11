import type * as react from "react";
import type { ChatMessageNode } from "../chat.js";
import type { JsonObject } from "../common.js";
import type { Notification } from "../notification.js";

export declare namespace ui {
	/**
	 * Shows a notification to the user
	 */
	export function showNotification(notification: Notification): void;

	export type MarkdownComponentProps = Record<string, unknown>;
	export type MarkdownComponent = react.FC<MarkdownComponentProps>;

	export interface MarkdownElement {
		/** The element to override inside of markdown renderers */
		element: string;
		/** The React component to render the markdown element */
		component: MarkdownComponent;
	}

	/** Registers a React component to be rendered in any markdown element */
	export function registerMarkdownElement(element: MarkdownElement): void;

	/** Unregisters a markdown component */
	export function unregisterMarkdownElement(elementId: string): void;

	export interface ChatNodeComponentProps {
		node: ChatMessageNode;
	}

	export type ChatNodeComponent = react.FC<ChatNodeComponentProps>;

	export interface ChatNode {
		/** The ID of the chat node */
		id: string;
		/** The component to render for the chat node */
		component: ChatNodeComponent;
	}

	export function registerChatNode(chatNode: ChatNode): void;

	export function unregisterChatNode(chatNodeId: string): void;

	export interface ChatPanelComponentProps<TData extends JsonObject = JsonObject> {
		data: TData;
	}

	export type ChatPanelComponent<TData extends JsonObject = JsonObject> = react.FC<
		ChatPanelComponentProps<TData>
	>;

	export interface ChatPanel<TData extends JsonObject = JsonObject> {
		/** The ID of the chat panel */
		id: string;

		/** The component to render for the chat panel */
		component: ChatPanelComponent<TData>;
	}

	export function registerChatPanel<TData extends JsonObject>(chatPanel: ChatPanel<TData>): void;

	export function unregisterChatPanel(chatPanelId: string): void;

	export namespace showChatPanel {
		export interface Options {
			/** The ID of the chat panel to show */
			id: string;
			/** Optional data to pass to the chat panel */
			data?: JsonObject;
		}
	}

	export function showChatPanel(options: showChatPanel.Options): void;

	export namespace showConfirmDialog {
		export interface Options {
			/** The title of the confirmation dialog */
			title: string;

			/** The description of the confirmation dialog */
			description?: string;

			/** The label for the confirm button */
			confirmLabel?: string;

			/** The label for the cancel button */
			cancelLabel?: string;

			/** The style of the confirmation dialog */
			style?: "default" | "destructive";
		}
	}

	/**
	 * Shows a confirmation dialog to the user, allowing them to confirm or deny a request.
	 *
	 * @returns A promise that resolves to true if the user confirmed, or false if they deny.
	 */
	export function showConfirmDialog(options: showConfirmDialog.Options): Promise<boolean>;
}
