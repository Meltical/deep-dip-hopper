export type DPP_Player = {
	display_name: string
	user_id: string //trackmania.io user id
	height: number
	ts: number
	rank: number
}
export const fetchPlayerList = async (): Promise<DPP_Player[]> => {
	try {
		const response = await fetch("https://dips-plus-plus.xk.io/live_heights/global")
		const data: DPP_Player[] = await response.json()
		return data
	} catch (error) {
		console.error("Error on dips-plus-plus:", error)
		return []
	}
}

export type Trackmania_Player = { meta?: { twitch: string } }
const fetchPlayerProfile = async (user_id: string): Promise<Trackmania_Player> => {
	try {
		const response = await fetch(`https://trackmania.io/api/player/${user_id}`)
		const data: Trackmania_Player = await response.json()
		return data
	} catch (error) {
		console.error("Error on trackmania.io:", error)
		return { meta: { twitch: "" } }
	}
}

export const NO_TWITCH = "NO_TWITCH"
export type IProfileDictionary = { [user_id: string]: string }
export const storage_profiles = storage.defineItem<IProfileDictionary>("sync:cached_profiles")
export const getPlayerProfile = async (playerId: string): Promise<string> => {
	const cached_profiles = (await storage_profiles.getValue()) || {}

	//return cached value if available
	if (playerId in cached_profiles) {
		return cached_profiles[playerId]
	}

	//fetch profile
	const profile = await fetchPlayerProfile(playerId)

	//save to cache
	const twitchId = profile.meta?.twitch || NO_TWITCH
	cached_profiles[playerId] = twitchId
	await storage_profiles.setValue(cached_profiles)

	return cached_profiles[playerId]
}
