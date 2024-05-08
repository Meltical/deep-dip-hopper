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

export type Trackmania_Player = {
	meta: {
		twitch: string
	}
}
export const fetchPlayerProfile = async (user_id: string): Promise<Trackmania_Player> => {
	try {
		const response = await fetch(`https://trackmania.io/api/player/${user_id}`)
		const data: Trackmania_Player = await response.json()
		return data
	} catch (error) {
		console.error("Error on trackmania.io:", error)
		return { meta: { twitch: "" } }
	}
}
