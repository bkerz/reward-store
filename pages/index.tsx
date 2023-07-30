import { Button, Flex, Group, Stack, Text } from "@mantine/core"
import { Fragment, useEffect, useState } from "react"
import { OAuthApp as GithubApp } from "octokit";
import { usePointsStore, useRewardStore, Reward as RewardType, useSessionStore } from "../store";
import CreateReward from "../components/CreateReward";
import { supabase } from "../client"
import { Session } from "@supabase/supabase-js";

function App() {

	const [isModalOpened, setIsModalOpened] = useState(false)

	const { rewards, initRewards } = useRewardStore()
	const { setPoints } = usePointsStore()
	const { session } = useSessionStore()


	const singInUser = async () => {
		await supabase.auth.signInWithOAuth({ provider: "github", options: { redirectTo: "http://localhost:3000/" } })
	}

	const singOutUser = async () => {
		await supabase.auth.signOut()
	}

	useEffect(() => {
		const localRewards = localStorage.getItem("rewards")
		if (localRewards) {
			initRewards(Array.isArray(JSON.parse(localRewards)) ? JSON.parse(localRewards) : [])
		}
		const abortController = new AbortController()
		fetch(`/api/issues/${"bkerz"}/${"reward-store"}`, { signal: abortController.signal }).then(res =>
			res.json()
		).then(res => {
			if (Array.isArray(res.data)) {
				setPoints(res.data.length)
			}
		})
		return () => {
			abortController.abort()
		}

	}, [])

	return (
		<Fragment>
			{session ?

				<Button sx={{
					position: "fixed",
					top: "1rem",
					right: "1rem"
				}}
					onClick={singOutUser}
				>Logout</Button>
				:
				<Button sx={{
					position: "fixed",
					top: "1rem",
					right: "1rem"
				}}
					onClick={singInUser}
				>Login with Github</Button>
			}
			<Text align="center" size="2.5rem" weight="bold" my="lg">Your available rewards</Text>
			<Flex wrap="wrap" gap="md" justify="center">
				{rewards?.length > 0 ? rewards.map((item) => {
					return (
						<Fragment key={item.id}>
							<Reward {...item} />
						</Fragment>
					)
				}) : <Text>You don't have any reward yet</Text>}
			</Flex>
			<Button sx={{ position: "absolute", bottom: "4rem", right: "4rem" }} onClick={() => { setIsModalOpened(true) }}>New Reward</Button>
			<CreateReward opened={isModalOpened} onClose={() => { setIsModalOpened(false) }} />
		</Fragment>
	)
}

export default App

interface RewardProps extends Omit<RewardType, "id"> { }
const Reward = ({ title, description, cost }: RewardProps) => {
	const { points, setPoints } = usePointsStore()

	const buyReward = () => {
		setPoints(points - cost < 0 ? 0 : points - cost)
	}

	return (<Stack spacing=".25rem" sx={{
		padding: ".75rem 1.25rem",
		border: "2px solid lightgray",
		borderRadius: ".5rem"
	}}>
		<Text size="2rem" weight="bold">
			{title}
		</Text>
		<Text>
			{description}
		</Text>
		<Group position="apart" my="1rem">
			<Text>Cost: {cost}</Text>
			<Button onClick={buyReward}>Buy</Button>
		</Group>
	</Stack>)

}

