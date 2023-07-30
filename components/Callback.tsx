import { Text } from "@mantine/core"
import { useEffect } from "react"
import { supabase } from "./client"
import { useSessionStore } from "./store"
import { useNavigate } from "react-router-dom"

export default function Callback() {
	const setSession = useSessionStore(state => state.setSession)
	const navigate = useNavigate()

	useEffect(() => {
		const saveSession = async () => {
			return await supabase.auth.getSession()
		}

		saveSession().then(({ data, error }) => {
			if (data && !error) {
				localStorage.setItem("session_data", JSON.stringify(data.session))
				setSession(data.session)
				navigate("/")
			}

		})
	}, [])
	return (
		<Text>Redirecting...</Text>
	)
}
