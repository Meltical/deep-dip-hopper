import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { DPP_Player, fetchPlayerList, IProfileDictionary, storage_profiles } from "./api"
import { Player } from "./Player"

const useAppController = () => {
	const [players, setPlayers] = useState<DPP_Player[]>([])
	const [profiles, setProfiles] = useState<IProfileDictionary>({})
	const loadPlayers = async () => {
		const player_list = await fetchPlayerList()
		setPlayers(player_list)
	}
	const loadProfilesFromStorage = async () => {
		const profiles = await storage_profiles.getValue()
		setProfiles(profiles || {})
	}
	useEffect(() => {
		loadPlayers()
		loadProfilesFromStorage()
	}, [])
	return { players, profiles, loadPlayers }
}

export const App = () => {
	const { players, profiles, loadPlayers } = useAppController()
	return (
		<Container>
			<Button onClick={loadPlayers}>Refresh</Button>
			{players.length > 0 && (
				<>
					<Player player={players[0]} cachedTwitchId={profiles[players[0].user_id]} />
					<Divider />
					{players.slice(1).map((player) => (
						<React.Fragment key={player.user_id}>
							<Player player={player} cachedTwitchId={profiles[player.user_id]} />
						</React.Fragment>
					))}
				</>
			)}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;
`

const Divider = styled.div`
	height: 1px;
	margin-top: 4px;
	margin-bottom: 4px;
	background-color: #000;
`

const Button = styled.button`
	background-color: #fff;
	color: #000;
	border: 1px solid #000;
	padding: 8px;
	cursor: pointer;
	margin-bottom: 8px;
`
