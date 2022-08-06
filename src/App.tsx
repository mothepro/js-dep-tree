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
        <input type="text" defaultValue={username} ref={usernameEl} placeholder="Github Username" />
        <button onClick={() => setUsername(usernameEl.current!.value.trim())}>Check</button>
        <QueryClientProvider client={queryClient}>
          <GithubStats username={username} />
        </QueryClientProvider>
      </header>
    </div>
  );
}
