import { Button, Container, Flex, Group, Modal, Stack, Text, TextInput } from "@mantine/core"
import { Fragment, useEffect, useState } from "react"
import { Octokit } from "octokit";
import { useConfigsStore, useRewardStore } from "./store";



function App() {

	const username = useConfigsStore((state) => state.username)
	const token = useConfigsStore((state) => state.token)
	const project = useConfigsStore((state) => state.project)
	const rewards = useRewardStore(state => state.rewards)

	useEffect(() => {
		const fetchData = async () => {
			debugger
			const octokit = new Octokit({
				auth: token
			})
			// Optional: Get & log the authenticated app's name
			const res = await octokit.request('GET /repos/{owner}/{repo}/milestones', {
				owner: username,
				repo: project,
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				}
			})

		}
		fetchData()

	}, [])

	return (
		<Container py="sm">
			<Text align="center" size="2.5rem" weight="bold" my="lg">Your available rewards</Text>
			<Flex wrap="wrap" gap="md" justify="center">
				{rewards.map((item) => {
					return (
						<Fragment key={item.id}>
							<Reward />
						</Fragment>
					)
				})}
			</Flex>
		</Container>
	)
}

export default App

const Reward = () => {
	return (<Stack spacing=".25rem" sx={{
		padding: ".75rem 1.25rem",
		border: "2px solid lightgray",
		borderRadius: ".5rem"
	}}>
		<Text size="2rem" weight="bold">
			Testing title
		</Text>
		<Text>
			Testing description
		</Text>
		<Group position="apart" my="1rem">
			<Text>Cost: $10</Text>
			<Button>Buy</Button>
		</Group>
	</Stack>)

}

