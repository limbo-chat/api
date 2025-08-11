export declare namespace auth {
	export interface AuthenticateOptions {
		/**
		 * The URL for the authentication endpoint
		 *
		 * If not provided and needed, the limbo app will attempt to discover it via the issuer's metadata.
		 */
		authUrl: string;

		/**
		 * The URL for the token endpoint
		 *
		 * If not provided and needed, the limbo app will attempt to discover it via the issuer's metadata.
		 */
		tokenUrl: string;

		/**
		 * The URL for the registration endpoint
		 *
		 * If not provided and needed, the limbo app will attempt to discover it via the issuer's metadata.
		 */
		registrationUrl?: string;

		/** The scopes to request during authentication */
		scopes: string[];

		/**
		 * The client ID for the OAuth application
		 *
		 * If not provided, the limbo app will attempt to dynamically register a new client with the issuer.
		 */
		clientId?: string;

		/**
		 * The name of the client created during dynamic client registration.
		 *
		 * This is only used for dynamic client registration and is optional.
		 */
		clientName?: string;
	}

	/**
	 * Authenticates a user with OAuth 2.0.
	 *
	 * This function will attempt to find an existing valid access token for the given issuer.
	 * If no valid token is found, it will initiate the OAuth 2.0 authorization code flow to obtain a new access token.
	 *
	 * @returns A promise that resolves to the access token if authentication is successful
	 * @throws {Error} If authentication fails or is cancelled
	 */
	export function authenticate(opts: AuthenticateOptions): Promise<string>;
}
