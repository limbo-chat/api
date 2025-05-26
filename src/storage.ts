export declare namespace storage {
	export function set(key: string, value: any): void;
	export function get<T>(key: string): T | undefined;
	export function remove<T>(key: string): void;
	export function clear(): void;
}
