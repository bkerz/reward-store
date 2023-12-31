import { Modal, Text, TextInput, Stack, Group, Button } from "@mantine/core"
import { useRewardStore, Reward } from "../store";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks";
import { useRouter } from "next/router";

interface Props {
	opened: boolean;
	onClose: () => void
}

export default function CreateReward({ opened, onClose }: Props) {

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [cost, setCost] = useState(0)
	const [, setLocalRewards] = useLocalStorage<Reward[]>("rewards", [])
	const router = useRouter()

	const createReward = useRewardStore(state => state.createReward)

	const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
	const onCostChange = (e: React.ChangeEvent<HTMLInputElement>) => setCost(parseInt(e.target.value))
	const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)


	const onCreate = () => {
		const project = Array.isArray(router.query.project) ? router.query.project[0] : router.query.project
		createReward({
			id: crypto.randomUUID(),
			title,
			description,
			cost,
			project: project ? project : ""
		})
		const { rewards } = useRewardStore.getState()
		setLocalRewards(rewards)
	}

	return (
		<Modal opened={opened} onClose={onClose}>
			<Stack>
				<Text size="2.5rem">Create your Reward</Text>
				<Stack>
					<TextInput onChange={onTitleChange} placeholder="Title" />
					<TextInput onChange={onDescriptionChange} placeholder="Description" />
					<TextInput onChange={onCostChange} placeholder="Cost" />
					<Group position="right">
						<Button variant="outline" onClick={onClose}>Cancel</Button>
						<Button onClick={() => {
							onCreate()
							onClose()
						}}>Create</Button>
					</Group>
				</Stack>
			</Stack>
		</Modal>
	)
}
