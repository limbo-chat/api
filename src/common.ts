export type AppIcon =
	// general interactions
	| "add"
	| "remove"
	| "close"
	| "minimize"
	| "maximize"
	| "compose"
	| "search"
	| "filter"
	| "sort"
	| "save"
	| "edit"
	| "delete"
	| "refresh"
	| "send"
	| "stop"
	| "download"
	| "upload"
	| "share"
	| "undo"
	| "redo"
	| "lock"
	| "unlock"
	| "archive"
	| "menu"
	| "copy"
	| "check"
	| "collapse"
	| "expand"
	| "reply"
	| "print"
	| "help"
	| "text"
	| "text-wrap"
	| "visibility"
	| "visibility-off"
	| "volume"
	| "volume-off"
	| "bell"
	| "bell-off"
	| "power"
	| "power-off"
	| "wifi"
	| "wifi-off"
	| "heart"
	| "heart-off"
	| "panel-left"
	| "panel-left-close"
	| "panel-right"
	| "panel-right-close"
	// entities
	| "user"
	| "group"
	| "file"
	| "document"
	| "folder"
	| "link"
	| "image"
	| "video"
	| "home"
	| "settings"
	| "terminal"
	| "code"
	| "bug"
	| "calendar"
	| "tag"
	| "location"
	| "clipboard"
	| "clock"
	| "bolt"
	| "key"
	| "flag"
	| "bookmark"
	| "activity"
	| "hammer"
	| "credit-card"
	| "paperclip"
	// status indicators
	| "success"
	| "error"
	| "warning"
	| "info"
	| "loading"
	// navigation
	| "arrow-left"
	| "arrow-right"
	| "arrow-up"
	| "arrow-down"
	| "back"
	| "forward";

export interface CustomImage {
	source: string;
	alt?: string;
}

export type ImageLike = AppIcon | CustomImage;

export type JsonValue = string | number | boolean | null | JsonArray | JsonObject;

export interface JsonArray extends Array<JsonValue> {}

export interface JsonObject {
	[key: string]: JsonValue;
}
