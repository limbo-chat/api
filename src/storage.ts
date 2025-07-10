import type { JsonValue } from "./common.js";

export declare namespace storage {
	/**
	 * Stores a value in storage
	 *
	 * The value must be JSON serializable.
	 */
	export function set(key: string, value: JsonValue): Promise<void>;

	/** Gets a value from storage */
	export function get<TValue extends JsonValue>(key: string): Promise<TValue | undefined>;

	/** Removes a value from storage */
	export function remove<T>(key: string): Promise<void>;

	/** Clears all values from storage */
	export function clear(): Promise<void>;
}
