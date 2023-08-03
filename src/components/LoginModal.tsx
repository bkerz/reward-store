import { Button, Modal, Text } from "@mantine/core";
import { supabase } from "../client";

interface Props {
	opened: boolean;
	onClose: () => void
}

export default function LoginModal({ opened, onClose }: Props) {

	const signInUser = async () => {
		await supabase.auth.signInWithOAuth({ provider: "github" })
	}

	return (
		<Modal opened={opened} onClose={onClose}>
			<Text size="xl">Login With Github</Text>
			<Button onClick={signInUser}>Login</Button>
		</Modal>
	)

}
