import ApiScope from "./ApiScope";
export default interface SpotifySession {
    /**
     * The access token of the authenticated user.
     * > On Android this will be either the access token or the code depending on the `SpotifyApiConfig.AuthType`
     *
     * @type {string}
     * @memberof SpotifySession
     */
    accessToken: string;
    /**
     * The auth code for the CODE authentication flow.
     *
     * @type {string}
     * @memberof SpotifySession
     */
    code?: string;
    /**
     * The auth state for the CODE authentication flow.
     *
     * @type {string}
     * @memberof SpotifySession
     */
    state?: string;
    /**
     * The refresh token.
     *
     * @type {string}
     * @memberof SpotifySession
     */
    refreshToken: string;
    /**
     * The expiration date of the access token.
     *
     * @type {Date}
     * @memberof SpotifySession
     */
    expirationDate: string;
    /**
     * The scope granted.  **(iOS Only)**
     *
     * @type {ApiScope}
     * @memberof SpotifySession
     */
    scope: ApiScope;
    /**
     * Check whether the session has expired. YES if expired; NO otherwise.
     *
     * > Note: The session is considered expired once the current date and time is equal to or greater than the expiration date and time.
     *
     * @type {boolean}
     * @memberof SpotifySession
     */
    expired: boolean;
}
