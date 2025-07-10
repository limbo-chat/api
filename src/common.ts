export interface CustomImage {
	source: string;
	alt?: string;
}

export type AppIcon = "info" | "warning" | "search" | "check" | "file" | "folder" | "person";

export type IconLike = AppIcon | CustomImage;

export type JsonValue = string | number | boolean | null | JsonArray | JsonObject;

export interface JsonArray extends Array<JsonValue> {}

export interface JsonObject {
	[key: string]: JsonValue;
}
