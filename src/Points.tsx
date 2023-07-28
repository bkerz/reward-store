import { Group, Text, useInputProps } from "@mantine/core";
import { usePointsStore } from "./store";

export default function Points() {
	const points = usePointsStore(state => state.points)
	return (
		<Group px="lg" py="md">
			<Text size="xl" weight="bold">
				{points}
			</Text>
		</Group>
	)
}
