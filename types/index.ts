import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
export type LayoutType = {
	title: string;
	keywords?: string;
	description?: string;
	children: any;
};
export type JWT_INTERFACE = { token: JWT; user?: User; account?: any; isNewUser?: boolean };
export type SESSION_INTERFACE = { session: Session; user?: User; token: JWT };
export interface Response<T> {
	body: T;
	headers: Record<string, string>;
	statusCode: number;
}
export interface RefreshAccessTokenResponse {
	access_token: string;
	expires_in: number;
	refresh_token?: string | undefined;
	scope: string;
	token_type: string;
}

/**
 * Playlist Object Simplified
 * [](https://developer.spotify.com/web-api/object-model/)
 */
export interface PlaylistObjectSimplified extends PlaylistBaseObject {
	tracks: {
		href: string;
		total: number;
	};
}

interface ImageObject {
	/**
	 * The image height in pixels. If unknown: `null` or not returned.
	 */
	height?: number | undefined;
	/**
	 * The source URL of the image.
	 */
	url: string;
	/**
	 * The image width in pixels. If unknown: null or not returned.
	 */
	width?: number | undefined;
}
interface UserObjectPublic {
	display_name?: string | undefined;
	external_urls: ExternalUrlObject;
	followers?: { href: null; total: number } | undefined;
	href: string;
	id: string;
	images?: ImageObject[] | undefined;
	type: "user";
	uri: string;
}

/**
 * Base Playlist Object. Does not in itself exist in Spotify Web Api,
 * but needs to be made since the tracks types vary in the Full and Simplified versions.
 */
interface PlaylistBaseObject extends ContextObject {
	/**
	 * Returns `true` if context is not search and the owner allows other users to modify the playlist.
	 * Otherwise returns `false`.
	 */
	collaborative: boolean;
	/**
	 * The playlist description. Only returned for modified, verified playlists, otherwise null.
	 */
	description: string | null;
	/**
	 * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
	 */
	id: string;
	/**
	 * Images for the playlist. The array may be empty or contain up to three images.
	 * The images are returned by size in descending order.
	 * See [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/).
	 * Note: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day.
	 */
	images: ImageObject[];
	/**
	 * The name of the playlist.
	 */
	name: string;
	/**
	 * The user who owns the playlist.
	 */
	owner: UserObjectPublic;
	/**
	 * The playlist’s public/private status:
	 * `true` the playlist is public,
	 * `false` the playlist is private,
	 * or `null` the playlist status is not relevant.
	 */
	public: boolean | null;
	/**
	 * The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version:
	 * see [Remove tracks from a playlist](https://developer.spotify.com/documentation/web-api/reference/playlists/remove-tracks-playlist/).
	 */
	snapshot_id: string;
	type: "playlist";
}
interface ContextObject {
	/**
	 * The object type.
	 */
	type: "artist" | "playlist" | "album" | "show" | "episode";
	/**
	 * A link to the Web API endpoint providing full details.
	 */
	href: string;
	/**
	 * Known external URLs.
	 */
	external_urls: ExternalUrlObject;
	/**
	 * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
	 */
	uri: string;
}
interface ExternalUrlObject {
	spotify: string;
}
