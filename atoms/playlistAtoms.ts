import { atom } from "recoil";
import type { SinglePlaylistResponse } from "../types";

export const playlistIdState = atom<string>({
	key: "playlistIdState",
	default: "3MGI83rYe2DPbsuvPnDDYH",
});
export const playlistState = atom<SinglePlaylistResponse>({
	key: "playlistState",
	default: <SinglePlaylistResponse>{},
});
