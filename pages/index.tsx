import { Modal, TextInput, Button, Flex, Group, Stack, Text, UnstyledButton, createStyles } from "@mantine/core"
import { Fragment, useEffect, useState } from "react"
import { OAuthApp as GithubApp } from "octokit";
import { usePointsStore, useRewardStore, useSessionStore, Reward as RewardType } from "../src/store";
import CreateReward from "../src/components/CreateReward";
import { supabase } from "../src/client"
import { Session } from "@supabase/supabase-js";
import { useLocalStorage } from "../src/hooks";
import ProjectList from "../src/components/ProjectList";


function App() {

	const [isModalOpened, setIsModalOpened] = useState(false)

	const { session } = useSessionStore()

	const singInUser = async () => {
		await supabase.auth.signInWithOAuth({ provider: "github", options: { redirectTo: "http://localhost:3000/" } })
	}

	const singOutUser = async () => {
		await supabase.auth.signOut()
	}


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
			<Text align="center" size="2.5rem" weight="bold" my="lg">Your projects</Text>
			<ProjectList />
		</Fragment>
	)
}

export default App


