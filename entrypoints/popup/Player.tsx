import { useState } from "react"
import styled from "styled-components"
import { DPP_Player, fetchPlayerProfile, Trackmania_Player as Trackmania_Profile } from "./api"

type PlayerProps = { player: DPP_Player }
export const Player = ({ player }: PlayerProps) => {
	const [profile, setProfile] = useState<Trackmania_Profile | null>(null)
	const goToTwitch = (profile: Trackmania_Profile) => {
		if (profile && profile.meta.twitch) {
			window.open(`https://twitch.tv/${profile.meta.twitch}`, "_blank")
		} else {
		}
	}
	const handleClick = async () => {
		if (profile) {
			goToTwitch(profile)
			return
		}
		const newProfile = await fetchPlayerProfile(player.user_id)
		setProfile(newProfile)
		goToTwitch(newProfile)
	}
	return (
		<Container onClick={handleClick}>
			<Name>{player.display_name}</Name>
			<EndRow>
				<Height>{player.height.toFixed(0)}</Height>
				<span className="material-symbols-outlined"> chevron_right </span>
			</EndRow>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 4px;
	background-color: "#ffffff";
	&:hover {
		background-color: #acc6d7;
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
