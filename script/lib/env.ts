/**
 * Created by user on 2020/1/6.
 */

export function getGitHubEnv()
{
	let { GITHUB_TOKEN, GITHUB_ACTOR } = process.env

	return {
		GITHUB_TOKEN,
		GITHUB_ACTOR,
	}
}
