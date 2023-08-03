import { useState, useEffect, Fragment } from "react";
import { Text, Stack, Button, UnstyledButton, Modal, createStyles } from "@mantine/core";
import { useLocalStorage } from "../hooks";
import Link from "next/link";
import { useProjectStore, Project } from "../store";

const useStyles = createStyles(() => ({
	project: {
		padding: "1rem",
		["&:hover"]: {
			background: "rgba(255,255,255, 0.25)",
		}
	}
}))

export default function ProjectList() {
	const [isModalOpened, setIsModalOpened] = useState(false)
	const { projects } = useProjectStore()
	const { classes } = useStyles()
	const [localProjects, setLocalProjects] = useLocalStorage<Project[]>("projects", [])

	useEffect(() => {
		useProjectStore.setState({ projects: localProjects })
	}, [localProjects])

	return (
		<Stack>
			<Button sx={{
				maxWidth: "max-content"
			}} onClick={() => setIsModalOpened(true)}>New Project</Button>
			<Stack>
				{projects.map(project => (
					<Fragment key={project.id}>
						<Link href={"/project/" + project.name + "/rewards"} className={classes.project}>{project.name}</Link>
					</Fragment>
				))}
			</Stack>
			<CreateProject opened={isModalOpened} onClose={() => setIsModalOpened(false)} onCreate={(project) => {
				const newList = [...projects, project]
				setLocalProjects(newList)
			}} />
		</Stack>
	)
}

interface CreateProjectProps {
	opened: boolean;
	onClose: () => void
	onCreate: (project: { id: string; name: string; }) => void

}
const CreateProject = ({ opened, onClose, onCreate }: CreateProjectProps) => {

	const [projects, setProjects] = useState<any[]>([])
	const [project, setProject] = useState<{ id: string; name: string }>({ id: "", name: "" })
	const { classes } = useStyles()

	useEffect(() => {
		if (!opened) return
		fetch("/api/projects/bkerz").then(res => res.json()).then(res => {
			setProjects(res.data)
		}).catch(err => {
			alert(err)
		})
	}, [opened])

	useEffect(() => {
		if (project.id === "" && project.name === "") return

		onCreate(project)
		onClose()

	}, [project])

	return (
		<Modal opened={opened} onClose={onClose}>
			<Stack>
				<Text size="2.5rem">Select your project</Text>
				<Stack>
					{projects.map(project => {
						return (
							<Fragment key={project.id}>
								<UnstyledButton className={classes.project} onClick={() => {
									setProject({ id: crypto.randomUUID(), name: project.name })
								}}>{project.name}</UnstyledButton>

							</Fragment>
						)
					})}
				</Stack>
			</Stack>
		</Modal>
	)
}
