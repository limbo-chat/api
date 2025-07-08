export declare namespace database {
	/** Executes a SQL query and returns the result rows */
	export function query<TRow = any>(sql: string, params?: any[]): Promise<TRow[]>;

	/** Executes a SQL statement */
	export function execute(sql: string, params?: any[]): Promise<void>;
}
