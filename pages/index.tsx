import { Button, Text } from "@mantine/core"
import { Fragment } from "react"
import { useSessionStore } from "../src/store";
import { supabase } from "../src/client"
import ProjectList from "../src/components/ProjectList";


function App() {

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


