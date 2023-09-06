import './App.css'
import { ErrorBoundary } from 'react-error-boundary'

const Error = () => <p>Error</p>

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error} onError={(e) => console.error(e)}>
      <div className='App'>This is going to be a weather app</div>
    </ErrorBoundary>
  )
}

export default App
