import { Button, Flex, Group, Stack, Text } from "@mantine/core"
import { Fragment, useEffect, useState } from "react"
import { OAuthApp as GithubApp } from "octokit";
import { usePointsStore, useRewardStore, Reward as RewardType, useSessionStore } from "../store"
import CreateReward from "./CreateReward";
import { supabase } from "../client"

function App() {

	const [isModalOpened, setIsModalOpened] = useState(false)

	const rewards = useRewardStore(state => state.rewards)
	const { setPoints } = usePointsStore()
	const { session } = useSessionStore()


	const singInUser = async () => {
		await supabase.auth.signInWithOAuth({ provider: "github", options: { redirectTo: "http://localhost:5173/github/callback" } })
	}

	const singOutUser = async () => {
		await supabase.auth.signOut()
	}

	useEffect(() => {
		const session_string = localStorage.getItem("session_data")
		if (session_string) {
			const abortController = new AbortController()
			const fetchData = async () => {
				const { octokit } = new GithubApp({
					clientId: "95e9a250efe44876e61a",
					clientSecret: "b6cc3118c83e8b6fa979d219d64de88db6f2ac23",
					allowSignup: true
				})
				// Optional: Get & log the authenticated app's name
				const payload = {
					owner: "bkerz",
					repo: "reward-store",
					headers: {
						'X-GitHub-Api-Version': '2022-11-28'
					}
				}
				const issues = await octokit.request('GET /repos/{owner}/{repo}/issues?state=closed', payload)
				if (Array.isArray(issues.data)) {
					setPoints(issues.data.length)
				}
			}
			fetchData()
			return () => {
				abortController.abort()
			}

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
				{rewards.length > 0 ? rewards.map((item) => {
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

type RewardProps = Omit<RewardType, "id">
const Reward = ({ title, description, cost }: RewardProps) => {
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
			<Button>Buy</Button>
		</Group>
	</Stack>)

}

