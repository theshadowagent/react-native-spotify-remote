import TypedEventEmitter from './TypedEventEmitter';
import RepeatMode from './RepeatMode';
import PlayerState from './PlayerState';
import PlayerContext from './PlayerContext';
import ContentItem from './ContentItem';
import CrossfadeState from './CrossfadeState';
import RecommendedContentOptions from './RecommendedContentOptions';
import ContentType from './ContentType';
import GetChildrenItemsOptions from './GetChildrenItemsOptions';
/**
 * Events supported by the [[SpotifyRemoteApi]]
 *
 * @interface SpotifyRemoteEvents
 */
export interface SpotifyRemoteEvents {
    /**
     * Fired when the state of the Spotify Player changes
     *
     * @type {PlayerState}
     * @memberof SpotifyRemoteEvents
     */
    "playerStateChanged": PlayerState;
    /**
     * Fires when the context of the Spotify Player changes
     *
     * @type {PlayerContext}
     * @memberof SpotifyRemoteEvents
     */
    "playerContextChanged": PlayerContext;
    /**
     * Fired when the Spotify Remote is disconnected from the Spotify App
     *
     * @type {void}
     * @memberof SpotifyRemoteEvents
     */
    "remoteDisconnected": void;
    /**
     * Fired when the Spotify Remote Connection is established with the Spotify App
     *
     * @type {void}
     * @memberof SpotifyRemoteEvents
     */
    "remoteConnected": void;
}
/**
 * Interface describes Javascript only extensions to the native api
 * @ignore
 * @interface SpotifyRemoteApiExtensions
 */
interface SpotifyRemoteApiExtensions {
    /**
     * @deprecated Please use *resume* and *pause* instead
     * @param {boolean} playing
     * @returns {Promise<void>}
     * @memberof SpotifyJSApi
     */
    setPlaying(playing: boolean): Promise<void>;
}
/**
 * The Spotify Remote Api allows remote control of Spotify Application
 *
 * See the example shown for [[SpotifyAuth]]
 *
 * @export
 * @interface SpotifyRemoteApi
 */
export interface SpotifyRemoteApi extends TypedEventEmitter<SpotifyRemoteEvents>, SpotifyRemoteApiExtensions {
    /**
     * Asynchronous call to get whether or not the Spotify Remote is connected
     *
     * @returns {Promise<boolean>}
     * @memberof SpotifyNativeApi
     */
    isConnectedAsync(): Promise<boolean>;
    /**
     * Connect to Spotify Application via the access token
     *
     * @param {string} accessToken
     * @returns {Promise<void>}
     * @memberof SpotifyRemoteApi
     */
    connect(accessToken: string): Promise<void>;
    /**
     * Disconnects the App Remote
     *
     * @returns {Promise<void>}
     * @memberof SpotifyRemoteApi
     */
    disconnect(): Promise<void>;
    /**
     * Play a track, album, playlist or artist via spotifyUri
     * Example: spotify:track:<id>, spotify:album:<id>, spotify:playlist:<id>, spotify:artist:<id>
     * @param {string} spotifyUri
     * @returns {Promise<void>}
     * @memberof SpotifyNativeApi
     */
    playUri(spotifyUri: string): Promise<void>;
    /**
     * Plays a content item
     *
     * @param {ContentItem} item
     * @returns {Promise<void>}
     * @memberof SpotifyRemoteApi
     */
    playItem(item: ContentItem): Promise<void>;
    /**
     * Plays an item (like a playlist), skipping to a particular track inside
     *
     * @param {ContentItem} item - item to play (usually a playlist)
     * @param {number} skipToTrackIndex - track in playlist to skip to
     * @returns {Promise<void>}
     * @memberof SpotifyRemoteApi
     */
    playItemWithIndex(item: ContentItem, skipToTrackIndex: number): Promise<void>;
    /**
     * Queues the track given by spotifyUri in Spotify
     * example: spotify:track:<id>
     * @param {string} spotifyUri
     * @returns {Promise<void>}
     * @memberof SpotifyNativeApi
     */
    queueUri(spotifyUri: string): Promise<void>;
    /**
     * Seeks to a position within a song
     *
     * @param {number} positionMs - Position in milliseconds
     * @returns {Promise<void>}
     * @memberof SpotifyRemoteApi
     */
    seek(positionMs: number): Promise<void>;
    /**
     * Resumes playing
     *
     * @returns {Promise<void>}
     * @memberof SpotifyRemoteApi
     */
    resume(): Promise<void>;
    /**
     * Pauses Playback
     *
     * @returns {Promise<void>}
     * @memberof SpotifyRemoteApi
     */
    pause(): Promise<void>;
    /**
     * Skips to next item in context
     *
     * @returns {Promise<void>}
     * @memberof SpotifyRemoteApi
     */
    skipToNext(): Promise<void>;
    /**
     * Skips to previous item in context
     *
     * @returns {Promise<void>}
     * @memberof SpotifyRemoteApi
     */
    skipToPrevious(): Promise<void>;
    /**
     * Sets shuffling
     *
     * @param {boolean} shuffling
     * @returns {Promise<void>}
     * @memberof SpotifyRemoteApi
     */
    setShuffling(shuffling: boolean): Promise<void>;
    /**
     * Sets repeat mode of player
     *
     * @param {RepeatMode} mode
     * @returns {Promise<void>}
     * @memberof SpotifyRemoteApi
     */
    setRepeatMode(mode: RepeatMode): Promise<void>;
    /**
     * Gets the current state of the player
     *
     * @returns {Promise<PlayerState>}
     * @memberof SpotifyRemoteApi
     */
    getPlayerState(): Promise<PlayerState>;
    /**
     * Retrieves the root content items for a given type. (iOS only)
     *
     * @param {ContentType} [type]
     * @returns {Promise<ContentItem[]>}
     * @memberof SpotifyRemoteApi
     */
    getRootContentItems(type?: ContentType): Promise<ContentItem[]>;
    /**
     * Gets the recommended content items for type
     *
     * @param {RecommendedContentOptions} options
     * @returns {Promise<ContentItem[]>}
     * @memberof SpotifyRemoteApi
     */
    getRecommendedContentItems(options: RecommendedContentOptions): Promise<ContentItem[]>;
    /**
     * Gets the children of a given item
     *
     * @param {(Pick<ContentItem, 'uri' | 'id'>)} item
     * @param {GetChildrenItemsOptions} [options]
     * @returns {Promise<ContentItem[]>}
     * @memberof SpotifyRemoteApi
     */
    getChildrenOfItem(item: Pick<ContentItem, 'uri' | 'id'>, options?: GetChildrenItemsOptions): Promise<ContentItem[]>;
    /**
     * Gets a ContentItem from a uri (iOS only)
     *
     * @param {string} uri
     * @returns {Promise<ContentItem>}
     * @memberof SpotifyRemoteApi
     */
    getContentItemForUri(uri: string): Promise<ContentItem | undefined>;
    /**
     * Retrieves the current crossfade state of the player.
     *
     * @returns {Promise<CrossfadeState>}
     * @memberof SpotifyRemoteApi
     */
    getCrossfadeState(): Promise<CrossfadeState>;
}
/**
 * @ignore
 */
declare const SpotifyRemote: SpotifyRemoteApi;
/**
 * @ignore
 */
export default SpotifyRemote;
