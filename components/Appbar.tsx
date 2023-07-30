import { AppShell, Container, createStyles, Navbar, NavLink } from "@mantine/core"
import Link from "next/link";
import Points from "./Points";

interface Props {
	children: React.ReactNode
}

const useStyles = createStyles(() => (
	{
		linkWrapper: {
			textDecoration: "unset",
			padding: "1rem 1.25rem",
			["&:hover"]: {
				background: "lightgray",
			},
		},
		noUnderline: {
			textDecoration: "none"
		}
	}
))

export default function Appbar({ children }: Props) {
	const { classes } = useStyles()
	return (
		<AppShell
			padding="md"
			navbar={
				<Navbar width={{ base: 300 }} height={500} p="xs" top={0}>
					<Navbar.Section>
						<Points />
					</Navbar.Section>
					<Navbar.Section>
						<Link href="/" className={classes.noUnderline}>
							<NavLink className={classes.linkWrapper} label="Rewards" />
						</Link>
					</Navbar.Section>
				</Navbar>}
		>
			<Container>
				{children}

			</Container>
		</AppShell>
	);
}
