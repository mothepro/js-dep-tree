import type { Package, Repo } from './GithubResponseTypes'

export async function getReposForUser(user: string) {
  const resp = await fetch(`https://api.github.com/users/${user}/repos`)
  const repos = await resp.json() as unknown as Repo[]
  return repos.map(({ full_name }) => full_name)
}

/**
 * @param user Github user
 * @param pkg Github user's package
 * @returns the `dependencies` object found in the repo's `package.json`
 * @throws
 */
export async function getDepsForPackage(user: string, pkg: string) {
  const resp = await fetch(`https://raw.githubusercontent.com/${user}/${pkg}/master/package.json`)
  const { dependencies, devDependencies } = await resp.json() as unknown as Package
  const ret: Set<string> = new Set
  for (const dep of Object.keys(dependencies))
    ret.add(dep)
  return ret
}

/**
 * Find the number of times a github user has directly (1st degree) depeneded
 * on a package. (Version numbers are ignored)
 * @param user GitHub username
 */
export async function getDepsForUser(user: string) {
  const ret: Map<string, number> = new Map
  for (const repo of await getReposForUser(user)) {
    try {
      for (const dep of await getDepsForPackage(user, repo)) {
        const currentDepCount = ret.get(dep) ?? 0
        ret.set(dep, 1 + currentDepCount)
      }
    } catch {} // Skip this repo if we can't get it's deps
  }
  return ret
}
