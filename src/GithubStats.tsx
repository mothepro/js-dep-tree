import { useQuery } from '@tanstack/react-query'
import { getDepsForUser, getReposForUser } from './util/GithubService'

interface Props {
  username: string
}

export default function GithubStats({ username }: Props) {

  const enabled = !!username,
    {
      isLoading,
      error,
      data,
    } = useQuery(
      ['user', username],
      async () => [await getReposForUser(username), await getDepsForUser(username)] as const,
      { enabled }
      )

  if (!username) return <></>

  if (isLoading) return <div>Loading {username}'s Github data</div>

  if (error) return <strong className='error'>{String(error)}</strong>

  const [repos, unsortedDeps] = data!,
    deps = [...unsortedDeps].sort(([, a], [, b]) => b.length - a.length)

  return (
    <>
      <details>
        <summary>owns {repos?.length} repo's</summary>
        <ul>
        {repos?.map(repo => (
          <li>
            <a target='_blank' href={`https://github.com/${username}/${repo}`}>
              {repo}
            </a>
          </li>
        ))}
        </ul>
      </details>
      <details>
        <summary>has worked with {deps.length} unique dependencies</summary>
        <table border={1}>
          <thead>
            <tr>
              <th>Depenedency</th>
              <th>Repositories</th>
            </tr>
          </thead>
          <tbody>
            {deps?.map(([dep, pkgs]) => (
              <tr>
                <td>
                  <a target='_blank' href={`https://npmjs.com/package/${dep}`}>
                    {dep}
                  </a>
                </td>
                <td>
                  {pkgs.length}
                  <ul>
                  {pkgs.map(repo => (
                    <li>
                      <a target='_blank' href={`https://github.com/${username}/${repo}`}>
                        {repo}
                      </a>
                    </li>
                  ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </>
  )
}
