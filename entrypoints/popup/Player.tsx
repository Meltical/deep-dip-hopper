import { useState } from "react"
import styled from "styled-components"
import { DPP_Player, getPlayerProfile } from "./api"

const usePlayerController = ({ player, cachedTwitchId }: PlayerProps) => {
	const [twitchId, setTwitchId] = useState<string | undefined>(cachedTwitchId)
	const has_no_twitch = twitchId === "NO_TWITCH"
	const openTwitch = (twitchId: string) => {
		if (twitchId === "NO_TWITCH") {
			return
		}
		window.open(`https://www.twitch.tv/${twitchId}`, "_blank")
	}
	const handleClick = async () => {
		if (twitchId) {
			openTwitch(twitchId)
			return
		}
		const newTwitchId = await getPlayerProfile(player.user_id)
		setTwitchId(newTwitchId)
		openTwitch(newTwitchId)
	}
	return { has_no_twitch, handleClick }
}

type PlayerProps = { player: DPP_Player; cachedTwitchId?: string }
export const Player = (props: PlayerProps) => {
	const { player } = props
	const { has_no_twitch, handleClick } = usePlayerController(props)
	return (
		<Container onClick={handleClick} $has_no_twitch={has_no_twitch}>
			<Name>{player.display_name}</Name>
			<EndRow>
				<Height>{Math.max(player.height / 100 - 1, 0).toFixed(0)}</Height>
				<Separator />
				<Height>{player.height.toFixed(0)}</Height>
				{has_no_twitch ? (
					<span className="material-symbols-outlined">close</span>
				) : (
					<span className="material-symbols-outlined">chevron_right</span>
				)}
			</EndRow>
		</Container>
	)
}

const Container = styled.div<{ $has_no_twitch: boolean }>`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 4px;
	background-color: ${(props) => (props.$has_no_twitch ? "#d7acac" : "#fff")};
	&:hover {
		background-color: ${(props) => (props.$has_no_twitch ? "#d7acac" : "#acc6d7")};
	}
	cursor: pointer;
`

const EndRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const Name = styled.div`
	color: #000;
	font-size: 16px;
	font-weight: 500;
`

const Height = styled.div`
	color: #000;
	font-size: 12px;
`

const Separator = styled.div`
	width: 1px;
	height: 12px;
	background-color: #000;
	margin: 0 8px;
`
