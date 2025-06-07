import type * as react from "react";

export declare namespace ui {
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

	export interface ChatNodeComponentProps<TData = Record<string, unknown>> {
		data: TData;
	}

	export type ChatNodeComponent<TData = Record<string, unknown>> = react.FC<
		ChatNodeComponentProps<TData>
	>;

	export interface ChatNode<TData = Record<string, unknown>> {
		/** The ID of the chat node */
		id: string;
		/** The component to render for the chat node */
		component: ChatNodeComponent<TData>;
	}

	export function registerChatNode(chatNode: ChatNode): void;

	export function unregisterChatNode(chatNodeId: string): void;
}
