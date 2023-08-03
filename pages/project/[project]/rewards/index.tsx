import { Fragment, useEffect, useState } from "react"
import { Group, Stack, Text, Flex, Button } from "@mantine/core"
import CreateReward from "../../../../src/components/CreateReward"
import { useRewardStore, usePointsStore } from "../../../../src/store"
import { Reward as RewardType } from "../../../../src/store"
import { useLocalStorage } from "../../../../src/hooks"
import { useRouter } from "next/router"

export default function ProjectRewards() {
	const [isModalOpened, setIsModalOpened] = useState(false)
	const { setPoints } = usePointsStore()
	const [localRewards] = useLocalStorage<RewardType[]>("rewards", [])
	const [localPoints] = useLocalStorage<number>("points", 0)
	const router = useRouter()

	const initializePoints = () => {
		return usePointsStore.setState(() => ({ points: localPoints }))
	}

	const initializeRewards = () => {
		return useRewardStore.setState(() => ({ rewards: localRewards }))
	}

	useEffect(() => {
		const abortController = new AbortController()
		//initializePoints()
		fetch(`/api/issues/${"bkerz"}/${router.query.project}`, { signal: abortController.signal }).then(res =>
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

	useEffect(() => {
		initializeRewards()
		initializePoints()
	}, [localRewards, localPoints])
	return (
		<Fragment>
			<Text align="center" size="2.5rem" weight="bold" my="lg">Your rewards</Text>
			<RewardsList />
			<CreateReward opened={isModalOpened} onClose={() => { setIsModalOpened(false) }} />
			<Button sx={{ position: "absolute", bottom: "4rem", right: "4rem" }} onClick={() => { setIsModalOpened(true) }}>New Reward</Button>
		</Fragment>

	)
}
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
			<Button disabled={points < cost} onClick={buyReward}>Buy</Button>
		</Group>
	</Stack>)

}

const RewardsList = () => {
	const { rewards } = useRewardStore()
	const router = useRouter()
	return (
		<Flex wrap="wrap" gap="md" justify="center">
			{rewards?.length > 0 ? rewards.filter(reward => router.query.project ? reward.project === router.query.project : false).map((item) => {
				return (
					<Fragment key={item.id}>
						<Reward {...item} />
					</Fragment>
				)
			}) : <Text>You don't have any reward yet</Text>}
		</Flex>

	)
}
