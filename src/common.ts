export interface CustomImage {
	source: string;
	alt?: string;
}

export type AppIcon = "info" | "warning" | "search" | "check" | "file" | "folder" | "person";

export type IconLike = AppIcon | CustomImage;
