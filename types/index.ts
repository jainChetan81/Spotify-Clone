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
