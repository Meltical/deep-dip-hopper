import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { DPP_Player, fetchPlayerList } from "./api"
import { Player } from "./Player"

export const App = () => {
	return <Body />
}

const Body = () => {
	const [players, setPlayers] = useState<DPP_Player[]>([])
	const refreshPlayers = async () => {
		const player_list = await fetchPlayerList()
		setPlayers(player_list)
	}
	useEffect(() => {
		refreshPlayers()
	}, [])
	return (
		<Container>
			<Button onClick={refreshPlayers}>Refresh</Button>
			{players.length > 0 && (
				<>
					<Player player={players[0]} />
					<Divider />
					{players.slice(1).map((player) => (
						<React.Fragment key={player.user_id}>
							<Player player={player} />
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
