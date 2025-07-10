export interface CustomImage {
	source: string;
	alt?: string;
}

export type AppIcon = "info" | "warning" | "search" | "check" | "file" | "folder" | "person";

export type IconLike = AppIcon | CustomImage;

export type JsonObject = {
	[key: string]: string | number | boolean | JsonObject | JsonArray;
};

export interface JsonArray extends Array<string | number | boolean | JsonObject | JsonArray> {}
