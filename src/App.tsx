import './App.css'
import { ErrorBoundary } from 'react-error-boundary'
import { Error, ErrorHandler } from './components/Error'
import Container from './components/Container'

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error} onError={ErrorHandler}>
      <Container />
    </ErrorBoundary>
  )
}

export default App
