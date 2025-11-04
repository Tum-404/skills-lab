import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function App() {
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api`)
        setMessage(response.data.message || 'Connected to backend!')
        setError('')
      } catch (err) {
        setError('Failed to connect to backend')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Full Stack Application</h1>
        <div className="card">
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && (
            <div>
              <p>Backend Response:</p>
              <p className="message">{message}</p>
            </div>
          )}
        </div>
        <div className="info">
          <p>
            <strong>Frontend:</strong> React + Vite
          </p>
          <p>
            <strong>Backend:</strong> NestJS
          </p>
          <p>
            <strong>Database:</strong> PostgreSQL
          </p>
        </div>
      </header>
    </div>
  )
}

export default App