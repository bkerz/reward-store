import { AppShell, Container, createStyles, Navbar, NavLink } from "@mantine/core"
import { NavLink as Link, Outlet } from "react-router-dom"
import Points from "./Points";

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

export default function Appbar() {
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
						<Link to="/" className={classes.noUnderline}>
							<NavLink className={classes.linkWrapper} label="Rewards" />
						</Link>
						<Link to="/settings" className={classes.noUnderline}>
							<NavLink className={classes.linkWrapper} label="Settings" />
						</Link>
					</Navbar.Section>
				</Navbar>}
		>
			<Container>
				<Outlet />

			</Container>
		</AppShell>
	);
}
