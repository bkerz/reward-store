import { OAuthApp } from "octokit";

const { octokit } = new OAuthApp({
	clientId: process.env.CLIENT_ID ? process.env.CLIENT_ID : "",
	clientSecret: process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : "",
	allowSignup: true,
})

export default async function handler(req: any, res: any) {
	const { user } = req.query
	try {
		if (req.method === 'GET') {
			const payload = {
				username: user,
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				}
			}
			if (user) {
				const data = await octokit.request("GET /users/{username}/repos?sort=created", payload)
				if (data) {
					res.status(200).json(data)
				} else {
					res.status(200).json({ data: [{ id: "1", name: "user wasn't defined" }] })
				}
			}
		}
	}
	catch (e) {
		return res.status(500).json({ error: e })
	}
}

