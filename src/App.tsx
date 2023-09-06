import './App.css'
import { ErrorBoundary } from 'react-error-boundary'
import { Error, ErrorHandler } from './components/Error'

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error} onError={ErrorHandler}>
      <div className='App'>This is going to be a weather app</div>
    </ErrorBoundary>
  )
}

export default App
