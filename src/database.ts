export declare namespace database {
	export interface QueryResult<TRow = any> {
		/**
		 * The rows returned by the query.
		 * Empty if the query returned no rows.
		 */
		rows: TRow[];
		/**
		 * The ID of the last inserted row.
		 * Only present if the database supports it and the query was an INSERT.
		 */
		lastInsertId?: bigint;
		/**
		 * The number of rows affected by write operations.
		 * Typically used for UPDATE or DELETE operations.
		 */
		rowsAffected?: number;
	}

	/** Executes a SQL query */
	export function query<TRow = any>(sql: string, params?: any[]): Promise<QueryResult<TRow>>;
}
