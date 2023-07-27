import { AppShell, createStyles, Navbar, NavLink } from "@mantine/core"
import { NavLink as Link, Outlet } from "react-router-dom"

const useStyles = createStyles(theme => (
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
					<Link to="/" className={classes.noUnderline}>
						<NavLink className={classes.linkWrapper} label="Rewards" />
					</Link>
					<Link to="/settings" className={classes.noUnderline}>
						<NavLink className={classes.linkWrapper} label="Settings" />
					</Link>
				</Navbar>}
		>
			<Outlet />
		</AppShell>
	);
}
