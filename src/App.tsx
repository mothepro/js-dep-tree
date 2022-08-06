import { KeyboardEvent, useRef, useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './App.css'
import GithubStats from './GithubStats'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient

export default function App() {
  const [username, setUsername] = useState('')
  const usernameEl = useRef<HTMLInputElement>(null)

  const handleSubmit = () => setUsername(usernameEl.current!.value.trim())
  const handleUsernameKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => key === 'Enter' && handleSubmit()

  return (
    <>
      <header>Find Dependency Skill</header>
      <label>
        <input
          type='text'
          defaultValue={username}
          ref={usernameEl}
          onKeyDown={handleUsernameKeyDown}
          placeholder='Github Username'
        />
        <input type='submit' onClick={handleSubmit} value='Go' />
      </label>
      <QueryClientProvider client={queryClient}>
        <GithubStats username={username} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
