import { Button, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import { useConfigsStore } from "../store";

interface UserInfo {
	username: string;
	token: string;
	project: string
}

export default function Settings() {
	const [configs, setConfigs] = useState<UserInfo>({ project: "", token: "", username: "" })
	const setGlobalConfigs = useConfigsStore(state => state.setConfigs)
	const onChange = (field: keyof UserInfo) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setConfigs({ ...configs, [field]: event.target.value, })
	}

	return (
		<Stack>
			<TextInput onChange={onChange("username")} placeholder="Github username" />
			<TextInput onChange={onChange("token")} placeholder="Github Token API" />
			<TextInput onChange={onChange("project")} placeholder="Github project name" />
			<Button onClick={() => {
				setGlobalConfigs(configs);
			}}>Save configs</Button>
		</Stack>
	)
}
