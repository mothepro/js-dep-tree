import { useRef, useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './App.css'
import GithubStats from './GithubStats'

const queryClient = new QueryClient

export default function App() {
  const [username, setUsername] = useState('')
  const usernameEl = useRef<HTMLInputElement>(null)

  return (
    <div className="App">
      <header className="App-header">
        <label>
          <input type="text" defaultValue={username} ref={usernameEl} placeholder="Github Username" />
          <input type="submit" onClick={() => setUsername(usernameEl.current!.value.trim())} value="Go" />
        </label>
        <QueryClientProvider client={queryClient}>
          <GithubStats username={username} />
        </QueryClientProvider>
      </header>
    </div>
  );
}
