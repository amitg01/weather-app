import './App.scss'
import { ErrorBoundary } from 'react-error-boundary'
import { Error, ErrorHandler } from './components/Error'
import Container from './components/Container'
import { useSettings } from './hooks/useSettings'

function App() {
  const { settings, changeSettings } = useSettings()
  return (
    <main className={settings.theme}>
      <div className='main-container'>
        <ErrorBoundary FallbackComponent={Error} onError={ErrorHandler}>
          <Container settings={settings} changeSettings={changeSettings} />
        </ErrorBoundary>
      </div>
    </main>
  )
}

export default App
