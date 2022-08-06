import { useRef, useState } from "react"
import { getReposForUser } from './util/GithubService'
import { useQuery } from "@tanstack/react-query";

interface Props {
  username: string
}

export default function GithubStats({ username }: Props) {
  const { isLoading, error, data: repos } = useQuery(
    ['user', username],
    () => getReposForUser(username),
    { enabled: !!username })

  if (isLoading)
    return <div>Loading {username}'s Github data</div>

  if (error)
    return <strong style={{ color: 'red' }}>{String(error)}</strong>

  return <div>
    <details>
      <summary>
        {username} has {repos?.length} repo's
      </summary>
      <ol>
        {repos?.map(repo => <li>
          <a href={`https://github.com/${username}/${repo}`}>{repo}</a>
        </li>)}
      </ol>
    </details>
  </div>
}
