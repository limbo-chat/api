export interface Command {
	/** The ID of the command */
	id: string;
	/** The name of the command */
	name: string;
	/** The function that is called when the command is executed */
	execute: () => void | Promise<void>;
}

export declare namespace commands {
	/* Registers a command */
	export function register(command: Command): void;

	/** Unregisters a command */
	export function unregister(commandId: string): void;
}
