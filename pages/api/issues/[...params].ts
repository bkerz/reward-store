import { OAuthApp } from "octokit";

const { octokit } = new OAuthApp({
	clientId: process.env.CLIENT_ID ? process.env.CLIENT_ID : "",
	clientSecret: process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : "",
	allowSignup: true
})

export default async function handler(req: any, res: any) {
	const { params } = req.query
	try {
		if (req.method === 'GET') {
			const payload = {
				owner: params[0],
				repo: params[1],
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				}
			}
			const data = await octokit.request("GET /repos/{owner}/{repo}/issues?state=closed&labels=reward-points", payload)

			if (data) {
				res.status(200).json(data)
			}
		}
	}
	catch (e) {
		return res.status(404).json({ error: e })
	}
}
