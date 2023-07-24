import { Button, Container, Flex, Group, Stack, Text } from "@mantine/core"
import { Fragment } from "react"

interface Item {
	id: string;
}

const rewards: Item[] = [
	{ id: "elemento1" },
	{ id: "elemento2" },
	{ id: "elemento3" },
	{ id: "elemento4" },
	{ id: "elemento5" },
	{ id: "elemento6" },
	{ id: "elemento7" },
	{ id: "elemento8" },
	{ id: "elemento9" },
];

function App() {

	return (
		<Container py="sm">
			<Text align="center" size="2.5rem" weight="bold" my="lg">Your available rewards</Text>
			<Flex wrap="wrap" gap="md" justify="center">
				{rewards.map((item: { id: string }) => {
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
