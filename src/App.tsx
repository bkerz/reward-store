import { Button, Container, Flex, Group, Modal, Stack, Text, TextInput } from "@mantine/core"
import { Fragment, useEffect, useState } from "react"
import { Octokit } from "octokit";
import { useConfigsStore, usePointsStore, useRewardStore, Reward as RewardType } from "./store";
import CreateReward from "./CreateReward";



function App() {

	const [isModalOpened, setIsModalOpened] = useState(false)

	const username = useConfigsStore((state) => state.username)
	const token = useConfigsStore((state) => state.token)
	const project = useConfigsStore((state) => state.project)
	const rewards = useRewardStore(state => state.rewards)
	const { setPoints } = usePointsStore()


	useEffect(() => {
		const abortController = new AbortController()
		const fetchData = async () => {
			debugger
			const octokit = new Octokit({
				auth: token,
				request: {
					signal: abortController.signal
				}
			})
			// Optional: Get & log the authenticated app's name
			const payload = {
				owner: username,
				repo: project,
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				}
			}
			const milestones = await octokit.request('GET /repos/{owner}/{repo}/milestones', payload)
			const issues = await octokit.request('GET /repos/{owner}/{repo}/issues?state=closed', payload)
			console.log({ milestones, issues })
			debugger
			if (Array.isArray(issues.data)) {
				setPoints(issues.data.length)
			}
		}
		if (username && token && project) {
			fetchData()
		}
		return () => {
			abortController.abort()
		}

	}, [])

	return (
		<Fragment>
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

interface RewardProps extends Omit<RewardType, "id"> { }
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

