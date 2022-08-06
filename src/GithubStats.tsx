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
      ['getReposForUser', username],
      async () => [await getReposForUser(username), await getDepsForUser(username)] as const,
      { enabled }
      )

  if (!username) return <></>

  if (isLoading) return <div>Loading {username}'s Github data</div>

  if (error) return <strong className='error'>{String(error)}</strong>

  const [repos, unsortedDeps] = data!,
    deps = [...unsortedDeps].sort(([, a], [, b]) => b - a)

  return <>
      <details>
        <summary>
          owns {repos?.length} repo's
        </summary>
        <ul>
          {repos?.map(repo => (
            <li>
              <a href={`https://github.com/${username}/${repo}`}>{repo}</a>
            </li>
          ))}
        </ul>
      </details>
      <details>
        <summary>
          has worked with {deps.length} different packages
        </summary>
        <table>
        <thead>
          <tr>
            <th>Depenedency</th>
            <th># of Repo's found in</th>
          </tr>
        </thead>
        <tbody>
          {deps?.map(([dep, count]) => <tr>
            <td>
              <a href={`https://github.com/${dep}`}>{dep}</a>
            </td>
            <td>
                {count}
            </td>
          </tr>)}
        </tbody>
        </table>
      </details>
    </>
}
