import { Button, Container, Flex, Group, Modal, Stack, Text, TextInput } from "@mantine/core"
import { Fragment, useEffect, useState } from "react"
import { Octokit } from "octokit";
import { useRewardStore } from "./store";

const octokit = new Octokit({
	auth: 'token'
})


function App() {

	const [userInfo, setUserInfo] = useState<UserInfo>({ username: "", token: "", project: "" })
	const [openPopup, setOpenPopup] = useState(true)
	const rewards = useRewardStore(state => state.rewards)

	useEffect(() => {
		console.log("initializing app")
		const fetchData = async () => {
			// Optional: Get & log the authenticated app's name
			const res = await octokit.request('GET /repos/{owner}/{repo}/milestones', {
				owner: 'bkerz',
				repo: 'white-man-journy',
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				}
			})

			console.log(res)
			console.log(rewards)
			debugger

		}
		fetchData()
		console.log("App initialized")

	})

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
			<UserInfoPopup open={openPopup} />
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

interface UserInfo {
	username: string;
	token: string;
	project: string
}

const UserInfoPopup = ({ open }: { open: boolean }) => {
	return (
		<Modal opened={open} onClose={() => console.log("hello")}>
			<Stack>
				<TextInput placeholder="Github username" />
				<TextInput placeholder="Github Token API" />
				<TextInput placeholder="Github project name" />
			</Stack>
		</Modal>
	)
}
